import {
  FETCH_SINGLE_BOOK_HISTORY_COMPLETE,
  BORROW_SINGLE_BOOK_COMPLETE,
  BORROW_SINGLE_BOOK_REJECT,
  FETCH_SINGLE_BOOK_HISTORY_REJECT
} from '../components/actions/types';

/**
 *
 * @param {object} state
 *
 * @param {object} action
 *
 * @returns {object} new state
 */
export default function bookHistoryReducer(state = {
  availableBorrow: 3,
  membershipName: '',
  unreturnedBookCount: 0,
  borrowedBooks: [],
  borrowedBooksCount: 0,
  error: null
}, action) {
  switch (action.type) {
    case FETCH_SINGLE_BOOK_HISTORY_COMPLETE: {
      return {
        ...state,
        membershipName: action.fetchedHistory.membershipDetail.membershipName,
        availableBorrow: (action.fetchedHistory.membershipDetail.maxBooks
          - action.fetchedHistory.unreturnedBookCount),
        unreturnedBookCount: action.fetchedHistory.unreturnedBookCount,
        borrowedBooks: action.fetchedHistory.userBook.rows,
        borrowedBooksCount: action.fetchedHistory.userBook.count,
        error: null
      };
    }
    case FETCH_SINGLE_BOOK_HISTORY_REJECT: {
      return {
        ...state,
        error: action.error
      };
    }
    case BORROW_SINGLE_BOOK_COMPLETE: {
      return {
        ...state,
        availableBorrow: state.availableBorrow - 1,
        unreturnedBookCount: state.unreturnedBookCount + 1,
        borrowedBooksCount: state.borrowedBooksCount + 1,
        borrowedBooks: [
          {
            id: action.borrowedBook.lendId,
            bookId: action.borrowedBook.bookId,
            borrowDate: action.borrowedBook.borrowDate,
            actualReturnDate: null,
            dueDate: action.borrowedBook.dueDate
          },
          ...state.borrowedBooks
        ],
        error: null
      };
    }
    case BORROW_SINGLE_BOOK_REJECT: {
      return {
        ...state,
        error: action.error
      };
    }
    default:
      return state;
  }
}
