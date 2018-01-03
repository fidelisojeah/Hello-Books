import axios from 'axios';
import Toastr from '../common/Toastr';

import {
  AUTHOR_CREATED_SUCCESS,
  AUTHOR_CREATED_FAILURE
} from './types';

/**
 * @returns {object} type
 */
export const authorCreateSuccess = () => ({
  type: AUTHOR_CREATED_SUCCESS
});
/**
 * @param {object} error
 *
 * @returns {object} type
 */
export const authorCreateFailure = error => ({
  type: AUTHOR_CREATED_FAILURE,
  error
});

/**
 * @description Axios post request to create new author
 *
 * @param {object} data - form data
 *
 * @return {*} dispatch, node json object
 */
export const newAuthorRequest = data =>
  dispatch =>
    axios
      .post('/api/v4/authors', data)
      .then((response) => {
        Toastr.Success(response.data.message, 4000);
        dispatch(authorCreateSuccess());
      })
      .catch((error) => {
        if (error.response.data.message === 'Not allowed') {
          Toastr.Failure('You don\'t have access', 4000);
        } else if (error.response.data.message === 'Unauthenticated') {
          Toastr.Failure('Try signing in Please', 4000);
        }
        dispatch(authorCreateFailure(error.response));
      });

