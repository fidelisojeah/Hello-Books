'use strict';

var _models = require('../models');

var saltRounds = 12; /*
                     const {
                       UserDetails,
                       UserLogin,
                       Memberships,
                       Books,
                       BookLendings,
                     } = require('../models');
                     */

var bcrypt = require('bcrypt');
/**
 * New version of signup,
 * New table is only one table containing username and details
 */
exports.signupNew = function (req, res) {
  if (req.body.username && req.body.password && req.body.firstname && req.body.lastname && req.body.email) {
    // this includes with membership update
    // hash password as before
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      // create User Login with Hashed password
      _models.UserDetails.create({
        username: req.body.username,
        password: hash,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        emailAddress: req.body.email.toLowerCase(),
        phoneNumber: req.body.phone
      }).then(function (signup) {
        _models.Memberships.findById(1) // default membership
        .then(function (Mem) {
          signup.setMembership(Mem).then(function (signupData) {
            // set default membership
            res.status(201).json({
              status: 'User Created',
              data: {
                username: signupData.username,
                firstname: signupData.firstName,
                lastname: signupData.lastName,
                email: signupData.emailAddress,
                Membership: Mem.membershipName
              }
            });
          });
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    });
  } else {
    res.status(200).json({
      status: 'unsuccessful',
      error: 'incomplete details'
    });
  }
};
exports.signupv3 = function (req, res) {
  var username = req.body.username || null;
  var password = req.body.password || null;
  var firstname = req.body.firstname || null;
  var lastname = req.body.lastname || null;
  var phone = req.body.phone || null;
  var email = req.body.email || null;
  if (username !== null && password !== null && firstname !== null && lastname !== null && email !== null) {
    // this includes with membership update
    // hash password as before
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // create User Login with Hashed password
      _models.UserDetails.create({
        // username is no longer case sensitive
        username: username.toLowerCase(),
        password: hash,
        firstName: firstname,
        lastName: lastname,
        emailAddress: email.toLowerCase(),
        phoneNumber: phone
      }).then(function (signup) {
        _models.Memberships.findById(1) // default membership
        .then(function (Mem) {
          signup.setMembership(Mem).then(function (signupData) {
            // set default membership
            res.status(201).json({
              status: 'User Created',
              data: {
                username: signupData.username,
                firstname: signupData.firstName,
                lastname: signupData.lastName,
                email: signupData.emailAddress,
                Membership: Mem.membershipName
              }
            });
          }).catch(function (error) {
            return res.status(400).send(error);
          });
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }).catch(function (error) {
        return res.status(400).json({
          status: 'unsuccessful',
          errors: error.errors
        });
      });
    });
  } else {
    res.status(200).json({
      status: 'unsuccessful',
      error: 'incomplete details'
    });
  }
};
exports.signup = function (req, res) {
  // check that values are in and valid
  if (req.body.username && req.body.password && req.body.firstname && req.body.lastname && req.body.emailAdd) {
    // hash password
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      // create User Login with Hashed password
      _models.UserLogin.create({
        username: req.body.username,
        password: hash,
        userDetails: { // create User details on seperate table with details
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          emailAddress: req.body.emailAdd.toLowerCase(),
          phoneNumber: req.body.phone
        }
      }, {
        include: [{ // relationship
          model: _models.UserDetails,
          as: 'userDetails'
        }]
      }).then(function (signup) {
        res.status(201).json({
          status: 'success',
          data: signup
        });
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    });
  } else {
    res.status(200).json({
      status: 'unsuccessful',
      error: 'incomplete details'
    });
  }
};
exports.deleteAll = function (req, res) {
  // at end of tests
  if (process.env.NODE_ENV === 'test') {
    // if in test environment
    _models.UserLogin.truncate({
      cascade: true,
      restartIdentity: true
    }).then(function () {
      return res.status(204).send({});
    });
  } else {
    res.status(200).json({
      message: 'You can\'t just do that though'
    });
  }
};

exports.clearTable = function (req, res) {
  // at end of tests
  if (process.env.NODE_ENV === 'test') {
    // if in test environment
    _models.UserDetails.truncate({
      cascade: true,
      restartIdentity: true
    }).then(function () {
      return res.status(204).send({});
    });
  } else {
    res.status(200).json({
      message: 'You can\'t just do that though'
    });
  }
};

exports.signin = function (req, res) {
  if (req.body.username && req.body.password) {
    _models.UserLogin.findOne({ // check that user exists in database
      where: {
        username: req.body.username
      }
    }).then(function (Username) {
      if (Username === null) {
        // no user of such exists
        res.status(200).json({ // no user is a valid request
          status: 'invalid user'
          // error: 'invalid user',
        });
      } else {
        // check if password is valid
        bcrypt.compare(req.body.password, Username.dataValues.password).then(function (pwd) {
          if (pwd === true) {
            res.status(202).json({ // accepted
              status: 'success',
              data: Username
            });
          } else {
            res.status(200).json({ // no user/password is a valid request
              status: 'invalid user or password'
              //  error: 'invalid user or password',
            });
          }
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  } else if (req.body.username) {
    res.status(200).json({
      status: 'no Password'
    });
  } else if (req.body.password) {
    res.status(200).json({
      status: 'no Username'
    });
  } else {
    res.status(200).json({
      status: 'no Username and password'
    });
  }
};
exports.login = function (req, res) {
  if (req.body.username && req.body.password) {
    _models.UserDetails.findOne({ // check that user exists in database
      where: {
        username: req.body.username,
        isActive: true
      }
    }).then(function (Username) {
      if (Username === null) {
        // no user of such exists
        res.status(200).json({ // no user is a valid request
          status: 'invalid user'
          //  error: 'invalid user',
        });
      } else {
        // check if password is valid
        bcrypt.compare(req.body.password, Username.dataValues.password).then(function (pwd) {
          if (pwd === true) {
            res.status(202).json({ // accepted
              status: 'success',
              data: Username
            });
          } else {
            res.status(200).json({ // no user/password is a valid request
              status: 'invalid user or password'
              //  error: 'invalid user or password',
            });
          }
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  } else if (req.body.username) {
    res.status(200).json({
      status: 'no Password'
    });
  } else if (req.body.password) {
    res.status(200).json({
      status: 'no Username'
    });
  } else {
    res.status(200).json({
      status: 'no Username and password'
    });
  }
};
exports.loginNew = function (req, res) {
  if (req.body.username && req.body.password) {
    _models.UserDetails.findOne({ // check that user exists in database
      where: {
        isActive: true,
        $or: [{
          username: req.body.username.toLowerCase()
        }, {
          emailAddress: req.body.username.toLowerCase()
        }]
      }
    }).then(function (Username) {
      // change this value to something different
      if (Username === null) {
        // no user of such exists
        res.status(200).json({ // no user is a valid request
          status: 'invalid user'
          //  error: 'invalid user',
        });
      } else {
        // check if password is valid
        bcrypt.compare(req.body.password, Username.dataValues.password).then(function (pwd) {
          if (pwd === true) {
            res.status(202).json({ // accepted
              status: 'success',
              data: {
                Username: Username.username, // change case
                FirstName: Username.firstName,
                Lastname: Username.lastName
              }
            });
          } else {
            res.status(200).json({ // no user/password is a valid request
              status: 'invalid',
              message: 'invalid user or password'
            });
          }
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  } else if (req.body.username) {
    res.status(200).json({
      status: 'invalid',
      message: 'no Password Specified'
    });
  } else if (req.body.password) {
    res.status(200).json({
      status: 'invalid',
      message: 'no Username/email Specified'
    });
  } else {
    res.status(200).json({
      status: 'invalid',
      message: 'no Username and password'
    });
  }
};
exports.borrowBook = function (req, res) {
  var UserId = parseInt(req.params.userId, 10);
  var bookid = parseInt(req.body.bookId, 10); // change case

  var borrowdate = req.body.borrowdate;
  var duedate = req.body.duedate;

  if (isNaN(UserId) || isNaN(bookid)) {
    res.status(400).json({
      status: 'invalid',
      message: 'no UserID or bookID specified'
    });
  } else {
    _models.UserDetails.findById(UserId) // search for user
    .then(function (UsrDet) {
      if (!UsrDet) {
        res.status(200).json({
          status: 'invalid UserId',
          message: 'UserId does not exist'
        });
      } else {
        _models.Books.findOne({
          where: {
            id: bookid,
            isActive: true
          }
        }).then(function (foundBook) {
          if (foundBook) {
            // if book is found
            if (foundBook.bookQuantity < 1) {
              // if all copies of book have been borrowed
              res.status(200).json({
                status: 'invalid',
                message: 'Book unavailable'
              });
            } else {
              // add new field to booklending table (join table)
              _models.BookLendings.create({
                bookId: foundBook.id,
                userId: UsrDet.id,
                borrowDate: borrowdate,
                dueDate: duedate
              }).then(function (crtLending) {
                // if successfully added
                if (crtLending) {
                  foundBook.update({
                    bookQuantity: foundBook.bookQuantity - 1
                  }).then( // book quantity successfully updated
                  function (bookBorrowed) {
                    return res.status(202).json({
                      status: 'Success',
                      message: 'Book Successfully Borrowed',
                      Book: bookBorrowed.bookName,
                      QuantityLeft: bookBorrowed.bookQuantity
                    });
                  }).catch(function (error) {
                    return res.status(400).send(error);
                  });
                }
              }).catch(function (error) {
                return res.status(400).send(error);
              });
              // couldn't add Book Lending
            }
          } else {
            // if foundBook instance is empty
            res.status(200).json({
              status: 'Invalid',
              message: 'Book not found'
            });
          }
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};
exports.viewBorrowed = function (req, res) {
  // more descriptive name
  var UserId = parseInt(req.params.userId, 10); // case
  var isReturned = req.query.returned || null;

  // const viewBor =
  if (!isNaN(UserId)) {
    // Bring up UserDetails
    _models.UserDetails.findById(UserId).then(function (UsrDet) {
      // if User not found
      if (!UsrDet) {
        res.status(200).json({
          status: 'invalid UserId',
          message: 'UserId does not exist'
        });
      } else {
        // if User found
        // find all BookLendings with User Id
        var returnedSearch = isReturned === 'false' ? {
          userId: UsrDet.id,
          actualReturnDate: null
        } : {
          userId: UsrDet.id
        };
        _models.BookLendings.findAll({
          where: // {
          // userId: UsrDet.id,
          returnedSearch,
          // },
          include: [{
            model: _models.Books,
            attributes: ['bookName', 'bookISBN', 'bookImage', 'publishYear'],
            where: {
              isActive: true
            }
          }],
          attributes: ['id', 'borrowDate', 'dueDate', 'actualReturnDate']
        }).then(function (Lends) {
          if (Lends) {
            res.status(202).json({
              status: 'success!!!',
              data: Lends
              // retud: returnedSearch,
            });
          } else {
            res.status(200).json({
              status: 'Non found',
              message: 'User has no borrowed Books'
            });
          }
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  } else {
    res.status(400).json({
      status: 'invalid',
      message: 'UserId is invalid'
    });
  }
};
exports.returnBook = function (req, res) {
  var UserId = parseInt(req.params.userId, 10);
  var bookid = parseInt(req.body.bookId, 10);
  var lendId = parseInt(req.body.lendId, 10);

  if (isNaN(UserId) || isNaN(lendId)) {
    res.status(200).json({
      status: 'invalid',
      message: 'no borrowed book specified'
    });
  } else {
    _models.BookLendings.findById(lendId).then(function (foundLentBook) {
      if (foundLentBook && foundLentBook.actualReturnDate === null) {
        // if lent book is found
        if (foundLentBook.bookId === bookid && foundLentBook.userId === UserId) {
          // if records match
          _models.Books.findById(bookid).then(function (borrowedBook) {
            if (borrowedBook) {
              foundLentBook // update records
              .update({
                actualReturnDate: new Date()
              }).then(function (lentUpdate) {
                borrowedBook.update({
                  bookQuantity: borrowedBook.bookQuantity + 1
                }).then(function (bookReturn) {
                  res.status(200).json({
                    status: 'Success',
                    message: {
                      BookName: borrowedBook.bookName,
                      BookQuantity: bookReturn.bookQuantity,
                      BorrowedDate: lentUpdate.borrowDate,
                      DueDate: lentUpdate.dueDate,
                      returnDate: lentUpdate.actualReturnDate,
                      outStanding: lentUpdate.actualReturnDate - lentUpdate.dueDate < 0 ? 0 : lentUpdate.actualReturnDate - lentUpdate.dueDate
                    }
                  });
                }).catch(function (error) {
                  return res.status(400).send(error);
                });
              }).catch(function (error) {
                return res.status(400).send(error);
              });
            } else {
              res.status(200).json({
                status: 'invalid',
                message: 'Book not found'
              });
            }
          }).catch(function (error) {
            return res.status(400).send(error);
          });
        } else {
          res.status(200).json({
            status: 'invalid',
            message: 'User/Book not matching records'
          });
        }
      } else if (foundLentBook.actualReturnDate !== null) {
        res.status(200).json({
          status: 'invalid',
          message: 'Book already returned'
        });
      } else {
        res.status(200).json({
          status: 'invalid UserId',
          message: 'No records found'
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};