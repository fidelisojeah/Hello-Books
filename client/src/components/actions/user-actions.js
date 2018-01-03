import axios from 'axios';
import {
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAILURE,
} from './types';

import Toastr from '../common/Toastr';


export const verifyUserSuccess = verified => (
  {
    type: VERIFY_USER_SUCCESS,
    verified
  }
);

export const verifyUserFailure = error => (
  {
    type: VERIFY_USER_FAILURE,
    error
  }
);
/**
 *
 * @param {object} data - Verify User Data
 *
 * @return {function} dispatch
 */
export const verifyUser = data =>
  dispatch =>
    axios
      .get('/api/v4/users/verify',
      {
        params: data
      })
      .then((response) => {
        dispatch(verifyUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(verifyUserFailure(error.response));
      });

/**
 *
 * @param {object} data - {username}
 *
 * @return {function} dispatch
 */
export const resendActivation = data =>
  dispatch =>
    axios
      .get(`/api/v4/user/verify/${data.username}`)
      .then((response) => {
        Toastr.Success(response.data.message);
      })
      .catch((error) => {
        Toastr.Success(error.response.data.message);
      });

