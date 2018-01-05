import {
  LOAD_ALL_BOOKS_SUCCESS
} from '../components/actions/types';

/**
 *
 * @param {object} state
 *
 * @param {object} action
 *
 * @returns {object} new state
 */
export default function allBooksReducer(state = {
  bookList: []
}, action) {
  switch (action.type) {
    case LOAD_ALL_BOOKS_SUCCESS: {
      return {
        ...state,
        bookList: action.response.allBooks
      };
    }
    default:
      return state;
  }
}
