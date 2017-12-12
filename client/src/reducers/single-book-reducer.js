import {
  FETCH_SINGLE_BOOK_COMPLETE,
  FETCH_SINGLE_BOOK_REJECT,
  BORROW_SINGLE_BOOK_COMPLETE,
  BORROW_SINGLE_BOOK_REJECT,
  FETCH_SINGLE_BOOK_INVALID,
  FETCH_BOOK_CLEAR,
  EDIT_BOOK_COMPLETE
} from '../components/actions/types';

const initialState = {
  fetchedBook: {},
  fetching: true,
  fetched: false,
  error: null
};
/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
export default function singleBookReducer(state =
  initialState
  , action) {
  switch (action.type) {
    case FETCH_BOOK_CLEAR: {
      return {
        ...state,
        fetchedBook: {},
        fetching: true,
        fetched: false,
        error: null
      };
    }
    case FETCH_SINGLE_BOOK_COMPLETE: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        fetchedBook: action.fetchedBook,
        error: null
      };
    }
    case FETCH_SINGLE_BOOK_REJECT: {
      return {
        ...state,
        fetching: false,
        fetched: false,
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
    case FETCH_SINGLE_BOOK_INVALID: {
      return {
        ...state,
        fetching: false,
        error: {
          status: 'Unsuccessful',
          message: 'No Books Found'
        }
      };
    }
    case EDIT_BOOK_COMPLETE: {
      return {
        ...state,
        fetchedBook: {
          ...state.fetchedBook,
          description: action.response.bookUpdate.description,
          bookISBN: action.response.bookUpdate.bookISBN,
          bookName: action.response.bookUpdate.bookName,
          publishYear: action.response.bookUpdate.publishYear,
          bookImage: action.response.bookUpdate.bookImage
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
