import {
  UserDetails,
  Books,
  BookLendings
} from '../models';
import Interactions from '../helpers/interactions';

class UserBookInteraction {
  static viewBorrowedBook(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const isReturned = req.query.returned || null;

    const validateAll = new Interactions(userId,
      100,
      100,
      req.decoded.userId
      , true);

    validateAll
      .validateEntryandUser()
      .then((userLoginDetails) => {
        // if User found
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
          .catch(errorMessage =>
            res.status(501).json({
              status: 'Unsuccessful',
              error: errorMessage,
            }));
      })
      .catch(error =>
        res.status(error.errorCode).json(error.errors)
      );
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
      const validateAll = new Interactions(userId,
        bookId,
        100,
        req.decoded.userId
        , true);

      validateAll
        .validateEntryandUser()
        .then((userLoginDetails) => {
          Promise
            .all([
              Books
                .findOne({
                  where: {
                    id: bookId,
                    isActive: true,
                  },
                }),
              BookLendings
                .count({
                  where: {
                    userId,
                    actualReturnDate: null
                  }
                }),
              userLoginDetails
                .getMembership()
            ])
            .then(([foundBook, unreturnedBookCount, membershipDetail]) => {
              if (membershipDetail.maxBooks <= unreturnedBookCount) {
                return res.status(200).json({
                  status: 'Unsuccessful',
                  message: 'Max borrow limit reached'
                });
              }
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
                            borrowDate: crtLending.borrowDate,
                            book: bookBorrowed.bookName,
                            bookId: bookBorrowed.id,
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
            .catch(errorMessage =>
              res.status(501).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
        })
        .catch(error =>
          res.status(error.errorCode).json(error.errors)
        );
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

    const validateAll = new Interactions(userId,
      bookId,
      lendId,
      req.decoded.userId
      , true);

    validateAll
      .validateEntryandUser()
      .then((userLoginDetails) => {
        BookLendings
          .findOne({
            where: {
              id: lendId,
            },
          })
          .then((foundLentBook) => {
            if (!foundLentBook) {
              res.status(404).json({
                status: 'Unsuccessful',
                message: 'No records found',
              });
            } else if (foundLentBook &&
              foundLentBook.actualReturnDate === null) {
              if (foundLentBook.bookId === bookId &&
                foundLentBook.userId ===
                userLoginDetails.id) {
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
                              bookQuantity:
                                borrowedBook.bookQuantity + 1,
                            })])
                        .then(([lendUpdate, borrowUpdate]) => {
                          if (lendUpdate && borrowUpdate) {
                            res.status(202).json({// return info
                              status: 'Success',
                              message: {
                                Bookname: borrowedBook.bookName,
                                BookQuantity:
                                  borrowUpdate.bookQuantity,
                                BorrowedDate: lendUpdate.borrowDate,
                                DueDate: lendUpdate.dueDate,
                                returnDate:
                                  lendUpdate.actualReturnDate,
                                outStanding:
                                  (lendUpdate.actualReturnDate -
                                    lendUpdate.dueDate) < 0 ?
                                    0 : lendUpdate.actualReturnDate -
                                    lendUpdate.dueDate,
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
                  .catch(errorMessage =>
                    res.status(500).json({
                      status: 'Unsuccessful',
                      error: errorMessage,
                    }));
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
            }
          })
          .catch(errorMessage =>
            res.status(500).json({
              status: 'Unsuccessful',
              error: errorMessage,
            }));
      })
      .catch(error =>
        res.status(error.errorCode).json(error.errors)
      );
  }
  static userBookHistory(request, response) {
    const bookId = parseInt(request.params.bookId, 10);
    const userId = parseInt(request.decoded.userId, 10);

    const validateAll = new Interactions(userId,
      bookId,
      100,
      request.decoded.userId
      , true);

    validateAll
      .validateEntryandUser()
      .then((userLoginDetails) => {
        Promise
          .all([
            BookLendings
              .count({
                where: {
                  userId,
                  actualReturnDate: null
                }
              }),
            BookLendings
              .findAndCountAll({
                where: {
                  userId,
                  bookId
                },
                order: [['borrowDate', 'DESC']]
              }),
            userLoginDetails
              .getMembership()
          ])
          .then(([unreturnedBookCount, userBook, membershipDetail]) => {
            response.status(202).json({
              unreturnedBookCount,
              userBook,
              membershipDetail
            });
          })
          .catch(error => response.status(500).send(error));
      })
      .catch(error =>
        response.status(error.errorCode).json(error.errors)
      );
  }
}
export default UserBookInteraction;
