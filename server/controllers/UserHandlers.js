const {
  UserDetails,
  UserLogin,
  Membership,
} = require('../models');

const saltRounds = 12;
const bcrypt = require('bcrypt');

exports.signup2 = (req, res) => {
  if (req.body.username &&
    req.body.password &&
    req.body.firstname &&
    req.body.lastname &&
    req.body.email
  ) {
    // this includes with membership update
    // hash password as before
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
        Membership.findOne({ // find author (just one here)
          where: {
            id: 1,
          },
        }).then((Mem) => {
          signup.userDetails.setMembershipDetail(Mem);
        });
        res.status(201).json({
          status: 'success',
          data: signup,
          membership: Mem,
        });
      }).catch(error => res.status(400).send(error));
    });
  } else {
    res.status(400).json({
      status: 'unsuccessful',
      error: 'incomplete details',
    });
  }
};

exports.signup = (req, res) => {
  // check that values are in and valid
  if (req.body.username &&
    req.body.password &&
    req.body.firstname &&
    req.body.lastname &&
    req.body.email
  ) {
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
  } else {
    res.status(400).json({
      status: 'unsuccessful',
      error: 'incomplete details',
    });
  }
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
  if (req.body.username && req.body.password) {
    UserLogin.findOne({ // check that user exists in database
      where: {
        username: req.body.username,
      },
    }).then((Username) => {
      if (Username === null) { // no user of such exists
        res.status(200).json({ // no user is a valid request
          status: 'invalid user',
          // error: 'invalid user',
        });
      } else {
        // check if password is valid
        bcrypt.compare(req.body.password, Username.dataValues.password).then((pwd) => {
          if (pwd === true) {
            res.status(202).json({ // accepted
              status: 'success',
              data: Username,
            });
          } else {
            res.status(200).json({ // no user/password is a valid request
              status: 'invalid user or password',
              //  error: 'invalid user or password',
            });
          }
        });
      }
    }).catch(error => res.status(400).send(error));
  } else if (req.body.username) {
    res.status(401).json({
      status: 'no Password',
    });
  } else if (req.body.password) {
    res.status(401).json({
      status: 'no Username',
    });
  } else {
    res.status(401).json({
      status: 'no Username and password',
    });
  }
};
