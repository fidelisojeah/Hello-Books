import axios from 'axios';

import Toastr from '../common/Toastr';

import {
  CATEGORY_CREATE_COMPLETE,
  CATEGORY_CREATE_FAILURE,
  VIEW_CATEGORY_LIST_SUCCESS,
  VIEW_CATEGORY_LIST_FAILURE,
  ADD_BOOK_CATEGORY_SUCCESS,
  ADD_BOOK_CATEGORY_FAILURE,
  REMOVE_BOOK_FROM_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS
} from './types';

/**
 *
 * @param {object} response
 *
 * @returns {object} action
 */
export const newCategorySuccess = response =>
  ({
    type: CATEGORY_CREATE_COMPLETE,
    response
  });
/**
 *
 * @param {object} response
 *
 * @returns {object} action
 */
export const viewCategoriesSuccess = response =>
  ({
    type: VIEW_CATEGORY_LIST_SUCCESS,
    response
  });
/**
 *
 * @param {object} error
 *
 * @returns {object} action
 */
export const viewCategoriesFailure = error =>
  ({
    type: VIEW_CATEGORY_LIST_FAILURE,
    error
  });
/**
*
* @param {object} error
*
* @returns {object} action
*/
export const newCategoryFailure = error =>
  ({
    type: CATEGORY_CREATE_FAILURE,
    error
  })
/**
*
* @param {object} response
*
* @returns {object} action
*/;
export const addBookCategorySuccess = response =>
  ({
    type: ADD_BOOK_CATEGORY_SUCCESS,
    response
  });
/**
*
* @param {object} response
*
* @returns {object} action
*/
export const deleteCategorySuccess = response =>
  ({
    type: DELETE_CATEGORY_SUCCESS,
    response
  });
/**
*
* @param {object} error
*
* @returns {object} action
*/
export const addBookCategoryFailure = error =>
  ({
    type: ADD_BOOK_CATEGORY_FAILURE,
    error
  });
/**
*
* @returns {promise} dispatch
*/
export function fetchCategoryList() {
  return dispatch =>
    axios
      .get('/api/v1/books/lists/categories')
      .then(response =>
        dispatch(viewCategoriesSuccess(response.data)))
      .catch(error =>
        dispatch(viewCategoriesFailure(error.response.data))
      );
}
/**
 * @param {object} categoryInfo - {categoryName}
 *
 * @returns {promise} dispatch
 */
export function newCategoryRequest(categoryInfo) {
  return dispatch =>
    axios.post('/api/v1/books/category', {
      categoryName: categoryInfo.categoryName
    })
      .then((response) => {
        Toastr.Success(response.data.message);
        dispatch(newCategorySuccess(response.data));
      })
      .catch((error) => {
        Toastr.Failure(error.response.data.message, 4000);
        dispatch(newCategoryFailure(error.response.data));
      });
}
/**
 * @param {object} categoryInfo - {categoryId, bookId}
 *
 * @returns {promise} dispatch
 */
export function bookCategoryRequest(categoryInfo) {
  return dispatch =>
    axios.put('/api/v1/books/category', {
      categoryId: categoryInfo.categoryId,
      bookId: categoryInfo.bookId,
    })
      .then((response) => {
        Toastr.Success(response.data.message);
        dispatch(addBookCategorySuccess(response.data));
      })
      .catch((error) => {
        Toastr.Failure(error.response.data.message, 4000);
        dispatch(addBookCategoryFailure(error.response.data));
      });
}
/**
 * @param {object} categoryId
 *
 * @returns {promise} dispatch
 */
export function deleteCategory(categoryId) {
  return dispatch =>
    axios
      .delete('/api/v1/books/category', {
        data: {
          categoryId
        }
      })
      .then((response) => {
        const modalMessage = `
          <p>${response.data.message}</p>`;
        Toastr
          .Modal(
          'Category Deleted',
          modalMessage
          );
        dispatch(deleteCategorySuccess(response.data.deleted));
      })
      .catch((error) => {
        const modalMessage = `
        <p>${error.response.data.status}</p>
          <p>${error.response.data.message}</p>
          </p >`;
        Toastr
          .Modal(
          'Category Not Deleted',
          modalMessage, false
          );
      });
}
/**
 *
 * @param {object} response
 *
 * @returns {object} dispatch to reducer
 */
export const bookRemoveSuccess = response => ({
  type: REMOVE_BOOK_FROM_CATEGORY_SUCCESS,
  response
});
/**
 *
 * @param {object} bookCategoryInfo
 *
 * @returns {promise} dispatch
 *
 */
export function removeBookFromCategory(bookCategoryInfo) {
  return dispatch =>
    axios
      .delete('/api/v1/book/category', {
        data: {
          categoryId: bookCategoryInfo.categoryId,
          bookId: bookCategoryInfo.bookId,
        }
      })
      .then((response) => {
        Toastr.Success(response.data.message);
        dispatch(bookRemoveSuccess(response.data));
      })
      .catch((error) => {
        Toastr.Failure(error.response.data.message, 4000);
      });
}
/**
 *
 * @param {object} categoryInfo
 *
 * @return {promise} return dispatch
 */
export function checkCategoryRequest(categoryInfo) {
  return () => {
    return axios.get(`/api/v1/search/categories?q=${categoryInfo}`);
  };
}
