import bcrypt from 'bcrypt';
import {
  UserDetails,
  Memberships,
} from '../models';
import JwTokens from '../middleware/helpers';
import CheckSession from '../middleware/session';
import UserHelper from '../helpers/user-signup';
import HelloBooksSendMail from '../helpers/node-email';

class UserLoginDetails {
  /**
   * @description Method checks if user exists
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   */
  static checkUserExists(request, response) {
    const userName = request.params.identifier;
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
        response.json({
          userHere
        });
      })
      .catch(errorMessage =>
        response.status(500).json({
          status: 'Unsuccessful',
          error: errorMessage,
        }));
  }
  /**
   * @description validates signup info
   * @param {String} verifiedToken
   * @param {String} userName
   * @returns {Promise}
   */
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
  /**
   * @description When user signs up
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   */
  static signUp(request, response) {
    // declare variables
    const password = request.body.password || null;
    const lastName = request.body.lastname || null;
    const firstName = request.body.firstname || null;
    const email = request.body.email || null;
    const phone = request.body.phone || null;
    const userName = request.body.username || null;

    UserHelper
      .validateSignup(userName,
      password, lastName, firstName, email,
    )
      .then((activation) => {
        if (activation === 'All Good') { // if Vaild
          JwTokens
            .randomString(24)
            .then((activationBuf) => {
              bcrypt
                .hash(password, 8) // hash password
                .then((hashPassword) => {
                  if (!hashPassword) {
                    response.status(500).json({
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
                                  request.app.get('JsonSecret'),
                                  tokenInfo,
                                  '24h') // expires in 24hours
                                  .then((signupToken) => {
                                    if (signupToken) { // for verification
                                      const infoForVerification = {
                                        userEmail:
                                          signupData.dataValues.emailaddress,
                                        userFirstName:
                                          signupData.dataValues.firstname,
                                        userLastName:
                                          signupData.dataValues.lastname,
                                        username:
                                          signupData.dataValues.username
                                      };

                                      const sendActivationEmail =
                                        new HelloBooksSendMail(
                                          infoForVerification,
                                          signupToken);

                                      sendActivationEmail
                                        .sendVerificationEmail()
                                        .then((mailInfo) => {
                                          console.log(mailInfo);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                      response.status(201).json({
                                        status: 'Success',
                                        message: 'User account created',
                                        membership:
                                          setMembershipDetails.membershipName,
                                        token: signupToken
                                      });
                                    }
                                  })
                                  .catch(error => // if unsuccessful token
                                    response.status(202).json({
                                      status: 'none',
                                      message: `User account created, 
                                      Token unsuccessful`,
                                      membership:
                                        setMembershipDetails.membershipName,
                                      errorMsg: error,
                                    }));
                              })
                              .catch(errorMessage =>
                                response.status(500).json({
                                  status: 'Unsuccessful',
                                  error: errorMessage,
                                }));
                            // set membership unsuccessful
                          }).catch(error => response.status(400).json({
                            status: 'Unsuccessful',
                            message: error.errors[0].message,
                          }));
                      })
                      .catch(error => response.status(400).json({
                        status: 'Unsuccessful',
                        message: error.errors[0].message,
                        inputError:
                          (error.errors[0].path === 'emailaddress') ?
                            'email'
                            : error.errors[0].path,
                      }));
                  }
                }) // unsuccessful hash
                .catch(error => response.status(500).send(error));
            })
            .catch(errorMessage =>
              response.status(501).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
        } else {
          response.status(400).json({
            status: 'Unsuccessful',
          });
        }
      })
      .catch(error => // if information is incomplete
        response.status(400).json({
          status: 'Unsuccessful',
          message: error.message,
          inputError: error.field,
        }),
    );
  }
  /**
   * @description Method would eventually activate current user's email
   * @param {object} request HTTP Request Object
   * @param {object} response HTTP Response Object
   */
  static activateUser(request, response) {
    const activationToken = request.query.key || null;
    const userName = request.query.id || null;

    if (activationToken !== null &&
      userName !== null
    ) {
      JwTokens // verify user token
        .verifyToken(request, activationToken)
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
                      response.status(200).json({
                        status: 'None',
                        message: 'User already activated',
                      });
                    } else if (activationUser.authString ===
                      userToken.activationString) {
                      // if authstring is valid
                      JwTokens
                        .randomString(24)
                        .then((randString) => {
                          activationUser
                            .update({
                              // put new random string in database
                              isActivated: true,
                              authString: randString,
                            })
                            .then(() =>
                              response.status(202).json({
                                status: 'Success',
                                message: 'User Activated',
                              }))
                            .catch(error =>
                              response.status(501).json({
                                status: 'Unsuccessful',
                                message: error,
                              }));
                        })
                        .catch(() => response.status(501).json({
                          // error creating a random string
                          status: 'Unsuccessful',
                          message: 'Server error try again',
                        }));
                    } else if (
                      activationUser.authString !== userToken.activationString
                    ) {
                      response.status(403).json({
                        status: 'Unsuccessful',
                        message: 'Used token',
                        tokenstr: userToken.activationString,
                        dbasestr: activationUser.authString,
                      });
                    }
                  } else { // if user is not found
                    response.status(403).json({
                      status: 'Unsuccessful',
                      message: 'Invalid User',
                    });
                  }
                }) // if user is not found
                .catch(errorMessage =>
                  response.status(500).json({
                    status: 'Unsuccessful',
                    error: errorMessage,
                  }));
            })
            .catch(error => response.status(403).json({
              status: 'Unsuccessful',
              message: error,
            }));
        }) // if token cannot be verified
        .catch(error => response.status(403).send(error));
    } else {
      response.status(400).json({
        status: 'Unsuccessful',
        message: 'Link Invalid',
      });
    }
  }
  static signIn(request, response) {
    const password = request.body.password || null;
    const userName = request.body.username || null;
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
                          request.app.get('JsonSecret'),
                          userToken,
                          '96h')
                          .then((generatedToken) => {
                            if (generatedToken && generatedToken !== null) {
                              CheckSession
                                .setLogin(request, response, generatedToken);
                              response.status(202).json({
                                status: 'Successful',
                                message: 'Signin Successful',
                                token: generatedToken,
                              });
                            } else {
                              response.status(501).json({
                                status: 'Unsuccessful',
                                message: 'Server Error, Try again',
                              });
                            }
                          })
                          .catch(error =>
                            response.status(501).json({
                              status: 'Unsuccessful',
                              message: error,
                            }));
                      } else {
                        response.status(401).json({
                          status: 'Unsuccessful',
                          message: 'Email Address not Verified',
                        });
                      }
                    } else {
                      // if password is invalid
                      response.status(401).json({
                        status: 'Unsuccessful',
                        message: 'Invalid Username or password',
                      });
                    }
                  })
                  .catch(error => response.status(500).json({
                    status: 'Unsuccessful',
                    message: error,
                  }));
              } else {
                response.status(401).json({
                  status: 'Unsuccessful',
                  message: 'Invalid Username',
                });
              }
            })
            .catch(errorMessage =>
              response.status(500).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
        } else { // if no error, assume server error(timeout)
          response.status(501).json({
            status: 'Unsuccessful',
            message: 'Signin Unsuccessful',
          });
        }
      })
      .catch((error) => {
        response.status(400).json({
          status: 'Unsuccessful',
          message: error.message,
          inputError: error.field,
        });
      });
  }
}
export default UserLoginDetails;
