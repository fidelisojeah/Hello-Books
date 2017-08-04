const {
  Authors,
  Books,
} = require('./server/models');

Authors.create({
  authorFirstName: 'Lurlene',
  authorLastName: 'McDaniel',
  dateofBirth: '1944-04-05',
});

Books.create({
  bookName: 'Angel of Hope',
  bookISBN: '9780553571486',
  description: `When Heather Barlow returns from Africa, 
  the joy she felt during her missionary trip fades.  She's still
  suffering from unresolved grief over the death of her friend Ian,
  and now that she 's back home in the United States`,
  bookImage: '/images/AngelofHope.jpg',
}).then((bookID) => {
  Authors.findOne({
    where: {
      id: '1',
    },
  }).then((AID) => {
    bookID.addAuthor(AID);
  });
});

Promise.all([
    Authors.findOne({
      where: {
        id: '1',
      },
    }), ,
  ])
  .then((newAuth) => {

  })

Books.create({
  bookName: 'Angel of Hope',
  bookISBN: '9780553571486',
  description: `When Heather Barlow returns from Africa, 
  the joy she felt during her missionary trip fades.  She's still
  suffering from unresolved grief over the death of her friend Ian,
  and now that she 's back home in the United States`,
  bookImage: '/images/AngelofHope.jpg',
});
/*
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
*/
