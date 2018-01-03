import axios from 'axios';
import jwtDecode from 'jwt-decode';

import Toastr from '../common/Toastr';

import {
  SET_CURRENT_USER,
  SIGN_IN_UNSUCCESSFUL
} from '../actions/types';
import setAuthorizationToken from '../../utils/setAuthToken';

/**
 *
 * @param {object} user
 *
 * @return {object} STATE
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}
/**
 *
 * @param {object} error
 *
 * @return {object} STATE
 */
export const signInUnsuccessful = error => (
  {
    type: SIGN_IN_UNSUCCESSFUL,
    error,
  }
);
/**
 * @return {function} dispatch
 */
export const logout = () =>
  dispatch =>
    axios.get('/api/v4/users/logout')
      .then(() => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
      });


/**
 *
 * @param {object} userData
 *
 * @return {function} dispatch
 */
export const userLogin = userData =>
  dispatch =>
    axios.post('/api/v4/users/signin', userData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        Toastr.Success('Sign In Successful');
        dispatch(setCurrentUser(jwtDecode(token)));
      })
      .catch((error) => {
        dispatch(signInUnsuccessful(error.response));
      });

