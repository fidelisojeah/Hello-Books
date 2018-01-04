import axios from 'axios';

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/v1/users/signup', userData);
  };
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/v1/users/signupCheck/${identifier}`);
  };
}
