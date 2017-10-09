export default class BookVerify {
  /**
  *
  * @param {string} bookname
  * @param {string} ISBN
  * @param {date} pubYear
  * @param {text} desc
  * @param {url} bookimage
  * @param {number} quantity
  * @return {array} promise
  */
  static checkNewBookVariables(bookname,
    ISBN,
    pubYear,
    desc,
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
        && desc !== null
        && desc
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
          bookName: bookname,
          bookISBN: ISBN,
          description: desc,
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
        if (desc === null || !desc) {
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

}
