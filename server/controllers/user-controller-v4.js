import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  UserDetails,
  Memberships,
} from '../models';

// email validation here
const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const validateEmail = emailAddress =>
  emailRegex.test(emailAddress); // returns true or false

class userLoginDetails {

  static validateSignup(username,
    password,
    lastname,
    firstname,
    email,
  ) {
    if (username === null) {
      return 'Username Invalid';
    } else if (password === null) {
      return 'Password Invalid';
    } else if (email === null) {
      return 'Email Address Invalid';
    } else if (firstname === null) {
      return 'First Name Invalid';
    } else if (lastname === null) {
      return 'Last Name Invalid';
    } else if (!validateEmail(email)) {
      return 'Email Address is invalid';
    } else if (username.length < 2) {
      return 'Username too short';
    } else if (password.length < 6) {
      return 'Password too short';
    } else if (lastname.length < 2) {
      return 'Last Name too short';
    } else if (firstname.length < 2) {
      return 'First Name too short';
    }
    return 0;
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

    const errOrValid = userLoginDetails.validateSignup(userName,
      password, lastName, firstName, email,
    );
    if (errOrValid !== 0) { // if unvalidated information
      res.status(400).json({
        status: 'unsuccessful',
        error: errOrValid,
      });
    } else {
      bcrypt
        .hash(password, 8, (err, hash) => {
          // using hashed password (hash)
          if (err) {
            res.status(400).send(err);
          } else {
            UserDetails
              .create({
                firstname: firstName,
                lastname: lastName,
                emailaddress: email.toLowerCase(),
                phonenumber: phone,
                username: userName.toLowerCase(),
                password: hash,
              })
              .then(userSignup =>
                Memberships
                .findById(1)
                .then(setMembershipDetails =>
                  userSignup.setMembership(setMembershipDetails),
                )
                .then((signupData) => {
                  // Add user info to token
                  const tokenInfo = {
                    username: signupData.dataValues.username,
                    userId: signupData.dataValues.id,
                    email: signupData.dataValues.emailaddress,
                  };
                  const signupToken = jwt.sign(tokenInfo,
                    req.app.get('JsonSecret'), {
                      expiresIn: 1440 * 60, // 24 hours
                    }); // for verification things
                  res.status(202).json({
                    status: 'success',
                    message: 'User account created',
                    token: signupToken, // would be part of mail
                  });
                })
                .catch(error => res.status(400).send(error)),
              )
              .catch(error => res.status(400).json({
                status: 'unsuccessful',
                errors: error.errors,
              }));
          }
        });
    }
  }
  static activateUser(req, res) {

  }
  static signin(req, res) {

  }
}
export default userLoginDetails;
