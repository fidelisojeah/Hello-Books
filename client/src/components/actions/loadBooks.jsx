import axios from 'axios';

export function loadAllBooks() {
  return dispatch => {
    return axios.get('/api/v4/books');
  };
}
