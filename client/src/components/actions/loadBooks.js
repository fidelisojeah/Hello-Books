import axios from 'axios';
import swal from 'sweetalert';
import Toastr from '../common/Toastr';

import {
  FETCH_BOOKS_COMPLETE,
  FETCH_BOOKS_REJECT,
  FETCH_SINGLE_BOOK_COMPLETE,
  FETCH_SINGLE_BOOK_REJECT,
  FETCH_SINGLE_BOOK_HISTORY_COMPLETE,
  FETCH_SINGLE_BOOK_HISTORY_REJECT,
  BORROW_SINGLE_BOOK_REJECT,
  BORROW_SINGLE_BOOK_COMPLETE,
  RETURN_SINGLE_BOOK_REJECT,
  RETURN_SINGLE_BOOK_COMPLETE,
  FETCH_SINGLE_BOOK_INVALID,
  FETCH_BORROWED_BOOKS_HISTORY_COMPLETE,
  FETCH_BORROWED_BOOKS_HISTORY_REJECT,
  FETCH_BOOK_CLEAR
} from './types';

import { getMoment } from '../common/calculate-moment';

export const clearBookStore = () => (
  { type: FETCH_BOOK_CLEAR }
);
/**
 *
 * @param {object} fetchedBooks
 *
 * @returns {object} action
 */
export const fetchBooksComplete = fetchedBooks => (
  {
    type: FETCH_BOOKS_COMPLETE,
    fetchedBooks
  }
);
/**
 *
 * @param {object} error
 *
 * @returns {object} action
 */
export const userBorrowBookHistoryFailure = error => (
  {
    type: FETCH_BORROWED_BOOKS_HISTORY_REJECT,
    error
  }
);
/**
 *
 * @param {object} fetchedBorrowedBooks
 *
 * @returns {object} action
 */
export const userBorrowBookHistorySuccess = fetchedBorrowedBooks => (
  {
    type: FETCH_BORROWED_BOOKS_HISTORY_COMPLETE,
    fetchedBorrowedBooks
  }
);
/**
 *
 * @param {object} error
 *
 * @returns {object} action
 */
export const fetchBooksReject = error => (
  {
    type: FETCH_BOOKS_REJECT,
    error
  }
);
// for single book
/**
 *
 * @param {object} fetchedBook
 *
 * @returns {object} action
 */
export const fetchBookComplete = fetchedBook => (
  {
    type: FETCH_SINGLE_BOOK_COMPLETE,
    fetchedBook
  }
);
/**
 *
 * @param {object} error
 *
 * @returns {object} action
 *
 */
export const fetchBookReject = error => (
  {
    type: FETCH_SINGLE_BOOK_REJECT,
    error
  }
);
/**
 * @returns {object} action (type)
 */
export const fetchBookInvalid = () => ({
  type: FETCH_SINGLE_BOOK_INVALID
});
// for single book
/**
 *
 * @param {object} fetchedHistory
 *
 * @returns {object} action
 */
export const userBookHistoryComplete = fetchedHistory => (
  {
    type: FETCH_SINGLE_BOOK_HISTORY_COMPLETE,
    fetchedHistory
  }
);
/**
 *
 * @param {object} error
 *
 * @returns {object} action
 */
export const userBookHistoryReject = error => (
  {
    type: FETCH_SINGLE_BOOK_HISTORY_REJECT,
    error
  }
);
/**
 *
 * @param {object} borrowedBook
 *
 * @returns {object} action
 */
export const userBorrowBookSuccess = borrowedBook => (
  {
    type: BORROW_SINGLE_BOOK_COMPLETE,
    borrowedBook
  }
);
/**
 *
 * @param {object} error
 *
 * @returns {object} action
 */
export const userBorrowBookFailure = error => (
  {
    type: BORROW_SINGLE_BOOK_REJECT,
    error
  }
);
/**
 *
 * @param {object} returnedBook
 *
 * @returns {object} action
 */
export const userBookReturnComplete = returnedBook => (
  {
    type: RETURN_SINGLE_BOOK_COMPLETE,
    returnedBook
  }
);
/**
 *
 * @param {object} error
 *
 * @returns {object} action
 */
