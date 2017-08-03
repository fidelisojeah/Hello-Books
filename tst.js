const {
  UserDetails,
  UserLogin,
} = require('./server/models');

const bcrypt = require('bcrypt');

const saltRounds = 10;
const userName = 'test_user';
const pswd = 'aNewpassword12$$081978';

// const pswdan = 'whatever';
bcrypt.hash(pswd, saltRounds, (err, hash) => {

  UserLogin.create({
    username: userName,
    password: hash,
  }).then(UID => UserDetails.create({
    firstName: 'Anon',
    lastName: 'Anonymous',
    emailAddress: 'anonymous@hellobooks.com',
  }).then(userdetails => userdetails.setUserLogin(UID)));
});

bcrypt.hash(pswd, saltRounds, (err, hash) => {
  UserLogin.create({
    username: userName,
    password: hash,
    userDetails: {
      firstName: 'Anon',
      lastName: 'Anonymous',
      emailAddress: 'anonymous@hellobooks.com',
    },
  }, {
    include: [{
      model: UserDetails,
      as: 'userDetails',
    }],
  });
});
