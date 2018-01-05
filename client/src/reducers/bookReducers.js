import {
  CLEAR_BOOKS,
  FETCH_BOOKS_COMPLETE,
  FETCH_BOOKS_REJECT,
  FETCH_BOOKS_INVALID,
  REMOVE_BOOK_FROM_CATEGORY_SUCCESS
} from '../components/actions/types';

/**
 * @param {object} state
 *
 * @param {object} action
 *
 * @returns {object} new state
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
        fetchedBooks: action.fetchedBooks,
        error: null
      };
    }
    case FETCH_BOOKS_REJECT: {
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    }
    case CLEAR_BOOKS: {
      return {
        fetchedBooks: {},
        fetching: false,
        fetched: false,
        error: null
      };
    }
    case FETCH_BOOKS_INVALID: {
      return {
        ...state,
        error: action.messageContent,
        fetching: false
      };
    }
    case REMOVE_BOOK_FROM_CATEGORY_SUCCESS: {
      if (state.fetchedBooks.totalBooksCount - 1 > 1) {
        return {
          ...state,
          fetching: false,
          fetched: false,
          error: null,
          fetchedBooks: {
            ...state.fetchedBooks,
            totalBooksCount: state.fetchedBooks.totalBooksCount - 1,
            bookLists: state.fetchedBooks.bookLists.filter(book =>
              book.id !== parseInt(action.response.book, 10))
          }
        };
      }
      return {
        ...state,
        fetching: false,
        error: {
          message: 'No Books in Category'
        }
      };
    }
    default:
      return state;
  }
}
