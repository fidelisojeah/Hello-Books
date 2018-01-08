import borrowBookComponentReducers from
  '../../src/reducers/borrowBookReducer';

import { singleBookReducer } from
  '../__mock__/mockStoreData';

describe('BORROW BOOK REDUCER', () => {
  test('should return initial state', () => {
    expect(borrowBookComponentReducers(
      undefined, {}))
      .toEqual({
        bookBorrowed: false,
        bookBorrowedFailed: false,
        dueDate: null,
        borrowedBook: {},
        error: null
      });
  });
  test('should return borrowed book Successful', () => {
    expect(borrowBookComponentReducers([], {
      type: 'BORROW_SINGLE_BOOK_COMPLETE',
      borrowedBook: singleBookReducer.fetchedBook
    }))
      .toEqual({
        bookBorrowed: true,
        borrowedBook: singleBookReducer.fetchedBook
      });
  });
  test('should return borrowed book rejection', () => {
    expect(borrowBookComponentReducers([], {
      type: 'BORROW_SINGLE_BOOK_REJECT',
      error: { error: 'Unable to borrow' }
    }))
      .toEqual({
        bookBorrowedFailed: true,
        error: 'Unable to borrow'
      });
  });
});
