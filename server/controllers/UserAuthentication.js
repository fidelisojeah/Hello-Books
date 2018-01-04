import bcrypt from 'bcrypt';
import {
  UserDetails,
  Memberships,
} from '../models';
import JwTokens from '../helpers/JwTokens';
import CheckSession from '../middleware/CheckSession';
import UserHelper from '../helpers/UserHelper';
import HelloBooksSendMail from '../helpers/HelloBooksSendMail';

class UserAuthentication {
  /**
   *
   * @param {object} userInfo User signup data
   *
   * @param {object} tokenInfo info to be generated
   *
   * @param {string} jsonSecret JSON token secret
   *
   * @returns {promise}
   */
  static activationTokenWithEmail(userInfo, tokenInfo, jsonSecret) {
    return new Promise((resolve, reject) => {
      JwTokens
        .generateToken(
        jsonSecret,
        tokenInfo,
        '24h') // expires in 24hours
        .then((signupToken) => {
          const infoForVerification = {
            userEmail:
              userInfo.emailaddress,
            userFirstName:
              userInfo.firstname,
            userLastName:
              userInfo.lastname,
            username:
              userInfo.username
          };
          const sendActivationEmail =
            new HelloBooksSendMail(
              infoForVerification,
              signupToken);

          sendActivationEmail
            .sendVerificationEmail();

          resolve(signupToken);
        })
        .catch(error => // if unsuccessful token
          reject(error)
        );
    });
  }
  /**
  * @description Method Generates new authentication email
  *
  * @param {object} request HTTP Request Object
  *
  * @param {object} response HTTP Response Object
  *
  * @returns {void}
  */
  static generateActivationEmail(request, response) {
    const identifier = request.params.username;
    Promise.all([
      UserDetails
        .findOne({
          where: {
            $or: [{
              username: identifier.toLowerCase(),
            }, {
              emailaddress: identifier.toLowerCase(),
            }],
            isActivated: false
          },
          attributes: [
            'id', 'username',
            'firstname', 'lastname',
            'emailaddress'
          ]
        }),
      JwTokens
        .randomString(24)
    ])
      .then(([foundUser, activationBuffer]) => {
        if (foundUser) {
          foundUser
            .update({
              authString: activationBuffer
            })
            .then(() => {
              const tokenInfo = {
                username: foundUser.username,
                userId: foundUser.id,
                email: foundUser.emailaddress,
                authString: activationBuffer,
              };
              UserAuthentication
                .activationTokenWithEmail(
                foundUser,
                tokenInfo,
                request.app.get('JsonSecret')
                )
                .then(() => {
                  response.status(200).json({
                    status: 'Success',
                    message: 'Email Sent'
                  });
                })
                .catch(error =>
                  response.status(500).json({
                    status: 'none',
                    message: 'Something went wrong',
                    error
                  }));
            })
            .catch((error) => {
              return response.status(500).json({
                status: 'Unsuccessful',
                error
              });
            });
        } else {
          response.status(400).json({
            status: 'Unsuccessful',
            error: 'Username Invalid'
          });
        }
      })
      .catch(errorMessage =>
        response.status(500).json({
          status: 'Unsuccessful',
          error: errorMessage,
        })
      );
  }
  /**
   * @description Method checks if user exists
   *
   * @param {object} request HTTP Request Object
   *
   * @param {object} response HTTP Response Object
   *
   * @returns {void}
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
        response.status(202).json({
          status: 'Success',
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
   *
   * @param {String} verifiedToken
   *
   * @param {String} userName
   *
   * @returns {void}
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
   *
   * @param {object} request HTTP Request Object
   *
   * @param {object} response HTTP Response Object
   *
   * @returns {void}
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
      .then(() => {
        Promise.all([
          JwTokens
            .randomString(24),
          bcrypt
            .hash(password, 8) // hash password
        ])
          .then(([activationBuf, hashPassword]) => {
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
                        UserAuthentication
                          .activationTokenWithEmail(
                          signupData.dataValues,
                          tokenInfo,
                          request.app.get('JsonSecret')
                          )
                          .then(signupToken =>
                            response.status(201).json({
                              status: 'Success',
                              message: 'User account created',
                              membership:
                                setMembershipDetails.membershipName,
                              token: signupToken
                            })
                          )
                          .catch(error =>
                            response.status(202).json({
                              status: 'none',
                              message: `User account created, 
                                        Token unsuccessful`,
                              membership:
                                setMembershipDetails.membershipName,
                              error,
                            }));
                      })
                      .catch(errorMessage =>
                        response.status(500).json({
                          status: 'Unsuccessful',
                          error: errorMessage,
                        }));
                    // set membership unsuccessful
                  })
                  .catch(error => response.status(501).json({
                    status: 'Unsuccessful',
                    error
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
          })
          .catch(errorMessage =>
            response.status(501).json({
              status: 'Unsuccessful',
              error: errorMessage,
            }));
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
   *
   * @param {object} request HTTP Request Object
   *
   * @param {object} response HTTP Response Object
   *
   * @returns {void}
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
          UserAuthentication
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
      .then(() => {
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
                          CheckSession
                            .setLogin(request, response, generatedToken);
                          response.status(202).json({
                            status: 'Successful',
                            message: 'Signin Successful',
                            token: generatedToken,
                          });
                        })
                        .catch(error =>
                          response.status(501).json({
                            status: 'Unsuccessful',
                            error
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
                  error,
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
export default UserAuthentication;
