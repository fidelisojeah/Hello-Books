import axios from 'axios';
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
  FETCH_BOOK_CLEAR,
  HOME_PAGE_BOOKS_REJECT,
  HOME_PAGE_BOOKS_COMPLETE
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
export const getHomePageBooksError = error => (
  {
    type: HOME_PAGE_BOOKS_REJECT,
    error
  }
);
export const getHomePageBooksSuccess = books => (
  {
    type: HOME_PAGE_BOOKS_COMPLETE,
    books
  }
);
/**
 * @return {Promise} Axios request
 */
export const loadAllBooks = () =>
  dispatch =>
    axios.get('/api/v1/sorted/books')
      .then((response) => {
        dispatch(getHomePageBooksSuccess(response.data));
      }).catch((error) => {
        dispatch(getHomePageBooksError(error.response));
        if (error.response.data.message) {
          Toastr.Failure(error.response.data.message, 4000);
        }
      });

/**
 *
 * @param {Number} bookID
 *
 * @return {function} dispatch
 */
export const viewOneBook = bookID =>
  dispatch =>
    axios.get(`/api/v1/books?id=${bookID}`)
      .then((response) => {
        if (response.data.bookInfo) {
          dispatch(fetchBookComplete(response.data.bookInfo));
        } else {
          dispatch(fetchBookInvalid());
        }
      })
      .catch((error) => {
        dispatch(fetchBookReject(error.response));
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
      .get(`/api/v1/books/list/${page}?limit=${limit}&sort=${sort}`)
      .then((response) => {
        dispatch(fetchBooksComplete(response.data));
      })
      .catch((error) => {
        dispatch(fetchBooksReject(error.response));
      });
/**
 *
 * @param {Number} bookId
 *
 * @returns {function} Dispatch to reducers
 */
export const fetchUserBookHistory = bookId =>
  dispatch =>
    axios.get(`/api/v1/users/history/${bookId}`)
      .then((response) => {
        dispatch(userBookHistoryComplete(response.data));
      })
      .catch((error) => {
        dispatch(userBookHistoryReject(error.response));
      });
/**
 *
 * @param {object} info
 *
 * @returns {function} Dispatch to reducers
 */
export const borrowBook = info =>
  dispatch =>
    axios.post(`/api/v1/users/${info.userId}/books`, info)
      .then((response) => {
        document.body.classList.remove('with--modal');
        if (response.data.status === 'Success') {
          const modalMessage = `
          <p>Book Successfully Borrowed</p>
          <p>Book Due for return
            ${getMoment(response.data.dueDate)}
          </p >`;
          Toastr
            .Modal(
            'Book Borrowed',
            modalMessage
            );
          dispatch(userBorrowBookSuccess(response.data));
        } else {
          Toastr.Failure(response.data.message, 4000);
          dispatch(userBorrowBookFailure(response.data));
        }
      })
      .catch((error) => {
        document.body.classList.remove('with--modal');
        Toastr.Failure(error.response.data.message, 4000);
        dispatch(userBorrowBookFailure(error.response));
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
      .get(`/api/v1/users/${userData.userId}/books/list/${userData.page}`,
      {
        params: {
          order: userData.sortDesc,
          sort: userData.sortBy,
          limit: userData.limit,
          returned: !(userData.notReturned)
        }
      })
      .then((response) => {
        if (response.data.status !== 'Success') {
          Toastr.Caution(response.data.message, 4000);
        }
        dispatch(userBorrowBookHistorySuccess(response.data));
      })
      .catch((error) => {
        dispatch(userBorrowBookHistoryFailure(error.response));
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
      .put(`/api/v1/users/${userData.userId}/books`,
      {
        bookId: userData.bookId,
        lendId: userData.lendId
      })
      .then((response) => {
        if (response.data.status === 'Success') {
          Toastr.Success(response.data.message, 4000);
        } else {
          Toastr.Caution(response.data.message, 4000);
        }
        dispatch(userBookReturnComplete(response.data));
      })
      .catch((error) => {
        dispatch(userBookReturnFailure(error.response));
      });

