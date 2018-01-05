import {
  CATEGORY_CREATE_COMPLETE,
  CATEGORY_CREATE_FAILURE,
  ADD_BOOK_CATEGORY_SUCCESS,
  ADD_BOOK_CATEGORY_FAILURE
} from '../components/actions/types';

/**
 * @param {object} state
 *
 * @param {object} action
 *
 * @returns {object} new state
 */
export default function categoryReducer(state = {

}, action) {
  switch (action.type) {
    case CATEGORY_CREATE_COMPLETE: {
      return {
        ...state,
        newMessage: action.message,
        error: null
      };
    }
    case CATEGORY_CREATE_FAILURE: {
      return {
        ...state,
        error: action.error
      };
    }
    default:
      return state;
  }
}
