import bcrypt from 'bcrypt';
import {
  UserDetails,
  Memberships,
} from '../models';
import JwTokens from '../middleware/helpers';
import CheckSession from '../middleware/session';
import UserHelper from '../helpers/user-signup';


class UserLoginDetails {
  /**
   * 
   * @param {object} req 
   * @param {*} res 
   */
  static checkUserExists(req, res) {
    const userName = req.params.identifier;
    UserDetails
      .findOne({
        where: {
          $or: [{
            username: userName.toLowerCase(),
          }, {
            emailaddress: userName.toLowerCase(),
          }],
        },
        attributes: ['username', 'emailaddress'],
      })
      .then((userHere) => {
        res.json({ userHere });
      })
      .catch(errorMessage =>
        res.status(500).json({
          status: 'Unsuccessful',
          error: errorMessage,
        }));
  }
  // validates signup info
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
  static signUp(req, res) {
    // declare variables
    const password = req.body.password || null;
    const lastName = req.body.lastname || null;
    const firstName = req.body.firstname || null;
    const email = req.body.email || null;
    const phone = req.body.phone || null;
    const userName = req.body.username || null;

    UserHelper
      .validateSignup(userName,
      password, lastName, firstName, email,
    )
      .then((activation) => {
        if (activation === 'All Good') { // if Vaild
          JwTokens
            .randomString()
            .then((activationBuf) => {
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
                                JwTokens
                                  .generateToken(
                                  req.app.get('JsonSecret'),
                                  tokenInfo,
                                  '24h') // expires in 24hours
                                  .then((signupToken) => {
                                    if (signupToken) { // for verification
                                      res.status(201).json({
                                        status: 'Success',
                                        message: 'User account created',
                                        membership:
                                        setMembershipDetails.membershipName,
                                        token: signupToken,
                                        // could be part of mail
                                      });
                                    }
                                  })
                                  .catch(error => // if unsuccessful token
                                    res.status(202).json({
                                      status: 'none',
                                      message:
                                      `User account created, 
                                      Token unsuccessful`,
                                      membership:
                                      setMembershipDetails.membershipName,
                                      errorMsg: error,
                                    }));
                              })
                              .catch(errorMessage =>
                                res.status(500).json({
                                  status: 'Unsuccessful',
                                  error: errorMessage,
                                }));
                            // set membership unsuccessful
                          }).catch(error => res.status(400).json({
                            status: 'Unsuccessful',
                            message: error.errors[0].message,
                          }));
                      })
                      .catch(error => res.status(400).json({
                        status: 'Unsuccessful',
                        message: error.errors[0].message,
                        inputError:
                        (error.errors[0].path === 'emailaddress') ? 'email' :
                          error.errors[0].path,
                      }));
                  }
                }) // unsuccessful hash
                .catch(error => res.status(500).send(error));
            })
            .catch(errorMessage =>
              res.status(501).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
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
          inputError: error.field,
        }),
    );
  }
  static activateUser(req, res) {
    const activationToken = req.query.key || null;
    const userName = req.query.id || null;

    if (activationToken !== null &&
      userName !== null
    ) {
      JwTokens // verify user token
        .verifyToken(req, activationToken)
        .then((verifiedToken) => { // if token was successfully verified
          UserLoginDetails
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
                    } else if (activationUser.authString ===
                      userToken.activationString) {
                      // if authstring is valid
                      JwTokens
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
                .catch(errorMessage =>
                  res.status(500).json({
                    status: 'Unsuccessful',
                    error: errorMessage,
                  }));
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
  static signIn(req, res) {
    const password = req.body.password || null;
    const userName = req.body.username || null;
    UserHelper
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
                        JwTokens
                          .generateToken(
                          req.app.get('JsonSecret'),
                          userToken,
                          '96h')
                          .then((generatedToken) => {
                            if (generatedToken && generatedToken !== null) {
                              CheckSession
                                .setLogin(req, res, generatedToken);
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
            .catch(errorMessage =>
              res.status(500).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
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
          inputError: error.field,
        });
      });
  }
}
export default UserLoginDetails;
