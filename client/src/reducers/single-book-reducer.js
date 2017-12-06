import {
  FETCH_SINGLE_BOOK_COMPLETE,
  FETCH_SINGLE_BOOK_REJECT,
  BORROW_SINGLE_BOOK_COMPLETE,
  BORROW_SINGLE_BOOK_REJECT
} from '../components/actions/types';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
export default function singleBookReducer(state = {
  fetchedBook: {},
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case FETCH_SINGLE_BOOK_COMPLETE: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        fetchedBook: action.fetchedBook
      };
    }
    case FETCH_SINGLE_BOOK_REJECT: {
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    }
    case BORROW_SINGLE_BOOK_COMPLETE: {
      return {
        ...state,
        fetchedBook: {
          ...state.fetchedBook,
          bookQuantity:
            action.borrowedBook.QuantityLeft
        }
      };
    }
    case BORROW_SINGLE_BOOK_REJECT: {
      if (action.error.message === 'Book Unavailable') {
        return {
          ...state,
          fetchedBook: {
            ...state.fetchedBook,
            bookQuantity: 0
          }
        };
      }
    }
    default:
      return state;
  }
}
