import toTitleCase from './toTitleCase';

export default class BookVerification {
  /**
  *
  * @param {string} bookname - Book's name
  *
  * @param {string} ISBN - Book's ISBN
  *
  * @param {date} pubYear - Publish Year of Book
  *
  * @param {text} description - Book's description
  *
  * @param {url} bookimage - URL location of book's image
  *
  * @param {number} quantity - Quantity of books
  *
  * @param {array} authors
  *
  * @return {promise} promise
  */
  static checkNewBookVariables(bookname,
    ISBN,
    pubYear,
    description,
    bookimage,
    quantity,
    authors
  ) {
    const errors = [];
    return new Promise((resolve, reject) => {
      if (authors && authors !== null) {
        authors = authors.split(',')
          .map(Number); // convert to object array
      }
      if (bookname !== null
        && bookname
        && ISBN !== null
        && ISBN
        && description !== null
        && description
        && (
          !isNaN(pubYear)
          || pubYear === null
        )
        && (
          (authors && authors !== null)
          && authors.every(x => !isNaN(x) && x > 0)
        )
      ) {
        const newBookDetails = {
          bookName: toTitleCase(bookname),
          bookISBN: ISBN,
          description,
          bookQuantity: quantity,
          bookImage:
            (bookimage !== null) ? bookimage :
              'default.jpg',
          publishYear: (pubYear !== null) ? pubYear :
            '1900',
          authors
        };
        resolve(newBookDetails);// send book details
      } else {
        if (bookname === null || !bookname) {
          errors.push({
            field: 'bookname',
            error: 'No Book Name Supplied'
          });
        }
        if (ISBN === null || !ISBN) {
          errors.push({
            field: 'ISBN',
            error: 'No ISBN Supplied'
          });
        }
        if (description === null || !description) {
          errors.push({
            field: 'description',
            error: 'No Description Supplied'
          });
        }
        if (isNaN(pubYear) && pubYear !== null) {
          errors.push({
            field: 'publishyear',
            error: 'Wrong Publish Year Supplied'
          });
        }
        if (!authors || authors === null) {
          errors.push({
            field: 'authorField',
            error: 'No Authors Selected'
          });
        }
        if (Array.isArray(authors) &&
          authors.every(x => isNaN(x))) {
          errors.push({
            field: 'authorField',
            error: 'Invalid Authors'
          });
        }
        reject(errors);
      }
    });
  }
  /**
   *
   * @param {number} limit
   *
   * @param {number} page
   *
   * @returns {promise} resolve on successful verication | reject otherwise
   */
  static verifyViewBookVariables(
    limit,
    page
  ) {
    return new Promise((resolve, reject) => {
      const errors = [];
      limit = parseInt(limit, 10);
      page = parseInt(page, 10);
      if (isNaN(page) || page < 1) {
        errors.push({
          field: 'page',
          error: 'Invalid Page sent'
        });
      }
      if (isNaN(limit) || limit < 10) {
        errors.push({
          field: 'limit',
          error: 'Invalid limit sent'
        });
      }
      if (errors && errors.length > 0) {
        reject(errors);
      } else {
        const offset = limit * (page - 1);
        const viewBookDetails = {
          offset,
          limit,
          page
        };
        resolve(viewBookDetails);
      }
    });
  }

}
