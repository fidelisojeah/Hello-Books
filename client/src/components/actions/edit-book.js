import axios from 'axios';

import Toastr from '../common/Toastr';

import {
  EDIT_BOOK_COMPLETE,
  EDIT_BOOK_ERROR
} from './types';

export const editBookSuccess = response =>
  ({
    type: EDIT_BOOK_COMPLETE,
    response
  });
export const editBookError = error =>
  ({
    type: EDIT_BOOK_ERROR,
    error
  });

/**
 * @param {object} info - parameters to edit
 * @param {number} bookId - The Book ID
 */
export function editBook(info, bookId) {
  return dispatch =>
    axios.put(`/api/v4/books/${bookId}`, info)
      .then((response) => {
        Toastr.Success(response.data.message, 4000);
        dispatch(editBookSuccess(response.data));
      })
      .catch((error) => {
        if (error.response) {
          Toastr.Failure(error.response.data.error, 4000);
          dispatch(editBookError(error.response.data));
        } else {
          Toastr.Failure(error, 4000);
          dispatch(editBookError(error));
        }
      });
}
