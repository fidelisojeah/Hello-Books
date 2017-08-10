'use strict';

var _models = require('../models');

// const jwt = require('jsonwebtoken');
/**
 * Creates new Author and stores in table using Sequelize
 */

exports.deleteAllBooks = function (req, res) {
  // at end of tests
  if (process.env.NODE_ENV === 'test') {
    // if in test environment
    _models.Books.truncate({
      cascade: true,
      restartIdentity: true
    }).then(function () {
      return _models.Authors.truncate({
        cascade: true,
        restartIdentity: true
      }).then(function () {
        return res.status(204).send({});
      });
    });
  } else {
    res.status(200).json({
      message: 'You can\'t just do that though'
    });
  }
}; /*
   const {
     Authors,
     Books,
   } = require('../models');
   */

exports.newAuthor = function (req, res) {
  var authorfirstname = req.body.authorFName || null;
  var authorlastname = req.body.authorLName || null;
  var DOB = req.body.authorDOB || null;
  if (authorfirstname !== null && authorlastname !== null) {
    // if parameters have been sent--
    _models.Authors.create({
      authorFirstName: authorfirstname,
      authorLastName: authorlastname,
      dateofBirth: DOB
    }).then(function (authorCreate) {
      // if author creation was successful
      res.status(201).json({
        status: 'success',
        data: {
          AuthorName: authorCreate.authorFirstName + ' ' + authorCreate.authorLastName
        }
      });
    }).catch( // if unsuccessful
    function (error) {
      return res.status(400).send(error);
    });
  } else {
    // if complete details are not set
    res.status(200).json({
      status: 'unsuccessful',
      message: 'incomplete details'
    });
  }
};
exports.allBooks = function (req, res) {
  _models.Books.findAll({}).then(function (allBooks) {
    if (allBooks === null || allBooks.length === 0) {
      // if no book is found
      res.status(200).json({
        status: 'unsuccessful',
        message: 'No Books Fam'
      });
    } else {
      res.status(202).json({
        status: 'Book Details Below',
        data: allBooks
      });
    }
  }).catch(function (error) {
    return res.status(400).send(error);
  }); // catch error from findall
};
exports.bookQuant = function (req, res) {
  // modifybook quantity
  var bkID = parseInt(req.body.bookId, 10);
  var bklvl = parseInt(req.body.Quantlvl, 10);
  if (!isNaN(bkID) || !isNaN(bklvl)) {
    // has to be a number really
    _models.Books.findOne({ // search for book with id
      where: {
        id: bkID
      }
    }).then(function (BookDet) {
      if (BookDet === null) {
        // if a book is not found
        res.status(200).json({
          status: 'unsuccessful',
          message: 'This book don\'t exist fam'
        });
      } else {
        // if addQuant is set then add
        BookDet.update({
          bookQuantity: BookDet.bookQuantity + bklvl < 1 ? 1 : BookDet.bookQuantity + bklvl
          // Never less than 1
        }).then(function (addBk) {
          return res.status(200).json({
            status: addBk
          });
        }).catch(function (error) {
          return res.status(400).send(error);
        });
      }
    });
  } else {
    res.status(400).json({
      status: 'none',
      message: 'That\'s not even a number fam!!!'
    });
  }
};

exports.modBook = function (req, res) {
  var bkID = parseInt(req.params.bookId, 10);

  if (!isNaN(bkID)) {
    // has to be a number really
    // for just admins
    req.body.bookISBN = undefined;
    // everyone
    if (req.body.bookName || req.body.publishYear || req.body.bookISBN || req.body.description || req.body.bookImage) {
      // if a non-empty request has been made
      _models.Books.findOne({ // search for book with id
        where: {
          id: bkID
        }
      }).then(function (BookDet) {
        if (BookDet === null) {
          // if a book is not found
          res.status(200).json({
            status: 'unsuccessful',
            message: 'Book Id invalid'
          });
        } else {
          BookDet.update(req.body).then(function (BkUpdate) {
            return res.status(200).json({
              status: 'success',
              message: 'Book Details Updated',
              data: BkUpdate
            });
          }).catch(function (error) {
            return res.status(400).send(error);
          });
        }
      }).catch(function (error) {
        return res.status(400).send(error);
      }); // catch error from findone
    } else {
      res.status(200).json({
        status: 'invalid',
        message: 'no information supplied',
        data: req.body
      });
    }
  } else {
    res.status(400).json({
      status: 'none',
      message: 'invalid number'
    });
  }
};
exports.newBook = function (req, res) {
  // create a new book v1 (with one author)
  var bookQuant = req.body.bookQuantity || 1;
  var bookImg = req.body.bookImage || null;
  var pubYear = req.body.pubYear || null;
  var bookname = req.body.bookName || null;
  var ISBN = req.body.bookISBN || null;
  var desc = req.body.desc || null;
  var authorId = req.body.authorId || 1; // author or anonymous
  if (bookname !== null && ISBN !== null && desc !== null && authorId !== null) {
    _models.Books.create({ // create book
      bookName: bookname,
      bookISBN: ISBN,
      description: desc,
      bookQuantity: bookQuant,
      bookImage: bookImg,
      publishYear: pubYear
    }).then(function (bookID) {
      // change name
      if (bookID === null) {
        res.status(400).json({
          status: 'Unable to create'
        });
      } else {
        _models.Authors.findOne({ // find author (just one here)
          where: {
            id: parseInt(authorId, 10)
          }
        }).then(function (AID) {
          if (AID === null) {
            // if author not found
            res.status(200).json({
              status: 'no Author found',
              data: bookID
            });
          } else {
            // if author found, addd author role
            bookID.addAuthor(AID).then(function () {
              res.status(201).json({
                status: 'success',
                data: bookID
              });
            });
          }
        });
      }
    }).catch(function (error) {
      return res.status(400).send(error);
    }); // if fails, return error
  } else {
    res.status(200).json({
      status: 'unsuccessful',
      message: 'incomplete Book Details!!'
    });
  }
};