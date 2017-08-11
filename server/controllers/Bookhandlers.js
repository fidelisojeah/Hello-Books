/*
const {
  Authors,
  Books,
} = require('../models');
*/

import {
  Authors,
  Books,
} from '../models';

// const jwt = require('jsonwebtoken');
/**
 * Creates new Author and stores in table using Sequelize
 */

exports.deleteAllBooks = (req, res) => { // at end of tests
  if (process.env.NODE_ENV === 'test') { // if in test environment
    Books.truncate({
      cascade: true,
      restartIdentity: true,
    }).then(() =>
      Authors.truncate({
        cascade: true,
        restartIdentity: true,
      }).then(() =>
        res.status(204).send({})));
  } else {
    res.status(200).json({
      message: 'You can\'t just do that though',
    });
  }
};

exports.newAuthor = (req, res) => {
  const authorfirstname = req.body.authorFName || null;
  const authorlastname = req.body.authorLName || null;
  const DOB = req.body.authorDOB || null;
  if (authorfirstname !== null && authorlastname !== null) {
    // if parameters have been sent--
    Authors.create({
      authorFirstName: authorfirstname,
      authorLastName: authorlastname,
      dateofBirth: DOB,
    }).then(
      (authorCreate) => { // if author creation was successful
        res.status(201).json({
          status: 'success',
          data: {
            AuthorName: `${authorCreate.authorFirstName} ${authorCreate.authorLastName}`,
          },
        });
      }).catch( // if unsuccessful
      error => res.status(400).send(error));
  } else { // if complete details are not set
    res.status(200).json({
      status: 'unsuccessful',
      message: 'incomplete details',
    });
  }
};
exports.allBooks = (req, res) => {
  Books.findAll({}).then((allBooks) => {
    if (allBooks === null || allBooks.length === 0) { // if no book is found
      res.status(200).json({
        status: 'unsuccessful',
        message: 'No Books Fam',
      });
    } else {
      res.status(202).json({
        status: 'Book Details Below',
        data: allBooks,
      });
    }
  }).catch(error => res.status(400).send(error)); // catch error from findall
};
exports.bookQuant = (req, res) => { // modifybook quantity
  const bkID = parseInt(req.body.bookId, 10);
  const bklvl = parseInt(req.body.Quantlvl, 10);
  if (!isNaN(bkID) || !isNaN(bklvl)) { // has to be a number really
    Books.findOne({ // search for book with id
      where: {
        id: bkID,
      },
    }).then((BookDet) => {
      if (BookDet === null) { // if a book is not found
        res.status(200).json({
          status: 'unsuccessful',
          message: 'This book don\'t exist fam',
        });
      } else { // if addQuant is set then add
        BookDet.update({
          bookQuantity: (BookDet.bookQuantity + bklvl) < 1 ? 1 : (BookDet.bookQuantity + bklvl),
          // Never less than 1
        }).then(
          addBk => res.status(200).json({
            status: addBk,
          })).catch(error => res.status(400).send(error));
      }
    });
  } else {
    res.status(400).json({
      status: 'none',
      message: 'That\'s not even a number fam!!!',
    });
  }
};

exports.modBook = (req, res) => {
  const bkID = parseInt(req.params.bookId, 10);

  if (!isNaN(bkID)) { // has to be a number really
    // for just admins
    req.body.bookISBN = undefined;
    // everyone
    if (req.body.bookName ||
      req.body.publishYear ||
      req.body.bookISBN ||
      req.body.description ||
      req.body.bookImage) {
      // if a non-empty request has been made
      Books.findOne({ // search for book with id
        where: {
          id: bkID,
        },
      }).then((BookDet) => {
        if (BookDet === null) { // if a book is not found
          res.status(200).json({
            status: 'unsuccessful',
            message: 'Book Id invalid',
          });
        } else {
          BookDet.update(req.body).then(BkUpdate => res.status(200).json({
            status: 'success',
            message: 'Book Details Updated',
            data: BkUpdate,
          })).catch(error => res.status(400).send(error));
        }
      }).catch(error => res.status(400).send(error)); // catch error from findone
    } else {
      res.status(200).json({
        status: 'invalid',
        message: 'no information supplied',
        data: req.body,
      });
    }
  } else {
    res.status(400).json({
      status: 'none',
      message: 'invalid number',
    });
  }
};
exports.newBook = (req, res) => { // create a new book v1 (with one author)
  const bookQuant = req.body.bookQuantity || 1;
  const bookImg = req.body.bookImage || null;
  const pubYear = req.body.pubYear || null;
  const bookname = req.body.bookName || null;
  const ISBN = req.body.bookISBN || null;
  const desc = req.body.desc || null;
  const authorId = req.body.authorId || 1; // author or anonymous
  if (bookname !== null && ISBN !== null && desc !== null && authorId !== null) {
    Books.create({ // create book
      bookName: bookname,
      bookISBN: ISBN,
      description: desc,
      bookQuantity: bookQuant,
      bookImage: bookImg,
      publishYear: pubYear,
    }).then((bookID) => { // change name
      if (bookID === null) {
        res.status(400).json({
          status: 'Unable to create',
        });
      } else {
        Authors.findOne({ // find author (just one here)
          where: {
            id: parseInt(authorId, 10),
          },
        }).then((AID) => {
          if (AID === null) { // if author not found
            res.status(200).json({
              status: 'no Author found',
              data: bookID,
            });
          } else { // if author found, addd author role
            bookID.addAuthor(AID).then(() => {
              res.status(201).json({
                status: 'success',
                data: bookID,
              });
            });
          }
        });
      }
    }).catch(error => res.status(400).send(error)); // if fails, return error
  } else {
    res.status(200).json({
      status: 'unsuccessful',
      message: 'incomplete Book Details!!',
    });
  }
};
