import bookHistoryReducerComponent from
  '../../src/reducers/bookHistoryReducer';

describe('BOOK HISTORY CATEGORY REDUCER', () => {
  test('should return initial state', () => {
    expect(bookHistoryReducerComponent(
      undefined, {}))
      .toEqual({
        availableBorrow: 3,
        membershipName: '',
        unreturnedBookCount: 0,
        borrowedBooks: [],
        borrowedBooksCount: 0,
        error: null
      });
  });
  test('should fetch single book', () => {
    expect(bookHistoryReducerComponent([], {
      type: 'FETCH_SINGLE_BOOK_HISTORY_REJECT',
      error: 'Something went wrong'
    }))
      .toEqual({
        error: 'Something went wrong'
      });
  });
});
