const {
  UserDetails,
  UserLoginDetails,
} = require('./server/models');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const userName = 'test_user';
const pswd = 'aNewpassword12$$081978';
// const pswdan = 'whatever';

let th;
bcrypt.hash(pswd, saltRounds, (err, hash) => {
  UserLoginDetails.create({
    username: userName,
    password: hash,
  });
});

UserLoginDetails.findOne({
  where: {
    username: userName,
  },
}).then(UID => UserDetails.create({
  firstName: 'Anon',
  lastName: 'Anonymous',
  usernameID: UID.id,
  emailAddress: 'anonymous@hellobooks.com',
}));
// .then(loginDetails => loginDetails.setUsrname(UID)));
UserLoginDetails.findOne({
  where: {
    username: userName,
  },
}).then((UID) => {
  th = UID.id;
});
