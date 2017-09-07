/*
const {
  UserDetails,
  UserLogin,
  Memberships,
  Books,
  BookLendings,
} = require('../models');
*/

import {
  UserDetails,
  UserLogin,
  Memberships,
  Books,
  BookLendings,
} from '../models';


const saltRounds = 12;
const bcrypt = require('bcrypt');
/**
 * New version of signup,
 * New table is only one table containing username and details
 */
exports.signupNew = (req, res) => {
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
      UserDetails.create({
        password: hash,
        username: req.body.username,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        emailAddress: req.body.email.toLowerCase(),
        phoneNumber: req.body.phone,
      }).then((signup) => {
        Memberships.findById(1) // default membership
          .then((Mem) => {
            signup.setMembership(Mem).then((signupData) => {
              // set default membership
              res.status(201).json({
                status: 'User Created',
                data: {
                  username: signupData.username,
                  firstname: signupData.firstName,
                  lastname: signupData.lastName,
                  email: signupData.emailAddress,
                  Membership: Mem.membershipName,
                },
              });
            });
          });
      }).catch(error => res.status(400).send(error));
    });
  } else {
    res.status(200).json({
      status: 'unsuccessful',
      error: 'incomplete details',
    });
  }
};
exports.signupv3 = (req, res) => {
  const username = req.body.username || null;
  const password = req.body.password || null;
  const firstname = req.body.firstname || null;
  const lastname = req.body.lastname || null;
  const phone = req.body.phone || null;
  const email = req.body.email || null;
  if (username !== null &&
    password !== null &&
    firstname !== null &&
    lastname !== null &&
    email !== null
  ) {
    // this includes with membership update
    // hash password as before
    bcrypt
      .hash(password, saltRounds, (err, hash) => {
        // create User Login with Hashed password
        UserDetails
          .create({
            // username is no longer case sensitive
            username: username.toLowerCase(),
            password: hash,
            firstName: firstname,
            lastName: lastname,
            emailAddress: email.toLowerCase(),
            phoneNumber: phone,
          }).then((signup) => {
            Memberships.findById(1) // default membership
              .then((Mem) => {
                signup
                  .setMembership(Mem)
                  .then((signupData) => {
                    // set default membership
                    res
                      .status(201).json({
                        status: 'User Created',
                        data: {
                          username: signupData.username,
                          firstname: signupData.firstName,
                          lastname: signupData.lastName,
                          email: signupData.emailAddress,
                          Membership: Mem.membershipName,
                        },
                      });
                  })
                  .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
          }).catch(error => res.status(400).json({
            status: 'unsuccessful',
            errors: error.errors,
          }));
      });
  } else {
    res.status(200).json({
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
    req.body.emailAdd
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
          emailAddress: req.body.emailAdd.toLowerCase(),
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
    res.status(200).json({
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
    res.status(200).json({
      message: 'You can\'t just do that though',
    });
  }
};

exports.clearTable = (req, res) => { // at end of tests
  if (process.env.NODE_ENV === 'test') { // if in test environment
    UserDetails.truncate({
      cascade: true,
      restartIdentity: true,
    }).then(() =>
      res.status(204).send({}));
  } else {
    res.status(200).json({
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
    res.status(200).json({
      status: 'no Password',
    });
  } else if (req.body.password) {
    res.status(200).json({
      status: 'no Username',
    });
  } else {
    res.status(200).json({
      status: 'no Username and password',
    });
  }
};
exports.login = (req, res) => {
  if (req.body.username && req.body.password) {
    UserDetails.findOne({ // check that user exists in database
      where: {
        username: req.body.username,
        isActive: true,
      },
    }).then((Username) => {
      if (Username === null) { // no user of such exists
        res.status(200).json({ // no user is a valid request
          status: 'invalid user',
          //  error: 'invalid user',
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
    res.status(200).json({
      status: 'no Password',
    });
  } else if (req.body.password) {
    res.status(200).json({
      status: 'no Username',
    });
  } else {
    res.status(200).json({
      status: 'no Username and password',
    });
  }
};
exports.loginNew = (req, res) => {
  if (req.body.username && req.body.password) {
    UserDetails.findOne({ // check that user exists in database
      where: {
        isActive: true,
        $or: [{
          username: req.body.username.toLowerCase(),
        }, {
          emailAddress: req.body.username.toLowerCase(),
        }],
      },
    }).then((Username) => { // change this value to something different
      if (Username === null) { // no user of such exists
        res.status(200).json({ // no user is a valid request
          status: 'invalid user',
          //  error: 'invalid user',
        });
      } else {
        // check if password is valid
        bcrypt.compare(req.body.password, Username.dataValues.password).then((pwd) => {
          if (pwd === true) {
            res.status(202).json({ // accepted
              status: 'success',
              data: {
                Username: Username.username, // change case
                FirstName: Username.firstName,
                Lastname: Username.lastName,
              },
            });
          } else {
            res.status(200).json({ // no user/password is a valid request
              status: 'invalid',
              message: 'invalid user or password',
            });
          }
        });
      }
    }).catch(error => res.status(400).send(error));
  } else if (req.body.username) {
    res.status(200).json({
      status: 'invalid',
      message: 'no Password Specified',
    });
  } else if (req.body.password) {
    res.status(200).json({
      status: 'invalid',
      message: 'no Username/email Specified',
    });
  } else {
    res.status(200).json({
      status: 'invalid',
      message: 'no Username and password',
    });
  }
};
exports.borrowBook = (req, res) => {
  const UserId = parseInt(req.params.userId, 10);
  const bookid = parseInt(req.body.bookId, 10); // change case

  const borrowdate = req.body.borrowdate;
  const duedate = req.body.duedate;

  if (isNaN(UserId) || isNaN(bookid)) {
    res.status(400).json({
      status: 'invalid',
      message: 'no UserID or bookID specified',
    });
  } else {
    UserDetails.findById(UserId) // search for user
      .then((UsrDet) => {
        if (!UsrDet) {
          res.status(200).json({
            status: 'invalid UserId',
            message: 'UserId does not exist',
          });
        } else {
          Books.findOne({
            where: {
              id: bookid,
              isActive: true,
            },
          }).then((foundBook) => {
            if (foundBook) { // if book is found
              if (foundBook.bookQuantity < 1) {
                // if all copies of book have been borrowed
                res.status(200).json({
                  status: 'invalid',
                  message: 'Book unavailable',
                });
              } else {
                // add new field to booklending table (join table)
                BookLendings.create({
                  bookId: foundBook.id,
                  userId: UsrDet.id,
                  borrowDate: borrowdate,
                  dueDate: duedate,
                }).then((crtLending) => { // if successfully added
                  if (crtLending) {
                    foundBook.update({
                      bookQuantity: foundBook.bookQuantity - 1,
                    }).then( // book quantity successfully updated
                      bookBorrowed => res.status(202).json({
                        status: 'Success',
                        message: 'Book Successfully Borrowed',
                        Book: bookBorrowed.bookName,
                        QuantityLeft: bookBorrowed.bookQuantity,
                      })).catch(error => res.status(400).send(error));
                  }
                }).catch(error => res.status(400).send(error));
                // couldn't add Book Lending
              }
            } else {
              // if foundBook instance is empty
              res.status(200).json({
                status: 'Invalid',
                message: 'Book not found',
              });
            }
          }).catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  }
};
exports.viewBorrowed = (req, res) => { // more descriptive name
  const UserId = parseInt(req.params.userId, 10); // case
  const isReturned = req.query.returned || null;

  // const viewBor =
  if (!isNaN(UserId)) {
    // Bring up UserDetails
    UserDetails
      .findById(UserId)
      .then((UsrDet) => {
        // if User not found
        if (!UsrDet) {
          res.status(200).json({
            status: 'invalid UserId',
            message: 'UserId does not exist',
          });
        } else { // if User found
          // find all BookLendings with User Id
          const returnedSearch = (isReturned === 'false') ? {
            userId: UsrDet.id,
            actualReturnDate: null,
          } : {
              userId: UsrDet.id,
            };
          BookLendings
            .findAll({
              where: // {
              // userId: UsrDet.id,
              returnedSearch,
              // },
              include: [{
                model: Books,
                attributes: ['bookName', 'bookISBN', 'bookImage', 'publishYear'],
                where: {
                  isActive: true,
                },
              }],
              attributes: [
                'id',
                'borrowDate',
                'dueDate',
                'actualReturnDate',
              ],
            })
            .then((Lends) => {
              if (Lends) {
                res.status(202).json({
                  status: 'success!!!',
                  data: Lends,
                  // retud: returnedSearch,
                });
              } else {
                res.status(200).json({
                  status: 'Non found',
                  message: 'User has no borrowed Books',
                });
              }
            })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  } else {
    res.status(400).json({
      status: 'invalid',
      message: 'UserId is invalid',
    });
  }
};
exports.returnBook = (req, res) => {
  const UserId = parseInt(req.params.userId, 10);
  const bookid = parseInt(req.body.bookId, 10);
  const lendId = parseInt(req.body.lendId, 10);

  if (isNaN(UserId) || isNaN(lendId)) {
    res.status(200).json({
      status: 'invalid',
      message: 'no borrowed book specified',
    });
  } else {
    BookLendings
      .findById(lendId)
      .then((foundLentBook) => {
        if (foundLentBook && foundLentBook.actualReturnDate === null) { // if lent book is found
          if (foundLentBook.bookId === bookid &&
            foundLentBook.userId === UserId) {
            // if records match
            Books
              .findById(bookid)
              .then((borrowedBook) => {
                if (borrowedBook) {
                  foundLentBook // update records
                    .update({
                      actualReturnDate: new Date(),
                    })
                    .then((lentUpdate) => {
                      borrowedBook
                        .update({
                          bookQuantity: borrowedBook.bookQuantity + 1,
                        })
                        .then((bookReturn) => {
                          res.status(200).json({
                            status: 'Success',
                            message: {
                              BookName: borrowedBook.bookName,
                              BookQuantity: bookReturn.bookQuantity,
                              BorrowedDate: lentUpdate.borrowDate,
                              DueDate: lentUpdate.dueDate,
                              returnDate: lentUpdate.actualReturnDate,
                              outStanding:
                              (lentUpdate.actualReturnDate - lentUpdate.dueDate) < 0 ?
                                0 : lentUpdate.actualReturnDate - lentUpdate.dueDate,
                            },
                          });
                        })
                        .catch(error => res.status(400).send(error));
                    })
                    .catch(error => res.status(400).send(error));
                } else {
                  res.status(200).json({
                    status: 'invalid',
                    message: 'Book not found',
                  });
                }
              })
              .catch(error => res.status(400).send(error));
          } else {
            res.status(200).json({
              status: 'invalid',
              message: 'User/Book not matching records',
            });
          }
        } else if (foundLentBook.actualReturnDate !== null) {
          res.status(200).json({
            status: 'invalid',
            message: 'Book already returned',
          });
        } else {
          res.status(200).json({
            status: 'invalid UserId',
            message: 'No records found',
          });
        }
      }).catch(error => res.status(400).send(error));
  }
};
