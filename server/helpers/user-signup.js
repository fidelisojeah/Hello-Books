// email validation here
const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const usernameRegex = /\s+/g;
const validateEmail = emailAddress =>
  emailRegex.test(emailAddress); // returns true or false

const checkNoSpace = username =>
  usernameRegex.test(username);

class UserHelper {
  static validateSignup(username,
    password,
    lastname,
    firstname,
    email,
  ) {
    return new Promise((resolve, reject) => { // async
      if (firstname === null) {
        reject({
          message: 'First Name Invalid',
          field: 'firstname',
        });
      } else if (firstname.length < 2) {
        reject({
          message: 'First Name too short',
          field: 'firstname',
        });
      } else if (lastname === null) {
        reject({
          message: 'Last Name Invalid',
          field: 'lastname',
        });
      } else if (lastname.length < 2) {
        reject({
          message: 'Last Name too short',
          field: 'lastname',
        });
      } else if (username === null || checkNoSpace(username)) {
        reject({
          message: 'Username Invalid',
          field: 'username',
        });
      } else if (username.length < 2) {
        reject({
          message: 'Username too short',
          field: 'username',
        });
      } else if (email === null) {
        reject({
          message: 'No email Provided',
          field: 'email',
        });
      } else if (!validateEmail(email)) {
        reject({
          message: 'Email Address invalid',
          field: 'email',
        });
      } else if (password === null) {
        reject({
          message: 'Password Invalid',
          field: 'password',
        });
      } else if (password.length < 6) {
        reject({
          message: 'Password too short',
          field: 'password',
        });
      } else {
        resolve('All Good');
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
          field: 'username',
        });
      } else if (password === null) {
        reject({
          message: 'No Password supplied',
          field: 'password',
        });
      } else if (password.length < 6) {
        reject({
          message: 'Invalid Password',
          field: 'password',
        });
      } else {
        resolve('Valid Details');
      }
    });
  }
}
export default UserHelper;
