import bookComponentReducers from
  '../../src/reducers/bookReducers';

import { bookReducer } from
  '../__mock__/mockStoreData';

describe('BOOK REDUCER', () => {
  test('should return initial state', () => {
    expect(bookComponentReducers(
      undefined, {}))
      .toEqual({
        fetchedBooks: {},
        fetching: false,
        fetched: false,
        error: null
      });
  });
  test('should fetch books', () => {
    expect(bookComponentReducers([], {
      type: 'FETCH_BOOKS_COMPLETE',
      fetchedBooks: bookReducer.fetchedBooks
    }))
      .toEqual({
        fetching: false,
        fetched: true,
        error: null,
        fetchedBooks: bookReducer.fetchedBooks
      });
  });
  test('should reject fetch books', () => {
    expect(bookComponentReducers([], {
      type: 'FETCH_BOOKS_REJECT',
      error: 'No books exists'
    }))
      .toEqual({
        fetching: false,
        error: 'No books exists'
      });
  });
  test('should clear fetch books', () => {
    expect(bookComponentReducers(bookReducer, {
      type: 'CLEAR_BOOKS'
    }))
      .toEqual({
        fetchedBooks: {},
        fetching: false,
        fetched: false,
        error: null
      });
  });
  test('should return fetch books invalid', () => {
    expect(bookComponentReducers([], {
      type: 'FETCH_BOOKS_INVALID',
      messageContent: 'Something has gone wrong'
    }))
      .toEqual({
        fetching: false,
        error: 'Something has gone wrong'
      });
  });
  test('should return fetch books invalid', () => {
    expect(bookComponentReducers(bookReducer, {
      type: 'REMOVE_BOOK_FROM_CATEGORY_SUCCESS',
      response: {
        book: 1
      }
    }))
      .toEqual({
        error: null,
        fetching: false,
        fetched: true,
        fetchedBooks: {
          totalBooksCount: 1,
          totalPages: 1,
          bookLists: [{
            id: 2,
            bookName: 'Sample Book 2',
            bookISBN: '09-2939-1022',
            description: 'some random description bout the second book',
            bookImage: 'xyz.jpg',
            publishYear: '2017-01-01T00:00:00.000Z',
            bookQuantity: 2,
            RatingCount: '0',
            RatingSum: null,
            Authors: [{
              id: 1,
              authorFirstName: 'Jane',
              authorLastName: 'Doe',
              authorAKA: 'Jane Doe',
              dateofBirth: '1900-01-01'
            }]
          }]
        }
      });
  });
});
