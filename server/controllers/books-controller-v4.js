import {
  Authors,
  Books,
} from '../models';
import jwTokens from '../middleware/helpers';
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
    const bookID = req.query.id || null;

    if (bookID === null) { // for all books
      Books
        .findAll({})
        .then((allBooks) => {
          if (allBooks === null || allBooks.length === 0) { // if no book is found
            res.status(200).json({
              status: 'Unsuccessful',
              message: 'No Books',
            });
          } else {
            res.status(202).json({
              status: 'Successful',
              data: allBooks,
            });
          }
        })
        .catch(error => res.status(500).json(error)); // catch error from findall
    } else {
      /*
      Books
        .findOne({

        })
        .then((bookInfo) => { })
        .catch();
        */
    }
  }
  static newBook(req, res) {
    checkSession
      .checkAdmin(req.decoded)
      .then(() => {
        const bookQuantity = req.body.quantity || 1;
        const bookImage = req.body.image || null;
        const publishYear = req.body.publishyear || null;
        const name = req.body.bookname || null;
        const ISBN = req.body.ISBN || null;
        const description = req.body.description || null;
        let authors = req.body.authorIds || 1; // author or anonymous
        if (authors !== 1) {
          authors = authors.split(',');
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

  }
  static updateBookQuantity(req, res) {
    checkSession
      .checkAdmin(req.decoded)
      .then(() => {
        const bookId = parseInt(req.body.Id, 10);
        const bookQuantity = parseInt(req.body.quantity, 10);
        if (!isNaN(bookId) || !isNaN(bookQuantity)) { // has to be a number really
          Books
            .findOne({ // search for book with id
              where: {
                id: bookId,
              },
            })
            .then((bookDetails) => {
              if (bookDetails === null) { // if a book is not found
                res.status(400).json({
                  status: 'Unsuccessful',
                  message: 'No book found',
                });
              } else { // if bookDetails is set then add
                bookDetails.update({
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
            });
        } else {
          res.status(400).json({
            status: 'Unsuccessful',
            message: 'Invalid Book ID',
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
  static
}

export default bookProps;
