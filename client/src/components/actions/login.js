import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER } from '../actions/types';
import setAuthorizationToken from '../../utils/setAuthToken';

/**
 *
 * @param {*} user
 * @return {object} STATE
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}
/**
 * @return {function} dispatch
 */
export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    axios.get('/api/v4/users/logout');
    dispatch(setCurrentUser({}));
  };

/**
 *
 * @param {object} userData
 * @return {function} dispatch
 */
export const userLogin = userData =>
  dispatch =>
    axios.post('/api/v4/users/signin', userData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
      });

