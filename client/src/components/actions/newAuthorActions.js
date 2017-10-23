import axios from 'axios';

/**
 * @description Axios post request to create new author
 * @param {object} Data - form data
 * @return {*} dispatch, node json object
 */
export function newAuthorRequest(Data) {
  return dispatch => {
    return axios.post('/api/v4/authors', Data);
  };
}
/**
 * @description Axios post request to create new author
 * @param {object} Data - form data
 * @return {*} dispatch, node json object
 */
export function searchAuthors(Data) {
  return dispatch => {
    return axios.post(`/api/v4/search/authors/${Data}`);
  };
}
