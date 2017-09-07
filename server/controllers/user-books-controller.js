import {
  UserDetails,
  Books,
  BookLendings,
} from '../models';
import jwTokens from '../middleware/helpers';
import checkSession from '../middleware/session';

class userBookInteraction {
  static validateEntry(
    userId, bookId,
  ) {
    return new Promise((resolve, reject) => {
      if (isNaN(userId)) {
        reject('Invalid User id');
      } else if (isNaN(bookId)) {
        reject('Invalid Book id');
      } else {
        resolve('Valid');
      }
    });
  }
  static viewBorrowedBook(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const isReturned = req.query.returned || null;

    userBookInteraction.validateEntry(userId, 100)
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
                    .then((bookLends) => {
                      if (bookLends) {
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

    const borrowdate = req.body.borrowdate || new Date();
    const duedate = req.body.duedate;

    userBookInteraction.validateEntry(userId, bookId)
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
  }
}
export default userBookInteraction;
