import sequelize from 'sequelize';
import {
  Authors,
  Books,
  BookRatings,
} from '../models';

import CheckSession from '../middleware/session';
import BookVerify from '../helpers/new-book';

class BookProps {
  /**
   * @description method perfofms active search on database
   * @param {object} request HTTP Request object
   * @param {object} response HTTP response Object
   */
  static searchAuthors(request, response) {
    const authorDetails = request.query.q || null;
    if (authorDetails !== null && authorDetails.length >= 1) {
      Authors
        .findAll({
          where: {
            $or: [{
              authorFirstName:
              { $iLike: `%${authorDetails}%` }
            }, {
              authorLastName:
              { $iLike: `%${authorDetails}%` }
            }, {
              authorAKA:
              { $iLike: `%${authorDetails}%` }
            }]
          },
          attributes:
          ['id', 'authorFirstName',
            'authorLastName',
            'authorAKA', 'dateofBirth'],
        })
        .then((foundAuthors) => {
          if (foundAuthors === null || foundAuthors.length === 0) {
            response.status(200).json({
              status: 'None',
              message: 'No Authors',
            });
          } else {
            response.status(202).json({
              status: 'Success',
              data: foundAuthors,
            });
          }
        })
        .catch(errorMessage =>
          response.status(500).json({
            status: 'Unsuccessful',
            error: errorMessage,
          }));
    } else {
      response.status(200).json({
        status: 'None',
        message: 'Type Author details'
      });
    }
  }
  /**
   * @description method creates a new author in database
   * @param {object} req HTTP Request object
   * @param {object} res HTTP Response object
   */
  static newAuthor(req, res) {
    CheckSession
      .checkAdmin(req.decoded)
      .then(() => {
        // console.log('here');
        const firstName = req.body.firstname || null;
        const lastName = req.body.lastname || null;
        const dateOB = req.body.authorDOB || null;
        const knownAs = req.body.authorAKA || `${firstName} ${lastName}`;
        if (firstName !== null
          && lastName !== null) {
          Authors// create new author
            .create({
              authorFirstName: firstName,
              authorLastName: lastName,
              dateofBirth: dateOB,
              authorAKA: knownAs,
            })
            .then(() => { // if author creation was successful
              res.status(201).json({
                status: 'Success',
                message: 'Author Created Successfully',
              });
            })
            .catch(errorMessage =>
              res.status(500).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
        } else { // incomplete details
          res.status(400).json({
            status: 'Unsuccessful',
            message: 'Incomplete details',
          });
        }
      })
      .catch((error) => {
        res.status(401).json({
          status: 'Unsuccessful',
          message: error,
        });
      });
  }
  /**
   *
   * @param {*} req HTTP Request object
   * @param {*} res HTTP Response object
   */
  static viewBooks(req, res) {
    const bookID = parseInt(req.query.id, 10);
    if (isNaN(bookID)) { // for all books
      Books
        .findAll({
          where: {
            isActive: true,
          },
          include: [
            {
              model: Authors,
              attributes: ['id', 'authorAKA'],
            },
            {
              model: BookRatings,
              attributes: [],
            }],
          group: ['Books.id',
            'Authors.id',
            'Authors->BookAuthors.authorId',
            'Authors->BookAuthors.bookId',
          ],
          attributes:
          ['id', 'bookName', 'bookISBN',
            'description', 'bookImage',
            'publishYear',
            [sequelize
              .fn('count', sequelize.col('BookRatings.id')),
              'RatingCount'
            ],
            [sequelize
              .fn('sum', sequelize.col('BookRatings.rating')),
              'RatingSum'
            ],
          ],
        })
        .then((allBooks) => {
          if (allBooks === null ||
            allBooks.length === 0) { // if no book is found
            res.status(200).json({
              status: 'Unsuccessful',
              message: 'No Books',
            });
          } else {
            res.status(202).json({
              status: 'Success',
              data: allBooks,
            });
          }
        })
        .catch(errorMessage =>
          res.status(500).json({
            status: 'Unsuccessful',
            error: errorMessage,
          })); // catch error from findall
    } else {
      Books
        .findOne({
          where: {
            isActive: true,
            id: bookID,
          },
          group: ['Books.id',
            'Authors.id',
            'Authors->BookAuthors.authorId',
            'Authors->BookAuthors.bookId',
          ],
          attributes: [
            'id', 'bookName', 'bookISBN',
            'description', 'bookImage',
            'publishYear',
            [sequelize
              .fn('count', sequelize.col('BookRatings.id')),
              'RatingCount'
            ],
            [sequelize
              .fn('sum', sequelize.col('BookRatings.rating')),
              'RatingSum'
            ],
          ],
          include: [{
            model: Authors,
            attributes: ['authorFirstName',
              'authorLastName',
              'authorAKA', 'dateofBirth'],
          },
          {
            model: BookRatings,
            attributes: [],
          }],
        })
        .then((bookInfo) => {
          res.status(202).json({
            status: 'Success',
            data: bookInfo,
          });
        })
        .catch(errorMessage =>
          res.status(500).json({
            status: 'Unsuccessful',
            error: errorMessage,
          }));
    }
  }
  static newBook(req, res) {
    CheckSession
      .checkAdmin(req.decoded)
      .then(() => {
        const bookQuantity = req.body.quantity || 1;
        const bookImage = req.body.image || null;
        const publishYear = req.body.publishyear || null;
        const bookName = req.body.bookname || null;
        const ISBN = req.body.ISBN || null;
        const description = req.body.description || null;
        const authors = req.body.authorIds || null; // author or anonymous

        // true if every element is int
        BookVerify
          .checkNewBookVariables(bookName,
          ISBN,
          publishYear,
          description,
          bookImage,
          bookQuantity,
          authors
          )
          .then((completeBookDetails) => {
            // if book details are verified complete
            if (completeBookDetails) {
              Authors
                .findAll({
                  where: {
                    id: completeBookDetails.authors,
                  },
                })
                .then((bookAuthors) => {
                  if (bookAuthors &&
                    bookAuthors !== null &&
                    bookAuthors.length >= 1
                  ) {
                    Books
                      .create(completeBookDetails)
                      .then((createdBook) => {
                        createdBook
                          .addAuthor(bookAuthors)
                          .then(() =>
                            res.status(201).json({
                              status: 'Success',
                              message: 'Book Created Successfully',
                              bookID: createdBook.dataValues.id,
                            }))
                          .catch(errorMessage =>
                            res.status(500).json({
                              status: 'Unsuccessful',
                              error: errorMessage,
                            }));
                      })
                      .catch((error) => {
                        if (error.name === 'SequelizeUniqueConstraintError') {
                          res.status(400).json({
                            status: 'Unsuccessful',
                            message: 'Book Already Exists',
                          });
                        } else {
                          res.status(500).json({
                            status: 'Unsuccessful',
                            error,
                          });
                        }
                      });
                  } else {
                    res.status(400).json({
                      status: 'Unsuccessful',
                      message: 'No Author found',
                    });
                  }
                })
                .catch(errorMessage =>
                  res.status(500).json({
                    status: 'Unsuccessful',
                    error: errorMessage,
                  }));
            } else {
              res.status(501).json({
                status: 'Unsuccessful',
                message: 'Server error try again',
              });
            }
          })
          .catch(error =>// display error
            res.status(400).json({
              status: 'Unsuccessful',
              message: error,
            }));
      })
      .catch((error) => {
        res.status(401).json({
          status: 'Unsuccessful',
          message: error,
        });
      });
  }
  static getAuthors(req, res) {
    const authorID = parseInt(req.query.id, 10);

    if (isNaN(authorID)) { // for all books
      Authors
        .findAll({
          attributes:
          ['id', 'authorFirstName',
            'authorLastName',
            'authorAKA', 'dateofBirth'],
        })
        .then((allAuthors) => {
          if (allAuthors === null ||
            allAuthors.length === 0) { // if no book is found
            res.status(200).json({
              status: 'Unsuccessful',
              message: 'No Authors',
            });
          } else {
            res.status(202).json({
              status: 'Success',
              data: allAuthors,
            });
          }
        })
        .catch(errorMessage =>
          res.status(500).json({
            status: 'Unsuccessful',
            error: errorMessage,
          })); // catch error from findall
    } else {
      Authors
        .findOne({
          where: {
            id: authorID,
          },
          include: [{
            model: Books,
            where: {
              isActive: true,
            },
            attributes: ['bookName', 'publishYear', 'id'],
          }],
          attributes: ['id', 'authorFirstName',
            'authorLastName',
            'authorAKA', 'dateofBirth'],
        })
        .then((authorInfo) => {
          res.status(202).json({
            status: 'Success',
            data: authorInfo,
          });
        })
        .catch(errorMessage =>
          res.status(500).json({
            status: 'Unsuccessful',
            error: errorMessage,
          }));
    }
  }
  static updateBookQuantity(req, res) {
    CheckSession
      .checkAdmin(req.decoded)
      .then(() => {
        const bookId = parseInt(req.params.bookId, 10);
        const bookQuantity = parseInt(req.body.quantity, 10);
        if (!isNaN(bookId) &&
          !isNaN(bookQuantity)) { // has to be a number really
          Books
            .findOne({ // search for book with id
              where: {
                id: bookId,
              },
            })
            .then((bookDetails) => {
              if (bookDetails === null) { // if a book is not found
                res.status(404).json({
                  status: 'Unsuccessful',
                  message: 'Invalid Book',
                });
              } else { // if bookDetails is set then add
                bookDetails
                  .update({
                    bookQuantity:
                    (bookDetails.bookQuantity + bookQuantity) < 1 ? 1 :
                      (bookDetails.bookQuantity + bookQuantity),
                    // Never less than 1
                  })
                  .then(
                  addBook => res.status(200).json({
                    status: 'Success',
                    message: 'Book Updated Successfully',
                    data: addBook,
                  }))
                  .catch(errorMessage =>
                    res.status(500).json({
                      status: 'Unsuccessful',
                      error: errorMessage,
                    }));
              }
            })
            .catch(errorMessage =>
              res.status(501).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
        } else if (isNaN(bookId) && !isNaN(bookQuantity)) {
          res.status(404).json({
            status: 'Unsuccessful',
            message: 'Invalid Book',
          });
        } else {
          res.status(400).json({
            status: 'Unsuccessful',
            message: 'Missing Information',
          });
        }
      })
      .catch((error) => {
        res.status(401).json({
          status: 'Unsuccessful',
          message: error,
        });
      });
  }
  static modifyBook(req, res) {
    CheckSession
      .checkAdmin(req.decoded)
      .then(() => {
        const bookID = parseInt(req.params.bookId, 10);

        if (!isNaN(bookID)) { // has to be a number really
          // everyone
          if (req.body.bookname ||
            req.body.publishYear ||
            req.body.ISBN ||
            req.body.description ||
            req.body.image) {
            req.body.id = undefined;
            // if a non-empty request has been made
            Books.findOne({ // search for book with id
              where: {
                id: bookID,
                isActive: true,
              },
            }).then((bookDetails) => {
              if (bookDetails === null) { // if a book is not found
                res.status(404).json({
                  status: 'Unsuccessful',
                  message: 'Invalid Book',
                });
              } else {
                bookDetails
                  .update(req.body)
                  .then(bookUpdate => res.status(200).json({
                    status: 'Success',
                    message: 'Book Details Updated',
                    data: bookUpdate,
                  }))
                  .catch(errorMessage =>
                    res.status(501).json({
                      status: 'Unsuccessful',
                      error: errorMessage,
                    }));
              }
            }).catch(errorMessage =>
              res.status(500).json({
                status: 'Unsuccessful',
                error: errorMessage,
              })); // catch error from findone
          } else {
            res.status(400).json({
              status: 'Unsuccessful',
              message: 'No Information Supplied',
            });
          }
        } else {
          res.status(404).json({
            status: 'Unsuccessful',
            message: 'Invalid Book',
          });
        }
      })
      .catch((error) => {
        res.status(401).json({
          status: 'Unsuccessful',
          message: error,
        });
      });
  }
}

export default BookProps;
