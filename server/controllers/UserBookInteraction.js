import {
  Books,
  BookLendings
} from '../models';
import Interactions from '../helpers/interactions';

import BookVerify from '../helpers/new-book';

class UserBookInteraction {
  static viewBorrowedBook(request, response) {
    const userId = parseInt(request.params.userId, 10);
    const isReturned = request.query.returned || null;

    const validateAll = new Interactions(userId,
      100,
      100,
      request.decoded.userId
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
              attributes: ['id', 'bookName',
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
              response.status(202).json({
                status: 'Success',
                borrowedBooks: bookLends,
              });
            } else {
              response.status(200).json({
                status: 'Unsuccessful',
                message: 'No borrowed Books',
              });
            }
          })
          .catch(errorMessage =>
            response.status(500).json({
              status: 'Unsuccessful',
              error: errorMessage,
            }));
      })
      .catch(error =>
        response.status(error.errorCode).json(error.errors)
      );
  }
  static viewBorrowedBookHistory(request, response) {
    const userId = parseInt(request.params.userId, 10);
    const isReturned = request.query.returned || null;

    const limit = request.query.limit || null;
    const page = request.params.page;

    const orderBy = request.query.sort || null;

    const orderDESC = (request.query.order === 'true') ? 'DESC'
      : 'ASC';

    const orderList = [];

    if (orderBy) {
      if (orderBy.toLowerCase() === 'dateborrowed') {
        orderList.push(
          ['borrowDate', orderDESC]
        );
      } else if (orderBy.toLowerCase() === 'duedate') {
        orderList.push(
          ['dueDate', orderDESC]
        );
      } else if (orderBy.toLowerCase() === 'returndate') {
        orderList.push(
          ['actualReturnDate', orderDESC]
        );
      }
    }
    orderList.push(
      [Books, 'bookName', orderDESC]
    );

    const validateAll = new Interactions(userId,
      100,
      100,
      request.decoded.userId
      , true);

    validateAll
      .validateEntryandUser()
      .then((userLoginDetails) => {
        BookVerify
          .verifyViewBookVariables(
          limit, page)
          .then((viewDetails) => {
            const returnedSearch = (isReturned === 'false') ? {
              userId: userLoginDetails.id,
              actualReturnDate: null,
            } : { userId: userLoginDetails.id };
            BookLendings
              .count({
                where: returnedSearch
              })
              .then((totalBorrowCount) => {
                const totalPages = Math.ceil(totalBorrowCount / limit);
                BookLendings
                  .findAll({
                    where:
                      returnedSearch,
                    include: [{
                      model: Books,
                      attributes: ['id', 'bookName',
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
                    order: orderList,
                    offset: viewDetails.offset,
                    limit: viewDetails.limit
                  })
                  .then((bookLends) => {
                    if (bookLends && bookLends.length > 0) {
                      response.status(202).json({
                        status: 'Success',
                        totalPages,
                        borrowedBooks: bookLends,
                      });
                    } else {
                      response.status(200).json({
                        status: 'Unsuccessful',
                        message: 'No borrowed Books',
                      });
                    }
                  })
                  .catch(errorMessage =>
                    response.status(500).json({
                      status: 'Unsuccessful',
                      error: errorMessage,
                    })
                  );
              })
              .catch(errorMessage =>
                response.status(500).json({
                  status: 'Unsuccessful',
                  error: errorMessage,
                })
              );
          })
          .catch((error) => {
            response.status(400).json({
              status: 'Unsuccessful',
              message: error
            });
          });
      })
      .catch(error =>
        response.status(error.errorCode).json(error.errors)
      );
  }
  static borrowBook(request, response) {
    const userId = parseInt(request.params.userId, 10);
    const bookId = parseInt(request.body.bookId, 10); // change case

    const borrowdate = new Date();
    const duete = request.body.duedate || null;

    const duedate = new Date(duete);

    if (duedate
      && !isNaN(duedate.getTime())
      && duedate > borrowdate) {
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
                return response.status(200).json({
                  status: 'Unsuccessful',
                  message: 'Max borrow limit reached'
                });
              }
              if (foundBook) {
                if (foundBook.bookQuantity < 1) {
                  // if all copies of book have been borrowed
                  response.status(200).json({
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
                          response.status(202).json({
                            status: 'Success',
                            message: 'Book Successfully Borrowed',
                            lendId: crtLending.id,
                            borrowDate: crtLending.borrowDate,
                            book: bookBorrowed.bookName,
                            bookId: bookBorrowed.id,
                            QuantityLeft: bookBorrowed.bookQuantity,
                            dueDate: crtLending.dataValues.dueDate,
                          });
                        });
                      // .catch(error => response.status(501).json({
                      //   status: 'Unsuccessful',
                      //   error
                      // }));
                    })
                    .catch(error => response.status(501).json({
                      status: 'Unsuccessful',
                      error
                    }));
                }
              } else {
                response.status(400).json({
                  status: 'Unsuccessful',
                  message: 'Invalid Book',
                });
              }
            })
            .catch(errorMessage =>
              response.status(501).json({
                status: 'Unsuccessful',
                error: errorMessage,
              }));
        })
        .catch(error =>
          response.status(error.errorCode).json(error.errors)
        );
    } else {
      response.status(400).json({
        status: 'Unsuccessful',
        message: 'Invalid Due date',
      });
    }
  }
  static returnBook(request, response) {
    const userId = parseInt(request.params.userId, 10);
    const bookId = parseInt(request.body.bookId, 10); // change case
    const lendId = parseInt(request.body.lendId, 10);

    const validateAll = new Interactions(userId,
      bookId,
      lendId,
      request.decoded.userId
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
              response.status(404).json({
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
                        response.status(202).json({// return info
                          status: 'Success',
                          message: 'Book Returned Successfully',
                          lendId,
                          bookDetails: {
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
                      })
                      .catch(error => response.status(500).json({
                        status: 'Unsuccessful',
                        error
                      }));
                  })
                  .catch(errorMessage =>
                    response.status(500).json({
                      status: 'Unsuccessful',
                      error: errorMessage,
                    }));
              } else {
                response.status(400).json({
                  status: 'Unsuccessful',
                  message: 'User/Book not matching records',
                });
              }
            } else if (foundLentBook.actualReturnDate !== null) {
              response.status(200).json({
                status: 'Unsuccessful',
                message: 'Book Already Returned',
              });
            }
          })
          .catch(errorMessage =>
            response.status(500).json({
              status: 'Unsuccessful',
              error: errorMessage,
            }));
      })
      .catch(error =>
        response.status(error.errorCode).json(error.errors)
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
              status: 'Success',
              unreturnedBookCount,
              userBook,
              membershipDetail
            });
          })
          .catch(error => response.status(500).json({
            status: 'Unsuccessful',
            error
          }));
      })
      .catch(error =>
        response.status(error.errorCode).json(error.errors)
      );
  }
}
export default UserBookInteraction;
