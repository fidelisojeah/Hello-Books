import {
  HOME_PAGE_BOOKS_COMPLETE,
  HOME_PAGE_BOOKS_REJECT
} from '../components/actions/types';

/**
 *
 * @param {*} state
 * @param {object} action
 * @returns {object} new state
 */
export default function homeBooksReducer(state = {
  ratedBooks: [],
  byLendingBooks: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case HOME_PAGE_BOOKS_COMPLETE: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        ratedBooks: action.books.ratedBooks,
        byLendingBooks: action.books.byLendingBooks,
        error: null
      };
    }
    case HOME_PAGE_BOOKS_REJECT: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    }
    default:
      return state;
  }
}
