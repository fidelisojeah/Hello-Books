
import { editBook } from '../../src/components/actions/edit-book';
import * as types from '../../src/components/actions/types';

describe('Edit Book actions', () => {
  beforeEach(() => {
    moxios.install();
    document.body.innerHTML = `<div id='site-toastr'>
      <div id='toastr-content'>
      </div>
      `;
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('When trying to Edit a book', () => {
    const data = {
      status: 'Success',
      message: 'Book Details Updated',
      bookUpdate: {
        id: 1,
        bookName: 'Sample Book',
        bookISBN: '1029-1820-1381-11',
        description: 'This is a new description hehe',
        bookImage: 'xyz.jpg',
        publishYear: '2017-01-01T00:00:00.000Z',
        isActive: true,
        createdAt: '2017-12-14T10:07:58.127Z',
        updatedAt: '2017-12-14T10:58:12.828Z'
      }
    };
    test('Should return a Book Edited Successfully', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data,
        });
      });
      const store = mockStore({});

      const response = data;
      const expectActions = [{
        type: types.EDIT_BOOK_COMPLETE, response
      }];
      return store.dispatch(editBook({
        bookname: 'Sample Book'
      }, 1))
        .then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
    });
    test('Should return create EDIT_BOOK_ERROR', () => {
      const error = {
        data: {
          error: 'No Information Supplied'
        }
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 400,
          response: error
        });
      });
      const store = mockStore({});
      const expectActions = [{
        type: types.EDIT_BOOK_ERROR, error
      }];
      return store.dispatch(editBook())
        .then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
    });
  });
});
