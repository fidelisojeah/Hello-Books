import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  UserDetails,
  Memberships,
} from '../models';
import jwTokens from '../middleware/helpers';

// email validation here
const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const validateEmail = emailAddress =>
  emailRegex.test(emailAddress); // returns true or false

class userLoginDetails {
  static tst(req, res) {
    const tok = {
      info: 'info1',
    };
    jwTokens
      .generateToken(req, tok, '24h') // expires in 24hours
      .then((signupToken) => {
        if (signupToken) {
          // for verification things
          res.status(202).json({
            token: signupToken, // would be part of mail
          });
        }
      })
      .catch(error =>
        // if unsuccessful
        res.status(202).json({
          status: 'none',
          message: error,
        }));
    /*
    validateSignup('fidelis', 'ojeahhda', 'Ojeah', 'fidelisojeah', 'fidelis_oj@yahoo.co.uk')
      .then()
      .catch();
    res.status(200).json({});
     */
  }
  // validates signup info
  static validateSignup(username,
    password,
    lastname,
    firstname,
    email,
  ) {
    return new Promise((resolve, reject) => { // async
      if (username === null) {
        reject('Username Invalid');
      } else if (password === null) {
        reject('Password Invalid');
      } else if (email === null) {
        reject('Email Address Invalid');
      } else if (firstname === null) {
        reject('First Name Invalid');
      } else if (lastname === null) {
        reject('Last Name Invalid');
      } else if (!validateEmail(email)) {
        reject('Email Address is invalid');
      } else if (username.length < 2) {
        reject('Username too short');
      } else if (password.length < 6) {
        reject('Password too short');
      } else if (lastname.length < 2) {
        reject('Last Name too short');
      } else if (firstname.length < 2) {
        reject('First Name too short');
      } else {
        // generate random string
        jwTokens.randomString()
          .then(randBuf =>
            resolve(randBuf))
          .catch(error => reject(error));
      }
    });
  }
  static validateActivationToken(verifiedToken, userName) {
    return new Promise((resolve, reject) => {
      if (verifiedToken.username !== userName) { // if username is invalid
        reject('Invalid Token');
      } else {
        resolve(verifiedToken.userId); // return the user ID from the token
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
                res.status(400).json({
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
                              .generateToken(req, tokenInfo, '24h') // expires in 24hours
                              .then((signupToken) => {
                                if (signupToken) { // for verification things
                                  res.status(202).json({
                                    status: 'success',
                                    message: 'User account created',
                                    token: signupToken, // would be part of mail
                                  });
                                }
                              })
                              .catch(error => // if unsuccessful token
                                res.status(202).json({
                                  status: 'none',
                                  message: 'User account created Token unsuccessful',
                                  errorMsg: error,
                                }));
                          }).catch(error => res.status(400).send(error));
                        // set membership unsuccessful
                      }).catch(error => res.status(400).json({
                        status: 'unsuccessful',
                        message: error.errors[0].message,
                      }));
                  })
                  .catch(error => res.status(400).json({
                    status: 'unsuccessful',
                    message: error.errors[0].message,
                  }));
              }
            }) // unsuccessful hash
            .catch(error => res.status(400).send(error));
        } else {
          res.status(400).json({
            status: 'unsuccessful',
          });
        }
      })
      .catch(error => // if information is incomplete
        res.status(400).json({
          status: 'unsuccessful',
          message: error,
        }),
      );
  }
  static activateUser(req, res) {
    const activationToken = req.query.key || null;
    const userName = req.query.id || null;

    if (activationToken !== null &&
      userName !== null
    ) {
      jwt
        .verify(activationToken,
          req.app.get('JsonSecret'),
          (error, verifiedToken) => {
            if (error) {
              res.status(403).send(error);
            } else if (verifiedToken) {
              userLoginDetails.validateActivationToken(verifiedToken, userName)
                .then(userID =>
                  UserDetails.findOne({
                    where: {
                      id: userID,
                      isActive: true,
                    },
                  }),
                )
                .then((actUserDetails) => {
                  if (actUserDetails === null) {
                    res.status(403).json({
                      status: 'unsuccessful',
                      message: 'User not found',
                    });
                  } else { // if user has not been activated
                    actUserDetails
                      .update({
                        isActivated: true,
                      })
                      .then(() => {
                        const tokenInfo = {
                          username: actUserDetails.dataValues.username,
                          userId: actUserDetails.dataValues.id,
                          firstName: actUserDetails.dataValues.firstname,
                          lastName: actUserDetails.dataValues.lastname,
                          email: actUserDetails.dataValues.emailaddress,
                          userRole: 'user',
                        };
                        jwt.sign(tokenInfo,
                          req.app.get('JsonSecret'), {
                            expiresIn: '12h', // 24 hours
                          },
                          (tokenError, signIntoken) => {
                            if (tokenError) {
                              res.status(400).send(tokenError);
                            } else if (signIntoken) {
                              // for signin after activation
                              res.status(202).json({
                                status: 'success',
                                message:
                                  (actUserDetails.dataValues.isActivated === true) ? 'User already activated' : 'User Activated',
                                token: signIntoken,
                              });
                            } else {
                              res.status(405).json({
                                message: 'some error',
                              });
                            }
                          });
                      }).catch(tokenError => res.status(400).send(tokenError));
                  }
                })
                .catch(errr => res.status(403).send(errr));
            }
          });
    } else {
      res.status(400).json({
        status: 'unsuccessful',
        message: 'Link Inavlid',
      });
    }
  }
  static signin(req, res) {

  }
}
export default userLoginDetails;
