import sequelize from 'sequelize';
import {
  Authors,
  Books,
  BookRatings,
  BookLendings
} from '../models';

import CheckSession from '../middleware/CheckSession';
import BookVerification from '../helpers/BookVerification';

class BookProps {
  /**
   * @description method perfofms active search on database
   *
   * @param {object} request HTTP Request object
   *
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
          attributes: ['id', 'authorFirstName',
            'authorLastName',
            'authorAKA', 'dateofBirth'],
        })
        .then((foundAuthors) => {
          if (!foundAuthors ||
            foundAuthors === null
            || foundAuthors.length === 0) {
            response.status(200).json({
              status: 'None',
              message: 'No Authors',
            });
          } else {
            response.status(202).json({
              status: 'Success',
              bookAuthors: foundAuthors,
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
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP Response object
   */
  static newAuthor(request, response) {
    CheckSession
      .checkAdmin(request.decoded)
      .then(() => {
        // console.log('here');
        const firstName = request.body.firstname || null;
        const lastName = request.body.lastname || null;
        const dateOB = request.body.authorDOB || null;
        const knownAs = request.body.authorAKA || `${firstName} ${lastName}`;
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
              response.status(201).json({
                status: 'Success',
                message: 'Author Created Successfully',
              });
            })
            .catch(errorMessage =>
              response.status(500).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
        } else { // incomplete details
          response.status(400).json({
            status: 'Unsuccessful',
            message: 'Incomplete details',
          });
        }
      })
      .catch((error) => {
        response.status(401).json({
          status: 'Unsuccessful',
          message: error,
        });
      });
  }
  /**
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP Response object
   *
   */
  static viewBooksHomePage(request, response) {
    const attributes = ['id', 'bookName', 'bookISBN',
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
      [sequelize
        .fn('AVG', sequelize.col('BookRatings.rating')),
        'RatingAvg'
      ]
    ];
    const group = ['Books.id',
      'Authors.id',
      'Authors->BookAuthors.authorId',
      'Authors->BookAuthors.bookId',
    ];
    Promise.all([
      Books
        .findAll({
          where: {
            isActive: true,
          },
          limit: 20,
          subQuery: false,
          include: [
            {
              model: Authors,
              attributes: ['id', 'authorAKA'],
              through: { attributes: [] }
            },
            {
              model: BookRatings,
              attributes: [],
            }],
          group,
          attributes,
          order: [[sequelize
            .fn('AVG', sequelize.col('BookRatings.rating')), 'DESC NULLS LAST'
          ]]
        }),
      Books
        .findAll({
          where: {
            isActive: true,
          },
          limit: 20,
          subQuery: false,
          include: [
            {
              model: Authors,
              attributes: ['id', 'authorAKA'],
              through: { attributes: [] }
            },
            {
              model: BookRatings,
              attributes: []
            },
            {
              model: BookLendings,
              attributes: []
            }
          ],
          group,
          attributes: [
            ...attributes,
            [sequelize
              .fn('count', sequelize.col('BookLendings.id')),
              'LendingCount'
            ]],
          order: [[sequelize
            .fn('count', sequelize.col('BookLendings.id')), 'DESC NULLS LAST'
          ]]
        })
    ])
      .then(([ratedBooks, byLendingBooks]) => {
        response.status(202).json({
          status: 'Success',
          message: 'List retrieved Successfully',
          ratedBooks,
          byLendingBooks
        });
      })
      .catch(error =>
        response.status(500).json({
          status: 'Unsuccessful',
          error
        }));
  }
  /**
   * @description method view books in library
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP Response object
   */
  static viewBooks(request, response) {
    const bookID = parseInt(request.query.id, 10);

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
              through: { attributes: [] }
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
          attributes: ['id', 'bookName', 'bookISBN',
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
            [sequelize
              .fn('AVG', sequelize.col('BookRatings.rating')),
              'Ratingavg'
            ]
          ],
        })
        .then((allBooks) => {
          if (!allBooks ||
            allBooks === null ||
            allBooks.length === 0) { // if no book is found
            response.status(200).json({
              status: 'Unsuccessful',
              message: 'No Books',
            });
          } else {
            response.status(202).json({
              status: 'Success',
              allBooks,
            });
          }
        })
        .catch(errorMessage =>
          response.status(500).json({
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
            'publishYear', 'bookQuantity',
            [sequelize
              .fn('count', sequelize.col('BookRatings.id')),
              'ratingCount'
            ],
            [sequelize
              .fn('sum', sequelize.col('BookRatings.rating')),
              'ratingSum'
            ],
          ],
          include: [{
            model: Authors,
            attributes: ['id', 'authorFirstName',
              'authorLastName',
              'authorAKA', 'dateofBirth'],
            through: { attributes: [] },
          },
          {
            model: BookRatings,
            attributes: [],
          }],
        })
        .then((bookInfo) => {
          response.status(202).json({
            status: 'Success',
            bookInfo,
          });
        })
        .catch(errorMessage =>
          response.status(500).json({
            status: 'Unsuccessful',
            error: errorMessage,
          }));
    }
  }
  /**
   * @description create a new book for the library
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP Response object
   */
  static newBook(request, response) {
    CheckSession
      .checkAdmin(request.decoded)
      .then(() => {
        const bookQuantity = request.body.quantity || 1;
        const bookImage = request.body.image || null;
        const publishYear = request.body.publishyear || null;
        const bookName = request.body.bookname || null;
        const ISBN = request.body.ISBN || null;
        const description = request.body.description || null;
        const authors = request.body.authorIds || null; // author or anonymous

        // true if every element is int
        BookVerification
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
                          response.status(201).json({
                            status: 'Success',
                            message: 'Book Created Successfully',
                            bookID: createdBook.dataValues.id,
                          }));
                    })
                    .catch((error) => {
                      if (error.name === 'SequelizeUniqueConstraintError') {
                        response.status(400).json({
                          status: 'Unsuccessful',
                          message: 'Book Already Exists',
                        });
                      } else {
                        response.status(500).json({
                          status: 'Unsuccessful',
                          error,
                        });
                      }
                    });
                } else {
                  response.status(400).json({
                    status: 'Unsuccessful',
                    message: 'No Author found',
                  });
                }
              })
              .catch(errorMessage =>
                response.status(500).json({
                  status: 'Unsuccessful',
                  error: errorMessage,
                }));
          })
          .catch(error =>// display error
            response.status(400).json({
              status: 'Unsuccessful',
              message: error,
            }));
      })
      .catch((error) => {
        response.status(401).json({
          status: 'Unsuccessful',
          message: error,
        });
      });
  }
  /**
   * @description retrieves authors from library
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP Response object
   */
  static getAuthors(request, response) {
    const authorID = parseInt(request.query.id, 10);

    if (isNaN(authorID)) { // for all books
      Authors
        .findAll({
          attributes: ['id', 'authorFirstName',
            'authorLastName',
            'authorAKA', 'dateofBirth'],
        })
        .then((allAuthors) => {
          if (allAuthors === null ||
            allAuthors.length === 0) { // if no author is found
            response.status(200).json({
              status: 'Unsuccessful',
              message: 'No Authors',
            });
          } else {
            response.status(202).json({
              status: 'Success',
              allAuthors,
            });
          }
        })
        .catch(errorMessage =>
          response.status(500).json({
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
          response.status(202).json({
            status: 'Success',
            authorInfo,
          });
        })
        .catch(errorMessage =>
          response.status(500).json({
            status: 'Unsuccessful',
            error: errorMessage,
          }));
    }
  }
  /**
   * @description updates quantity of book in library
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP Response object
   */
  static updateBookQuantity(request, response) {
    CheckSession
      .checkAdmin(request.decoded)
      .then(() => {
        const bookId = parseInt(request.params.bookId, 10);
        const bookQuantity = parseInt(request.body.quantity, 10);
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
                response.status(404).json({
                  status: 'Unsuccessful',
                  message: 'Invalid Book',
                });
              } else { // if bookDetails is set then add
                bookDetails
                  .update({
                    bookQuantity:
                      (bookDetails.bookQuantity + bookQuantity) <= 0 ? 0 :
                        (bookDetails.bookQuantity + bookQuantity),
                    // Never less than 1
                  })
                  .then(
                  bookUpdate => response.status(200).json({
                    status: 'Success',
                    message: 'Book Updated Successfully',
                    bookUpdate,
                  }))
                  .catch(errorMessage =>
                    response.status(500).json({
                      status: 'Unsuccessful',
                      error: errorMessage,
                    }));
              }
            })
            .catch(errorMessage =>
              response.status(501).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
        } else if (isNaN(bookId) && !isNaN(bookQuantity)) {
          response.status(404).json({
            status: 'Unsuccessful',
            message: 'Invalid Book',
          });
        } else {
          response.status(400).json({
            status: 'Unsuccessful',
            message: 'Missing Information',
          });
        }
      })
      .catch((error) => {
        response.status(401).json({
          status: 'Unsuccessful',
          message: error,
        });
      });
  }
  /**
   * @description modifies book information in library
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP Response object
   */
  static modifyBook(request, response) {
    CheckSession
      .checkAdmin(request.decoded)
      .then(() => {
        const bookID = parseInt(request.params.bookId, 10);

        if (!isNaN(bookID)) { // has to be a number really
          // everyone
          if (request.body.bookName ||
            request.body.publishYear ||
            request.body.bookISBN ||
            request.body.description ||
            request.body.bookImage) {
            request.body.id = undefined;
            request.body.bookQuantity = undefined;
            // if a non-empty request has been made
            Books.findOne({ // search for book with id
              where: {
                id: bookID,
                isActive: true,
              },
            }).then((bookDetails) => {
              if (bookDetails === null) { // if a book is not found
                response.status(404).json({
                  status: 'Unsuccessful',
                  message: 'Invalid Book',
                });
              } else {
                bookDetails
                  .update(request.body)
                  .then(bookUpdate => response.status(200).json({
                    status: 'Success',
                    message: 'Book Details Updated',
                    bookUpdate,
                  }))
                  .catch((errorMessage) => {
                    if (errorMessage.errors[0].path === 'bookISBN') {
                      return response.status(400).json({
                        status: 'Unsuccessful',
                        error: errorMessage.errors[0].message
                      });
                    }
                    return response.status(501).json({
                      status: 'Unsuccessful',
                      error: errorMessage,
                    });
                  });
              }
            }).catch(errorMessage =>
              response.status(500).json({
                status: 'Unsuccessful',
                error: errorMessage,
              })); // catch error from findone
          } else {
            response.status(400).json({
              status: 'Unsuccessful',
              message: 'No Information Supplied',
            });
          }
        } else {
          response.status(404).json({
            status: 'Unsuccessful',
            message: 'Invalid Book',
          });
        }
      })
      .catch((error) => {
        response.status(401).json({
          status: 'Unsuccessful',
          message: error,
        });
      });
  }
  /**
   * @description views all/one book(s) in the library
   *
   * @param {object} request HTTP Request object
   *
   * @param {object} response HTTP Response object
  */
  static viewAllBooks(request, response) {
    const limit = request.query.limit || null;
    const page = request.params.page;

    const orderBy = request.query.sort || null;
    const orBy = [];
    if (orderBy && orderBy.toLowerCase() === 'alphabetical') {
      orBy.push(
        'bookName'
      );
    } else if (orderBy && orderBy.toLowerCase() === 'rating') {
      orBy.push(
        [sequelize
          .fn('AVG', sequelize.col('BookRatings.rating')), 'DESC NULLS LAST'
        ]
      );
    }
    orBy.push([
      'id', 'DESC'
    ]);

    BookVerification
      .verifyViewBookVariables(
      limit, page)
      .then((viewDetails) => {
        Books
          .count({
            where: {
              isActive: true
            }
          })
          .then((totalBooksCount) => {
            const totalPages = Math.ceil(totalBooksCount / limit);
            Books
              .findAll({
                where: {
                  isActive: true
                },
                subQuery: false,
                offset: viewDetails.offset,
                limit: viewDetails.limit,
                include: [
                  {
                    model: Authors,
                    attributes: ['id', 'authorAKA'],
                    through: { attributes: [] }
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
                attributes: ['id', 'bookName', 'bookISBN',
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
                  [sequelize
                    .fn('AVG', sequelize.col('BookRatings.rating')),
                    'ratingAvg'
                  ]
                ],
                order: orBy
              })
              .then((bookLists) => {
                response.status(200).json({
                  status: 'Success',
                  bookLists,
                  totalBooksCount,
                  totalPages
                });
              })
              .catch((error) => {
                response.status(500).json({
                  status: 'Unsuccessful',
                  message: 'Something went wrong',
                  error
                });
              });
          })
          .catch((error) => {
            response.status(500).json({
              status: 'Unsuccessful',
              message: 'Something went wrong',
              error
            });
          });
      })
      .catch((error) => {
        response.status(400).json({
          status: 'Unsuccessful',
          message: error
        });
      });
  }
}

export default BookProps;
