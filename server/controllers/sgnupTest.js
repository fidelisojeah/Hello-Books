const {
  UserDetails,
  UserLogin,
} = require('../models');

exports.create = (req, res) => {
  // create User Login with Hashed password
  UserLogin.create({
    username: req.body.username,
    password: req.body.password,
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
};
