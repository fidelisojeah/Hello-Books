import {
  Authors,
  Books,
} from '../models';
// import jwTokens from '../middleware/helpers';
import checkSession from '../middleware/session';

// const userCookieInfo = 'userCookieInfo';

class bookProps {
  static newAuthor(req, res) {
    checkSession
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
            .catch(error => res.status(500).send(error));
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
  static viewBooks(req, res) {
    const bookID = parseInt(req.query.id, 10);
    if (isNaN(bookID)) { // for all books
      Books
        .findAll({
          where: {
            isActive: true,
          },
          include: [{
            model: Authors,
            attributes: [
              'authorAKA'],
          }],
          attributes:
          ['id', 'bookName', 'bookISBN',
            'description', 'bookImage',
            'publishYear'],
        })
        .then((allBooks) => {
          if (allBooks === null || allBooks.length === 0) { // if no book is found
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
        .catch(error => res.status(500).json(error)); // catch error from findall
    } else {
      Books
        .findOne({
          where: {
            isActive: true,
            id: bookID,
          },
          include: [{
            model: Authors,
            attributes: ['authorFirstName',
              'authorLastName',
              'authorAKA', 'dateofBirth'],
          }],
        })
        .then((bookInfo) => {
          res.status(202).json({
            status: 'Success',
            data: bookInfo,
          });
        })
        .catch(error => res.status(500).send(error));
    }
  }
  static checkNewBookVariables(bookname,
    ISBN,
    pubYear,
    desc,
    bookimage,
    quantity,
  ) {
    return new Promise((resolve, reject) => {
      if (bookname === null) {
        reject('No Book Name Supplied');
      } else if (ISBN === null) {
        reject('No ISBN Supplied');
      } else if (desc === null) {
        reject('No Description Supplied');
      } else {
        const newBookDetails = {
          bookName: bookname,
          bookISBN: ISBN,
          description: desc,
          bookQuantity: quantity,
          bookImage:
          (bookimage !== null) ? bookimage :
            'default.jpg',
          publishYear: (pubYear !== null) ? pubYear :
            '1900',
        };
        resolve(newBookDetails);// send book details
      }
    });
  }
  static newBook(req, res) {
    checkSession
      .checkAdmin(req.decoded)
      .then(() => {
        const bookQuantity = req.body.quantity || 1;
        const bookImage = req.body.image || null;
        const publishYear = req.body.publishyear || null;
        const bookName = req.body.bookname || null;
        const ISBN = req.body.ISBN || null;
        const description = req.body.description || null;
        let authors = req.body.authorIds || '1'; // author or anonymous
        authors = authors.split(',').map(Number); // convert to object array

        if (authors.every(x => !isNaN(x) && x > 0)) {
          // true if every element is int
          bookProps.checkNewBookVariables(bookName,
            ISBN,
            publishYear,
            description,
            bookImage,
            bookQuantity,
          )
            .then((completeBookDetails) => {
              // if book details are verified complete
              if (completeBookDetails) {
                Authors
                  .findAll({
                    where: {
                      id: authors,
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
                            .catch(error => res.status(501).send(error));
                        })
                        .catch((error) => {
                          if (error.name === 'SequelizeUniqueConstraintError') {
                            res.status(400).json({
                              status: 'Unsuccessful',
                              message: 'Book Already Exists',
                            });
                          } else {
                            res.status(500).send(error);
                          }
                        });
                    } else {
                      res.status(400).json({
                        status: 'Unsuccessful',
                        message: 'No Author found',
                      });
                    }
                  })
                  .catch(error => res.status(501).send(error));
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
        } else {
          res.status(400).json({
            status: 'Unsuccessful',
            message: 'Invalid Authors',
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
          if (allAuthors === null || allAuthors.length === 0) { // if no book is found
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
        .catch(error => res.status(500).json(error)); // catch error from findall
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
        .catch(error => res.status(500).send(error));
    }
  }
  static updateBookQuantity(req, res) {
    checkSession
      .checkAdmin(req.decoded)
      .then(() => {
        const bookId = parseInt(req.params.bookId, 10);
        const bookQuantity = parseInt(req.body.quantity, 10);
        if (!isNaN(bookId) && !isNaN(bookQuantity)) { // has to be a number really
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
                  .catch(error => res.status(500).send(error));
              }
            })
            .catch(error => res.status(501).send(error));
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
    checkSession
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
                  .catch(error => res.status(501).send(error));
              }
            }).catch(error => res.status(500).send(error)); // catch error from findone
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

export default bookProps;
