import axios from 'axios';

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
