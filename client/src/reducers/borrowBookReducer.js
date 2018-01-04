import {
  BORROW_SINGLE_BOOK_COMPLETE,
  BORROW_SINGLE_BOOK_REJECT
} from '../components/actions/types';


/**
 * @param {object} state - Redux state
 *
 * @param {object} action - Redux action
 *
 * @returns {object} new state
 */
export default function borrowBookReducer(state = {
  bookBorrowed: false,
  bookBorrowedFailed: false,
  dueDate: null,
  borrowedBook: {},
  error: null
}, action) {
  switch (action.type) {
    case BORROW_SINGLE_BOOK_COMPLETE: {
      return {
        ...state,
        bookBorrowed: true,
        borrowedBook: action.borrowedBook
      };
    }
    case BORROW_SINGLE_BOOK_REJECT: {
      return {
        ...state,
        bookBorrowedFailed: true,
        error: action.error.error
      };
    }
    default:
      return state;
  }
}
