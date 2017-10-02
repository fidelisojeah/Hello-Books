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
  ) {
    const errors = [];
    return new Promise((resolve, reject) => {
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
        reject(errors);
      }
    });
  }

}
