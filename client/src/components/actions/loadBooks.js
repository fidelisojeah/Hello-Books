import axios from 'axios';
import {
  FETCH_BOOKS_COMPLETE,
  FETCH_BOOKS_REJECT
} from './types';

export const fetchBooksComplete = fetchedBooks => (
  {
    type: FETCH_BOOKS_COMPLETE,
    fetchedBooks
  }
);
export const fetchBooksReject = error => (
  {
    type: FETCH_BOOKS_REJECT,
    error
  }
);
/**
 * @return {Promise} Axios request
 */
export function loadAllBooks() {
  return dispatch => {
    return axios.get('/api/v4/books');
  };
}
/**
 *
 * @param {Number} bookID
 * @return {Promiser} Axios request
 */
export function viewOneBook(bookID) {
  return dispatch => {
    return axios.get(`/api/v4/books?id=${bookID}`);
  };
}
/**
 * @param {number} page
 * @param {number} limit
 * @param {String} sort
 */
export const fetchBooks = (page, limit, sort) =>
  dispatch =>
    axios
      .get(`/api/v4/books/list/${page}?limit=${limit}&sort=${sort}`)
      .then((response) => {
        dispatch(fetchBooksComplete(response.data));
      })
      .catch((error) => {
        dispatch(fetchBooksReject(error.response));
      });
