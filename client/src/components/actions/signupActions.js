import axios from 'axios';

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/v4/users/signup', userData);
  };
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/v4/users/signupCheck/${identifier}`);
  };
}
