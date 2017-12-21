import {
  FETCH_BORROWED_BOOKS_HISTORY_COMPLETE,
  FETCH_BORROWED_BOOKS_HISTORY_REJECT,
  RETURN_SINGLE_BOOK_COMPLETE
} from '../components/actions/types';

/**
 *
 * @param {object} state
 *
 * @param {object} action
 *
 * @return {object} state
 */
export default function borrowHistoryReducer(state = {
  loading: false,
  loaded: false,
  fetchedBooks: [],
  totalPages: 1,
  error: null
}, action) {
  switch (action.type) {
    case FETCH_BORROWED_BOOKS_HISTORY_COMPLETE: {
      if (action.fetchedBorrowedBooks.status === 'Success') {
        return {
          ...state,
          loading: false,
          loaded: true,
          fetchedBooks: action.fetchedBorrowedBooks.borrowedBooks,
          totalPages: action.fetchedBorrowedBooks.totalPages,
          error: null
        };
      }
      return {
        ...state,
        loading: false,
        loaded: false,
        fetchedBooks: []
      };
    }
    case RETURN_SINGLE_BOOK_COMPLETE: {
      return {
        ...state,
        loading: false,
        loaded: true,
        fetchedBooks:
          state.fetchedBooks.map((books) => {
            if (books.id === action.returnedBook.lendId) {
              books.actualReturnDate =
                action.returnedBook.bookDetails.returnDate;
            }
            return books;
          })
      };
    }
    case FETCH_BORROWED_BOOKS_HISTORY_REJECT: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    }
    default:
      return state;
  }
}
