import {
  UserDetails,
  Books,
  BookLendings,
} from '../models';
import jwTokens from '../middleware/helpers';
import checkSession from '../middleware/session';

class userBookInteraction {
  static validateEntry(
    userId, bookId, lendId,
  ) {
    return new Promise((resolve, reject) => {
      if (isNaN(userId)) {
        reject('Invalid User id');
      } else if (isNaN(bookId)) {
        reject('Invalid Book id');
      } else if (isNaN(lendId)) {
        reject('Invalid');
      } else {
        resolve('Valid');
      }
    });
  }
  static viewBorrowedBook(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const isReturned = req.query.returned || null;

    userBookInteraction.validateEntry(userId, 100, 100)
      .then((validated) => {
        if (validated === 'Valid') {
          if (userId !== req.decoded.userId) { // false user?
            res.status(401).json({
              status: 'Unsuccessful',
              message: 'Not Allowed',
            });
          } else {
            UserDetails
              .findOne({
                where: {
                  id: userId,
                  isActive: true,
                },
              })
              .then((userLoginDetails) => {
                if (!userLoginDetails) {
                  res.status(401).json({
                    status: 'Unsuccessful',
                    message: 'Not Allowed',
                  });
                } else { // if User found
                  // find all BookLendings with User Id
                  const returnedSearch = (isReturned === 'false') ? {
                    userId: userLoginDetails.id,
                    actualReturnDate: null,
                  } : { userId: userLoginDetails.id };
                  BookLendings
                    .findAll({
                      where:
                      returnedSearch,
                      include: [{
                        model: Books,
                        attributes: ['bookName',
                          'bookISBN', 'bookImage',
                          'publishYear'],
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
                    .then((bookLends) => {
                      if (bookLends && bookLends.length > 0) {
                        res.status(202).json({
                          status: 'Success',
                          data: bookLends,
                        });
                      } else {
                        res.status(200).json({
                          status: 'Unsuccessful',
                          message: 'No borrowed Books',
                        });
                      }
                    })
                    .catch(error => res.status(501).send(error));
                }
              })
              .catch(error => res.status(501).send(error));
          }
        } else {
          res.status(501).json({
            status: 'Unsuccessful',
            message: 'Try again!??',
          });
        }
      })
      .catch(error =>
        res.status(404).json({
          status: 'Unsuccessful',
          message: error,
        }));
  }
  static borrowBook(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.body.bookId, 10); // change case

    const borrowdate = new Date();
    const duete = req.body.duedate || null;

    const duedate = new Date(duete);

    if (duedate
      && !isNaN(duedate.getTime())
      && duedate > borrowdate) {
      userBookInteraction.validateEntry(userId, bookId, 100)
        .then((validated) => {
          if (validated === 'Valid') {
            if (userId !== req.decoded.userId) { // false user?
              res.status(401).json({
                status: 'Unsuccessful',
                message: 'Not Allowed',
              });
            } else {
              UserDetails
                .findOne({
                  where: {
                    id: userId,
                    isActive: true,
                  },
                }) // search for user
                .then((userLoginDetails) => {
                  if (!userLoginDetails) {
                    res.status(401).json({
                      status: 'Unsuccessful',
                      message: 'Not Allowed',
                    });
                  } else {
                    Books
                      .findOne({
                        where: {
                          id: bookId,
                          isActive: true,
                        },
                      })
                      .then((foundBook) => {
                        if (foundBook) {
                          if (foundBook.bookQuantity < 1) {
                            // if all copies of book have been borrowed
                            res.status(200).json({
                              status: 'Unsuccessful',
                              message: 'Book Unavailable',
                            });
                          } else {
                            BookLendings
                              .create({
                                bookId: foundBook.id,
                                userId: userLoginDetails.id,
                                borrowDate: borrowdate,
                                dueDate: duedate,
                              })
                              .then((crtLending) => {
                                foundBook
                                  .update({
                                    bookQuantity: foundBook.bookQuantity - 1,
                                  })
                                  .then((bookBorrowed) => {
                                    res.status(202).json({
                                      status: 'Success',
                                      message: 'Book Successfully Borrowed',
                                      lendId: crtLending.id,
                                      book: bookBorrowed.bookName,
                                      QuantityLeft: bookBorrowed.bookQuantity,
                                      dueDate: crtLending.dataValues.dueDate,
                                    });
                                  })
                                  .catch(error => res.status(501).send(error));
                              })
                              .catch(error => res.status(501).send(error));
                          }
                        } else {
                          res.status(400).json({
                            status: 'Unsuccessful',
                            message: 'Invalid Book',
                          });
                        }
                      })
                      .catch(error => res.status(501).send(error));
                  }
                })
                .catch(error => res.status(501).send(error));
            }
          } else {
            res.status(501).json({
              status: 'Unsuccessful',
              message: 'Try again!??',
            });
          }
        })
        .catch(error =>
          res.status(404).json({
            status: 'Unsuccessful',
            message: error,
          }));
    } else {
      res.status(400).json({
        status: 'Unsuccessful',
        message: 'Invalid Due date',
      });
    }
  }
  static returnBook(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const bookId = parseInt(req.body.bookId, 10); // change case
    const lendId = parseInt(req.body.lendId, 10);

    userBookInteraction.validateEntry(userId, bookId, lendId)
      .then((validated) => {
        if (validated === 'Valid') {
          if (userId !== req.decoded.userId) { // false user?
            res.status(401).json({
              status: 'Unsuccessful',
              message: 'Not Allowed',
            });
          } else {
            UserDetails
              .findOne({
                where: {
                  id: userId,
                  isActive: true,
                },
              }) // search for user
              .then((userLoginDetails) => {
                if (!userLoginDetails) {
                  res.status(401).json({
                    status: 'Unsuccessful',
                    message: 'Not Allowed',
                  });
                } else {
                  BookLendings
                    .findById(lendId)
                    .then((foundLentBook) => {
                      if (foundLentBook &&
                        foundLentBook.actualReturnDate === null) {
                        // if lent book is found
                        if (foundLentBook.bookId === bookId &&
                          foundLentBook.userId === userId) {
                          // check if records match
                          Books
                            .findOne({
                              where: {
                                id: bookId,
                                isActive: true,
                              },
                            })
                            .then((borrowedBook) => {
                              if (borrowedBook) {
                                Promise
                                  .all([
                                    foundLentBook // update records
                                      .update({
                                        actualReturnDate: new Date(),
                                      }),
                                    borrowedBook
                                      .update({
                                        bookQuantity: borrowedBook.bookQuantity + 1,
                                      })])
                                  .then(([lendUpdate, borrowUpdate]) => {
                                    if (lendUpdate && borrowUpdate) {
                                      res.status(200).json({// return info
                                        status: 'Success',
                                        message: {
                                          Bookname: borrowedBook.bookName,
                                          BookQuantity: borrowUpdate.bookQuantity,
                                          BorrowedDate: lendUpdate.borrowDate,
                                          DueDate: lendUpdate.dueDate,
                                          returnDate: lendUpdate.actualReturnDate,
                                          outStanding:
                                          (lendUpdate.actualReturnDate - lendUpdate.dueDate) < 0 ?
                                            0 : lendUpdate.actualReturnDate - lendUpdate.dueDate,
                                        },
                                      });
                                    } else {
                                      res.status(500).json({
                                        status: 'Unsuccessful',
                                        message: 'An error has occured',
                                        l: lendUpdate,
                                        b: borrowUpdate,
                                      });
                                    }
                                  })
                                  .catch(error => res.status(500).send(error));
                              } else {
                                res.status(404).json({
                                  status: 'Unsuccessful',
                                  message: 'Book not found',
                                });
                              }
                            })
                            .catch(error => res.status(500).send(error));
                        } else {
                          res.status(401).json({
                            status: 'Unsuccessful',
                            message: 'User/Book not matching records',
                          });
                        }
                      } else if (foundLentBook.actualReturnDate !== null) {
                        res.status(200).json({
                          status: 'Unsuccessful',
                          message: 'Book Already Returned',
                        });
                      } else {
                        res.status(404).json({
                          status: 'Unsuccessful',
                          message: 'No records found',
                        });
                      }
                    }).catch(error => res.status(500).send(error));
                }
              })
              .catch(error => res.status(500).send(error));
          }
        } else {
          res.status(501).json({
            status: 'Unsuccessful',
            message: 'Try again!??',
          });
        }
      })
      .catch(error =>
        res.status(404).json({
          status: 'Unsuccessful',
          message: error,
        }));
  }
}
export default userBookInteraction;
