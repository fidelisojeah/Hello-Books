import {
  UserDetails,
  Books,
  BookLendings
} from '../models';

class Interactions {
  constructor(userId,
    bookId,
    lendId,
    decodedUserId,
    isActive) {
    this.userId = userId;
    this.bookId = bookId;
    this.lendId = lendId;
    this.decodedUserId = decodedUserId;
    this.isActive = isActive;
  }
  validateEntry() {
    return new Promise((resolve, reject) => {
      if (isNaN(this.userId)) {
        reject('Invalid User id');
      } else if (isNaN(this.bookId)) {
        reject('Invalid Book id');
      } else if (isNaN(this.lendId)) {
        reject('Invalid');
      } else {
        resolve('Valid');
      }
    });
  }
  checkUser() {
    return new Promise((resolve, reject) => {
      UserDetails
        .findOne({
          where: {
            id: this.userId,
            isActive: this.isActive
          }
        })
        .then((userLoginDetails) => {
          if (!userLoginDetails ||
            this.decodedUserId !== this.userId) {
            reject({
              errorCode: 401,
              errors: {
                status: 'Unsuccessful',
                message: 'Not Allowed'
              }
            });
          } else {
            resolve(userLoginDetails);
          }
        })
        .catch(error =>
          reject({
            errorCode: 501,
            errors: {
              status: 'Unsuccessful',
              error
            }
          })
        );
    });
  }
  validateEntryandUser() {
    return new Promise((resolve, reject) => {
      this.validateEntry()
        .then(() => {
          this.checkUser()
            .then(userChecked => resolve(userChecked))
            .catch(error =>
              reject(error));
        })
        .catch(error =>
          reject({
            errorCode: 404,
            errors: {
              status: 'Unsuccessful',
              message: error
            }
          }));
    });
  }
}

export default Interactions;
