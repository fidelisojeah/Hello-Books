import {
  FETCH_BOOKS_COMPLETE,
  FETCH_BOOKS_REJECT
} from '../components/actions/types';

/**
 *
 * @param {*} state
 * @param {object} action
 */
export default function bookReducer(state = {
  fetchedBooks: {},
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case FETCH_BOOKS_COMPLETE: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        fetchedBooks: action.fetchedBooks
      };
    }
    case FETCH_BOOKS_REJECT: {
      return {
        ...state,
        fetching: false,
        error: action.error.data
      };
    }
    default:
      return state;
  }
}
