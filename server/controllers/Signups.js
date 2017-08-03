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
    }).then(signup => res.status(201).send(signup)).catch(error => res.status(400).send(error));
  });
};
