import bcrypt from 'bcrypt';
import {
  UserDetails,
  Memberships,
} from '../models';
import jwTokens from '../middleware/helpers';
import checkSession from '../middleware/session';

// email validation here
const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const validateEmail = emailAddress =>
  emailRegex.test(emailAddress); // returns true or false

class userLoginDetails {
  // validates signup info
  static validateSignup(username,
    password,
    lastname,
    firstname,
    email,
  ) {
    return new Promise((resolve, reject) => { // async
      if (username === null) {
        reject({
            message: 'Username Invalid',
            field: 'username',
          });
      } else if (password === null) {
        reject({
          message: 'Password Invalid',
          field: 'password',
        });
      } else if (email === null) {
        reject({
          message: 'No email Provided',
          field: 'email',
        });
      } else if (firstname === null) {
        reject({
          message: 'First Name Invalid',
          field: 'firstname',
        });
      } else if (lastname === null) {
        reject({
          message: 'Last Name Invalid',
          field: 'lastname',
        });
      } else if (!validateEmail(email)) {
        reject({
          message: 'Email Address invalid',
          field: 'email'
        });
      } else if (username.length < 2) {
        reject({
          message: 'Username too short',
          field: 'username',
      });
      } else if (password.length < 6) {
        reject({
          message: 'Password too short',
          field: 'password',
        });
      } else if (lastname.length < 2) {
        reject({
          message: 'Last Name too short',
          field: 'lastname',
        });
      } else if (firstname.length < 2) {
        reject({
          message: 'First Name too short',
          field: 'firstname',
        });
      } else {
        // generate random string
        jwTokens.randomString()
          .then(randBuf =>
            resolve(randBuf))
          .catch(error => reject(error));
      }
    });
  }
  static validateSignin(username, password) {
    return new Promise((resolve, reject) => {
      if (username === null) {
        reject({
          message: 'No username supplied',
          field: 'username',
        });
      } else if (username.length < 2) {
        reject({
          message: 'Invalid Username',
          field: 'username'
        });
      } else if (password === null) {
        reject({
          message: 'No Password supplied',
          field: 'password',
        });
      } else if (password.length < 6) {
        reject({
          message: 'Invalid Password',
          field: 'password'
        });
      } else {
        resolve('Valid Details');
      }
    });
  }
  static validateActivationToken(verifiedToken, userName) {
    return new Promise((resolve, reject) => {
      if (verifiedToken.username.toLowerCase() !== userName.toLowerCase()) {
        // if username is invalid
        reject('Invalid Token');
      } else {
        const resolvedToken = {
          userId: verifiedToken.userId,
          activationString: verifiedToken.authString,
        };
        resolve(resolvedToken); // return the user ID from the token
      }
    });
  }
  // for sign up
  static signup(req, res) {
    // declare variables
    const password = req.body.password || null;
    const lastName = req.body.lastname || null;
    const firstName = req.body.firstname || null;
    const email = req.body.email || null;
    const phone = req.body.phone || null;
    const userName = req.body.username || null;

    userLoginDetails
      .validateSignup(userName,
      password, lastName, firstName, email,
    )
      .then((activationBuf) => {
        if (activationBuf) { // if Vaild
          bcrypt
            .hash(password, 8) // hash password
            .then((hashPassword) => {
              if (!hashPassword) {
                res.status(500).json({
                  status: 'unsuccessful',
                });
              } else { // if successfully hashed
                UserDetails
                  .create({
                    firstname: firstName,
                    lastname: lastName,
                    emailaddress: email.toLowerCase(),
                    phonenumber: phone,
                    username: userName.toLowerCase(),
                    password: hashPassword,
                    authString: activationBuf,
                  })
                  .then((userSignup) => {
                    Memberships
                      .findById(1)
                      .then((setMembershipDetails) => {
                        userSignup
                          .setMembership(setMembershipDetails)
                          .then((signupData) => {
                            // Add user info to token
                            const tokenInfo = {
                              username: signupData.dataValues.username,
                              userId: signupData.dataValues.id,
                              email: signupData.dataValues.emailaddress,
                              authString: activationBuf,
                            };
                            jwTokens
                              .generateToken(
                              req.app.get('JsonSecret'),
                              tokenInfo,
                              '24h') // expires in 24hours
                              .then((signupToken) => {
                                if (signupToken) { // for verification things
                                  res.status(201).json({
                                    status: 'Success',
                                    message: 'User account created',
                                    membership: setMembershipDetails.membershipName,
                                    token: signupToken, // would be part of mail
                                  });
                                }
                              })
                              .catch(error => // if unsuccessful token
                                res.status(202).json({
                                  status: 'none',
                                  message: 'User account created Token unsuccessful',
                                  membership: setMembershipDetails.membershipName,
                                  errorMsg: error,
                                }));
                          }).catch(error => res.status(400).send(error));
                        // set membership unsuccessful
                      }).catch(error => res.status(400).json({
                        status: 'Unsuccessful',
                        message: error.errors[0].message,
                      }));
                  })
                  .catch(error => res.status(400).json({
                    status: 'Unsuccessful',
                    message: error.errors[0].message,
                  }));
              }
            }) // unsuccessful hash
            .catch(error => res.status(500).send(error));
        } else {
          res.status(400).json({
            status: 'Unsuccessful',
          });
        }
      })
      .catch(error => // if information is incomplete
        res.status(400).json({
          status: 'Unsuccessful',
          message: error.message,
          errorField: error.field,
        }),
    );
  }
  static activateUser(req, res) {
    const activationToken = req.query.key || null;
    const userName = req.query.id || null;

    if (activationToken !== null &&
      userName !== null
    ) {
      jwTokens // verify user token
        .verifyToken(req, activationToken)
        .then((verifiedToken) => { // if token was successfully verified
          userLoginDetails
            .validateActivationToken(verifiedToken, userName)
            .then((userToken) => { // if token is valid
              UserDetails
                .findOne({
                  where: {
                    id: userToken.userId,
                    isActive: true,
                  },
                })
                .then((activationUser) => {
                  if (activationUser !== null) {
                    if (activationUser.isActivated === true) {
                      res.status(200).json({
                        status: 'None',
                        message: 'User already activated',
                      });
                    } else if (activationUser.authString === userToken.activationString) {
                      // if authstring is valid
                      jwTokens
                        .randomString()
                        .then((randString) => {
                          activationUser
                            .update({
                              // put new random string in database
                              isActivated: true,
                              authString: randString,
                            })
                            .then(() =>
                              res.status(202).json({
                                status: 'Success',
                                message: 'User Activated',
                              }))
                            .catch(error =>
                              res.status(501).json({
                                status: 'Unsuccessful',
                                message: error,
                              }));
                        })
                        .catch(() => res.status(501).json({
                          // error creating a random string
                          status: 'Unsuccessful',
                          message: 'Server error try again',
                        }));
                    } else if (
                      activationUser.authString !== userToken.activationString
                    ) {
                      res.status(403).json({
                        status: 'Unsuccessful',
                        message: 'Used token',
                        tokenstr: userToken.activationString,
                        dbasestr: activationUser.authString,
                      });
                    }
                  } else { // if user is not found
                    res.status(403).json({
                      status: 'Unsuccessful',
                      message: 'Invalid User',
                    });
                  }
                }) // if user is not found
                .catch(error => res.status(403).send(error));
            })
            .catch(error => res.status(403).json({
              status: 'Unsuccessful',
              message: error,
            }));
        }) // if token cannot be verified
        .catch(error => res.status(403).send(error));
    } else {
      res.status(400).json({
        status: 'Unsuccessful',
        message: 'Link Invalid',
      });
    }
  }
  static signin(req, res) {
    const password = req.body.password || null;
    const userName = req.body.username || null;
    userLoginDetails
      .validateSignin(userName, password)
      .then((validated) => {
        if (validated === 'Valid Details') {
          UserDetails
            .findOne({
              where: {
                isActive: true,
                $or: [{
                  username: userName.toLowerCase(),
                }, {
                  emailaddress: userName.toLowerCase(),
                }],
              },
            })
            .then((foundUser) => {
              if (foundUser && foundUser !== null) {
                bcrypt
                  .compare(password, foundUser.dataValues.password)
                  .then((passwordValidation) => {
                    if (passwordValidation === true) {
                      // if password is valid
                      if (foundUser.isActivated === true) {
                        // if user has been activated
                        const userToken = {
                          userId: foundUser.id,
                          username: foundUser.username,
                          firstName: foundUser.firstname,
                          lastName: foundUser.lastname,
                          role: (foundUser.isAdmin) ? 'Admin' : 'User',
                        };
                        jwTokens
                          .generateToken(
                          req.app.get('JsonSecret'),
                          userToken,
                          '96h')
                          .then((generatedToken) => {
                            if (generatedToken && generatedToken !== null) {
                              checkSession.setLogin(req, res, generatedToken);

                              res.status(202).json({
                                status: 'Successful',
                                message: 'Signin Successful',
                                token: generatedToken,
                              });
                            } else {
                              res.status(501).json({
                                status: 'Unsuccessful',
                                message: 'Server Error, Try again',
                              });
                            }
                          })
                          .catch(error =>
                            res.status(501).json({
                              status: 'Unsuccessful',
                              message: error,
                            }));
                      } else {
                        res.status(401).json({
                          status: 'Unsuccessful',
                          message: 'Email Address not Verified',
                        });
                      }
                    } else {
                      // if password is invalid
                      res.status(401).json({
                        status: 'Unsuccessful',
                        message: 'Invalid Username or password',
                      });
                    }
                  })
                  .catch(error => res.status(500).json({
                    status: 'Unsuccessful',
                    message: error,
                  }));
              } else {
                res.status(401).json({
                  status: 'Unsuccessful',
                  message: 'Invalid Username',
                });
              }
            })
            .catch(error => res.status(500).send(error));
        } else { // if no error, assume server error(timeout)
          res.status(501).json({
            status: 'Unsuccessful',
            message: 'Signin Unsuccessful',
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          status: 'Unsuccessful',
          message: error.message,
          errorField: error.field,
        });
      });
  }
}
export default userLoginDetails;
