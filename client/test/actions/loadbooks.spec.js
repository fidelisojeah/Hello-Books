import * as loadBookActions from '../../src/components/actions/loadBooks';
import * as types from '../../src/components/actions/types';

describe('Load Books actions', () => {
  beforeEach(() => {
    moxios.install();
    document.body.innerHTML = toastrMock;
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('When trying to view a single book', () => {
    const data = {
      bookInfo: {
        id: 1,
        bookName: 'Sample Book',
        bookISBN: '09-293912-190-1',
        description: 'some random description',
        bookImage: 'xyz.jpg',
        publishYear: '2017-01-01T00:00:00.000Z',
        bookQuantity: 4,
        ratingCount: 0,
        ratingSum: null,
        Authors: [{
          id: 1,
          authorFirstName: 'Jane',
          authorLastName: 'Doe',
          authorAKA: 'Jane Doe',
          dateofBirth: '1900-01-01'
        }]
      }
    };
    test('should create type: FETCH_SINGLE_BOOK_COMPLETE', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 202,
          response: data,
        });
      });
      const fetchedBook = data.bookInfo;
      const expectActions = [{
        type: types.FETCH_SINGLE_BOOK_COMPLETE, fetchedBook
      }];
      const store = mockStore({});

      return store.dispatch(loadBookActions.viewOneBook(1)).then(() => {
        expect(store.getActions()).toEqual(expectActions);
      });
    });
    test(`should create type:
    FETCH_SINGLE_BOOK_INVALID on empty return value`,
      () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: ''
          });
        });
        const expectActions = [{
          type: types.FETCH_SINGLE_BOOK_INVALID
        }];
        const store = mockStore({});

        return store.dispatch(loadBookActions.viewOneBook(1)).then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
      });
    test(`should create type: 
    FETCH_SINGLE_BOOK_REJECT on request error`,
      () => {
        const error = {
          response: 'Something has gone wrong here'
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject({
            status: 400,
            response: error
          });
        });
        const expectActions = [{
          type: types.FETCH_SINGLE_BOOK_REJECT, error
        }];
        const store = mockStore({});

        return store.dispatch(loadBookActions.viewOneBook(1)).then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
      });
  });
  describe('When trying to view a All book', () => {
    const data = {
      status: 'Success',
      totalBooksCount: 1,
      totalPages: 1,
      bookLists: [
        {
          id: 1,
          bookName: 'Sample Book',
          bookISBN: '09-293912-190-1',
          description: 'some random description',
          bookImage: 'xyz.jpg',
          publishYear: '2017-01-01T00:00:00.000Z',
          bookQuantity: 4,
          ratingCount: 0,
          ratingSum: null,
          Authors: [{
            id: 1,
            authorFirstName: 'Jane',
            authorLastName: 'Doe',
            authorAKA: 'Jane Doe',
            dateofBirth: '1900-01-01'
          }]
        }
      ]
    };
    test('should create type: FETCH_BOOKS_COMPLETE', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 202,
          response: data,
        });
      });
      const fetchedBooks = data;
      const expectActions = [{
        type: types.FETCH_BOOKS_COMPLETE, fetchedBooks
      }];
      const store = mockStore({});

      return store
        .dispatch(loadBookActions
          .fetchBooks(1, 10, 'rating')).then(() => {
            expect(store.getActions()).toEqual(expectActions);
          });
    });
    test('should create type: FETCH_BOOKS_REJECT on request error', () => {
      const error = {
        response: 'Something has gone wrong here'
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 400,
          response: error
        });
      });
      const expectActions = [{
        type: types.FETCH_BOOKS_REJECT, error
      }];
      const store = mockStore({});

      return store.dispatch(loadBookActions.fetchBooks(1, 10)).then(() => {
        expect(store.getActions()).toEqual(expectActions);
      });
    });
  });
  describe('When trying to view User - Book History', () => {
    const data = {
      status: 'Success',
      totalBooksCount: 1,
      totalPages: 1,
      bookLists: [
        {
          id: 1,
          bookName: 'Sample Book',
          bookISBN: '09-293912-190-1',
          description: 'some random description',
          bookImage: 'xyz.jpg',
          publishYear: '2017-01-01T00:00:00.000Z',
          bookQuantity: 4,
          ratingCount: 0,
          ratingSum: null,
          Authors: [{
            id: 1,
            authorFirstName: 'Jane',
            authorLastName: 'Doe',
            authorAKA: 'Jane Doe',
            dateofBirth: '1900-01-01'
          }]
        }
      ]
    };
    test('should create type: FETCH_SINGLE_BOOK_HISTORY_COMPLETE', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 202,
          response: data,
        });
      });
      const fetchedHistory = data;
      const expectActions = [{
        type: types.FETCH_SINGLE_BOOK_HISTORY_COMPLETE, fetchedHistory
      }];
      const store = mockStore({});

      return store
        .dispatch(loadBookActions
          .fetchUserBookHistory(1))
        .then(() => {
          expect(store.getActions())
            .toEqual(expectActions);
        });
    });
    test(`should create type: 
    FETCH_SINGLE_BOOK_HISTORY_REJECT on request error`,
      () => {
        const error = {
          response: 'Something has gone wrong here'
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject({
            status: 400,
            response: error
          });
        });
        const expectActions = [{
          type: types.FETCH_SINGLE_BOOK_HISTORY_REJECT, error
        }];
        const store = mockStore({});

        return store
          .dispatch(loadBookActions
            .fetchUserBookHistory(1))
          .then(() => {
            expect(store
              .getActions())
              .toEqual(expectActions);
          });
      });
  });
  describe('When trying to Borrow Books', () => {
    const data = {
      status: 'Success',
      message: 'Book Successfully Borrowed',
      lendId: 1,
      borrowDate: '2017-12-14T11:59:35.883Z',
      book: 'Sample Book',
      bookId: 1,
      QuantityLeft: 3,
      dueDate: '2018-01-01T00:00:00.000Z'
    };
    test('should create type: BORROW_SINGLE_BOOK_COMPLETE', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 202,
          response: data,
        });
      });
      const borrowedBook = data;
      const expectActions = [{
        type: types.BORROW_SINGLE_BOOK_COMPLETE, borrowedBook
      }];
      const store = mockStore({});

      return store.dispatch(loadBookActions.borrowBook(1)).then(() => {
        expect(store.getActions()).toEqual(expectActions);
      });
    });
    test('should create type: BORROW_SINGLE_BOOK_REJECT', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            status: 'none',
            message: 'Book Unavailable'
          },
        });
      });
      const error = {
        status: 'none',
        message: 'Book Unavailable'
      };
      const expectActions = [{
        type: types.BORROW_SINGLE_BOOK_REJECT, error
      }];
      const store = mockStore({});

      return store.dispatch(loadBookActions.borrowBook(1)).then(() => {
        expect(store.getActions()).toEqual(expectActions);
      });
    });
    test('should create type: BORROW_SINGLE_BOOK_REJECT on request error',
      () => {
        const error = {
          data: {
            message: 'Something has gone wrong here'
          }
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject({
            status: 400,
            response: error
          });
        });
        const expectActions = [{
          type: types.BORROW_SINGLE_BOOK_REJECT, error
        }];
        const store = mockStore({});

        return store.dispatch(loadBookActions.borrowBook(1)).then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
      });
  });
  describe('When trying to Return Books', () => {
    const data = {

      status: 'Success',
      message: 'Book Returned Successfully',
      lendId: 1,
      bookDetails: {
        Bookname: 'Sample Book',
        BookQuantity: 4,
        BorrowedDate: '2017-12-14T11:59:35.883Z',
        DueDate: '2018-01-01T00:00:00.000Z',
        returnDate: '2017-12-14T18:26:49.552Z',
        outStanding: 0
      }
    };
    test('should create type: RETURN_SINGLE_BOOK_COMPLETE', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 202,
          response: data,
        });
      });
      const returnedBook = data;
      const expectActions = [{
        type: types.RETURN_SINGLE_BOOK_COMPLETE, returnedBook
      }];
      const store = mockStore({});

      return store.dispatch(loadBookActions.returnBook(1)).then(() => {
        expect(store.getActions()).toEqual(expectActions);
      });
    });
    test('should create type: RETURN_SINGLE_BOOK_REJECT', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            status: 'none',
            message: 'Book Unavailable'
          },
        });
      });
      const returnedBook = {
        status: 'none',
        message: 'Book Unavailable'
      };
      const expectActions = [{
        type: types.RETURN_SINGLE_BOOK_COMPLETE, returnedBook
      }];
      const store = mockStore({});

      return store.dispatch(loadBookActions.returnBook(1)).then(() => {
        expect(store.getActions()).toEqual(expectActions);
      });
    });
    test('should create type: RETURN_SINGLE_BOOK_REJECT on request error',
      () => {
        const error = {
          data: {
            message: 'Something has gone wrong here'
          }
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject({
            status: 400,
            response: error
          });
        });
        const expectActions = [{
          type: types.RETURN_SINGLE_BOOK_REJECT, error
        }];
        const store = mockStore({});

        return store.dispatch(loadBookActions.returnBook(1)).then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
      });
  });
  describe('When trying to Retrieve Borrowed Books History', () => {
    const data = {
      status: 'Success',
      totalPages: 1,
      borrowBooks: [
        {
          id: 1,
          borrowDate: '2017-12-14T11:59:35.883Z',
          actualReturnDate: '2017-12-14T18:26:49.552Z',
          dueDate: '2018-01-01T00:00:00.000Z',
          book: {
            id: 1,
            bookName: 'Sample Book',
            bookISBN: '1092-298301-191',
            bookImage: 'xyz.jpg',
            publishYear: '2017-01-01T00:00:00.000Z'
          }
        }
      ]
    };
    test(`should create type: 
    FETCH_BORROWED_BOOKS_HISTORY_COMPLETE`,
      () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 202,
            response: data,
          });
        });
        const fetchedBorrowedBooks = data;
        const expectActions = [{
          type: types
            .FETCH_BORROWED_BOOKS_HISTORY_COMPLETE,
          fetchedBorrowedBooks
        }];
        const store = mockStore({});

        return store
          .dispatch(loadBookActions
            .retrieveBorrowHistory({
              sortDesc: 'true',
              sortBy: 'duedate',
              limit: 10,
              notReturned: false
            }))
          .then(() => {
            expect(store.getActions()).toEqual(expectActions);
          });
      });
    test('should Display caution message', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            data: {
              status: 'none',
              message: 'No Books Borrowed'
            }
          },
        });
      });
      const store = mockStore({});
      const fetchedBorrowedBooks = {
        data: {
          status: 'none',
          message: 'No Books Borrowed'
        }
      };
      const expectActions = [{
        type: types.FETCH_BORROWED_BOOKS_HISTORY_COMPLETE, fetchedBorrowedBooks
      }];
      return store.dispatch(loadBookActions.retrieveBorrowHistory({
        sortDesc: 'true',
        sortBy: 'duedate',
        limit: 10,
        notReturned: false
      })).then(() => {
        expect(store.getActions()).toEqual(expectActions);
      });
    });
    test(`should create type: 
    FETCH_BORROWED_BOOKS_HISTORY_REJECT on request error`,
      () => {
        const error = {
          data: {
            message: 'Something has gone wrong here'
          }
        };
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject({
            status: 400,
            response: error
          });
        });
        const expectActions = [{
          type: types.FETCH_BORROWED_BOOKS_HISTORY_REJECT, error
        }];
        const store = mockStore({});

        return store
          .dispatch(loadBookActions
            .retrieveBorrowHistory({
              sortDesc: 'true',
              sortBy: 'duedate',
              limit: 10,
              notReturned: false
            }))
          .then(() => {
            expect(store.getActions()).toEqual(expectActions);
          });
      });
  });
  describe('Clear Book Store', () => {
    test('should create FETCH_BOOK_CLEAR', () => {
      const store = mockStore({});

      const expectActions = {
        type: types.FETCH_BOOK_CLEAR
      };

      expect(store
        .dispatch(loadBookActions
          .clearBookState()))
        .toEqual(expectActions);
    });
  });
  describe('loadAllBooks function', () => {
    const data = {
      status: 'Success',
      bookLists: [
        {
          id: 1,
          bookName: 'Sample Book',
          bookISBN: '09-293912-190-1',
          description: 'some random description',
          bookImage: 'xyz.jpg',
          publishYear: '2017-01-01T00:00:00.000Z',
          bookQuantity: 4,
          ratingCount: 0,
          ratingSum: null,
          Authors: [{
            id: 1,
            authorFirstName: 'Jane',
            authorLastName: 'Doe',
            authorAKA: 'Jane Doe',
            dateofBirth: '1900-01-01'
          }]
        }
      ]
    };
    test('Should successfully be called', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 202,
          response: data,
        });
      });
      const store = mockStore({});
      const books = data;
      const expectActions = [{
        type: types
          .HOME_PAGE_BOOKS_COMPLETE,
        books
      }];
      return store
        .dispatch(loadBookActions.loadAllBooks())
        .then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
    });
    test('should create type: HOME_PAGE_BOOKS_REJECT on request error', () => {
      const error = {
        data: {
          message:
            'Something has gone wrong here'
        }
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 400,
          response: error
        });
      });
      const expectActions = [{
        type: types.HOME_PAGE_BOOKS_REJECT, error
      }];
      const store = mockStore({});

      return store.dispatch(loadBookActions.loadAllBooks()).then(() => {
        expect(store.getActions()).toEqual(expectActions);
      });
    });
  });
});
