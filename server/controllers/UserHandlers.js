const {
  UserDetails,
  UserLogin,
} = require('../models');

const saltRounds = 12;
const bcrypt = require('bcrypt');


exports.create = (req, res) => {
  // hash password
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // create User Login with Hashed password
    UserLogin.create({
      username: req.body.username,
      password: hash,
      userDetails: { // create User details on seperate table with details
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        emailAddress: req.body.email.toLowerCase(),
        phoneNumber: req.body.phone,
      },
    }, {
      include: [{ // relationship
        model: UserDetails,
        as: 'userDetails',
      }],
    }).then((signup) => {
      res.status(201).json({
        status: 'success',
        data: signup,
      });
    }).catch(error => res.status(400).send(error));
  });
};
exports.deleteAll = (req, res) => { // at end of tests
  if (process.env.NODE_ENV === 'test') { // if in test environment
    UserLogin.truncate({
      cascade: true,
      restartIdentity: true,
    }).then(() =>
      res.status(204).send({}));
  } else {
    res.status(403).send({
      message: 'You can\'t just do that though',
    });
  }
};

exports.signin = (req, res) => {
  UserLogin.findOne({ // check that user exists in database
    where: {
      username: req.body.username,
    },
  }).then((Username) => {
    if (Username === null) { // no user of such exists
      res.status(200).json({ // no user is a valid request
        status: 'success',
        error: 'invalid user',
      });
    } else {

    }
  })
};