export const userBookReturnFailure = error => (
  {
    type: RETURN_SINGLE_BOOK_REJECT,
    error
  }
);
/**
 * @return {Promise} Axios request
 */
export const loadAllBooks = () =>
  () =>
    axios.get('/api/v4/books');

/**
 *
 * @param {Number} bookID
 *
 * @return {function} dispatch
 */
export const viewOneBook = bookID =>
  dispatch =>
    axios.get(`/api/v4/books?id=${bookID}`)
      .then((response) => {
        if (response.data.bookInfo) {
          dispatch(fetchBookComplete(response.data.bookInfo));
        } else {
          dispatch(fetchBookInvalid());
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(fetchBooksReject(error.response));
        }
      });

/**
 * @param {number} page
 * @param {number} limit
 * @param {String} sort
 *
 * @returns {function} dispatch
 */
export const fetchBooks = (page, limit, sort) =>
  dispatch =>
    axios
      .get(`/api/v4/books/list/${page}?limit=${limit}&sort=${sort}`)
      .then((response) => {
        dispatch(fetchBooksComplete(response.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(fetchBooksReject(error.response));
        } else {
          dispatch(fetchBooksReject(error));
        }
      });
/**
 *
 * @param {Number} bookId
 *
 * @returns {function} Dispatch to reducers
 */
export const fetchUserBookHistory = bookId =>
  dispatch =>
    axios.get(`/api/v4/users/history/${bookId}`)
      .then((response) => {
        dispatch(userBookHistoryComplete(response.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(userBookHistoryReject(error.response));
        } else {
          dispatch(userBookHistoryReject(error));
        }
      });
/**
 *
 * @param {object} info
 *
 * @returns {function} Dispatch to reducers
 */
export const borrowBook = info =>
  dispatch =>
    axios.post(`/api/v4/users/${info.userId}/books`, info)
      .then((response) => {
        document.body.classList.remove('with--modal');
        if (response.data.status === 'Success') {
          swal('Great',
            `Book Successfully Borrowed \n 
            Book Due for return 
            ${getMoment(response.data.dueDate)}`,
            'success'
          );
          dispatch(userBorrowBookSuccess(response.data));
        } else {
          swal('Too Bad',
            `${response.data.message}`,
            'error'
          );
          dispatch(userBorrowBookFailure(response.data));
        }
      })
      .catch((error) => {
        document.body.classList.remove('with--modal');
        if (error.response) {
          Toastr.Failure(error.response.data.message, 4000);
          dispatch(userBorrowBookFailure(error.response));
        } else {
          dispatch(userBorrowBookFailure(error));
        }
      });

export const clearBookState = () =>
  dispatch =>
    dispatch(clearBookStore({}));

/**
 *
 * @param {object} userData
 *
 * @returns {function} Dispatch to reducers
 *
 */
export const retrieveBorrowHistory = userData =>
  dispatch =>
    axios
      .get(`/api/v4/users/${userData.userId}/books/list/${userData.page}`,
      {
        params: {
          order: userData.sortDesc,
          sort: userData.sortBy,
          limit: userData.limit,
          returned: !(userData.notReturned)
        }
      })
      .then((response) => {
        if (response.data.status === 'Success') {
          dispatch(userBorrowBookHistorySuccess(response.data));
        } else {
          Toastr.Caution(response.data.message, 4000);
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(userBorrowBookHistoryFailure(error.response));
        } else {
          dispatch(userBorrowBookHistoryFailure(error));
        }
      });

/**
 *
 * @param {object} userData
 *
 * @returns {function} Dispatch to reducers
 *
 */
export const returnBook = userData =>
  dispatch =>
    axios
      .put(`/api/v4/users/${userData.userId}/books`,
      {
        bookId: userData.bookId,
        lendId: userData.lendId
      })
      .then((response) => {
        if (response.data.status === 'Success') {
          dispatch(userBookReturnComplete(response.data));
          Toastr.Success(response.data.message, 4000);
        } else {
          Toastr.Caution(response.data.message, 4000);
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(userBookReturnFailure(error.response));
        } else {
          dispatch(userBookReturnComplete(error));
        }
      });

