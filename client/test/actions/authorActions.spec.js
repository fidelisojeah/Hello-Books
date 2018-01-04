
import * as authorHandler from '../../src/components/actions/authorActions';
import * as types from '../../src/components/actions/types';

describe('Author Handling actions', () => {
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
  describe('When trying to create a new author', () => {
    const data = {
      status: 'Success',
      message: 'Author Created Successfully'
    };
    test('Should return a response saying Author added', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: data,
        });
      });
      const store = mockStore({});

      const expectActions = [{
        type: types.AUTHOR_CREATED_SUCCESS
      }];

      return store.dispatch(authorHandler.newAuthorRequest({
        firstname: 'John',
        lastname: 'Doe',
        authorDOB: '1992-01-12'
      }))
        .then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
    });
    test('Should return a response saying Not Allowed', () => {
      const error = {
        data: {
          message: 'Not allowed'
        }
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 401,
          response: error
        });
      });
      const store = mockStore({});
      const expectActions = [{
        type: types.AUTHOR_CREATED_FAILURE, error
      }];
      return store.dispatch(authorHandler.newAuthorRequest({
        firstname: 'John',
        lastname: 'Doe',
        authorDOB: '1992-01-12'
      }))
        .then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
    });
    test('Should return a response saying unAuthenticated', () => {
      const error = {
        data: {
          message: 'Unauthenticated'
        }
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 401,
          response: error
        });
      });
      const expectActions = [{
        type: types.AUTHOR_CREATED_FAILURE, error
      }];

      const store = mockStore({});

      return store.dispatch(authorHandler.newAuthorRequest({
        firstname: 'John',
        lastname: 'Doe',
        authorDOB: '1992-01-12'
      }))
        .then(() => {
          expect(store.getActions()).toEqual(expectActions);
        });
    });
  });
});
