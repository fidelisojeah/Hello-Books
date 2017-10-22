import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from '../actions/types';
import setAuthorizationToken from '../../utils/setAuthToken';

/**
 *
 * @param {*} user
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}
export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    axios.get('/api/v4/users/logout');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function userLogin(userData) {
  return dispatch => {
    return axios.post('/api/v4/users/signin', userData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
      });
  };
}
