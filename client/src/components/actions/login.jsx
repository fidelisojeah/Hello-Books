import axios from 'axios';

export function login(data) {
  return dispatch => {
    return axios.post('/api/v4/users/signin', data);
  };
}
