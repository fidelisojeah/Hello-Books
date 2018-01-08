import homeBooksReducerComponent from
  '../../src/reducers/homeBooksReducer';

import { homeBooksReducer } from
  '../__mock__/mockStoreData';

describe('HOME PAGE BOOKS REDUCER', () => {
  test('should return initial state', () => {
    expect(homeBooksReducerComponent(
      undefined, {}))
      .toEqual({
        ratedBooks: [],
        byLendingBooks: [],
        fetching: false,
        fetched: false,
        error: null
      });
  });
  test('should return borrowed book Successful', () => {
    expect(homeBooksReducerComponent([], {
      type: 'CLEAR_ALL_INDEX'
    }))
      .toEqual({
        ratedBooks: [],
        byLendingBooks: [],
        fetching: false,
        fetched: false,
        error: null
      });
  });
  test('should load books for homepage successfully', () => {
    expect(homeBooksReducerComponent([], {
      type: 'HOME_PAGE_BOOKS_COMPLETE',
      books: {
        ratedBooks: homeBooksReducer.ratedBooks,
        byLendingBooks: homeBooksReducer.byLendingBooks
      }
    }))
      .toEqual({
        fetching: false,
        fetched: true,
        ratedBooks: homeBooksReducer.ratedBooks,
        byLendingBooks: homeBooksReducer.byLendingBooks,
        error: null
      });
  });
  test('should reject home page loading', () => {
    expect(homeBooksReducerComponent([], {
      type: 'HOME_PAGE_BOOKS_REJECT',
      error: 'Something has gone wrong'
    }))
      .toEqual({
        fetching: false,
        fetched: false,
        error: 'Something has gone wrong'
      });
  });
});
