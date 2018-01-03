
import jwtDecode from 'jwt-decode';

import { userLogin, logout } from '../../src/components/actions/login';
import * as types from '../../src/components/actions/types';


const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoic2FtcGxldXNlciIsImZpcn
N0TmFtZSI6IlNhbXBsZSIsImxhc3ROYW1lIjoiVXNlciIsInJvbGUi
OiJVc2VyIiwiaWF0IjoxNTEzMTc1OTQxLCJleHAiOjE1MTM1MjE1NDF9
.OPD-w85wL8ELcF8xnX7bDHUqA3yISsS3FIehGsrp0v4`;

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
  describe('When Trying to login', () => {
    const data = {
      status: 'Success',
      message: 'Signin Successful',
      token
    };
    test('Should create SET_CURRENT_USER and set token', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 202,
          response: data,
        });
      });
      const store = mockStore({});

      const user = jwtDecode(token);

      const expectActions = [{
        type: types.SET_CURRENT_USER, user
      }];
      return store.dispatch(userLogin({
        username: 'sampleuser',
        password: 'samplePassword'
      }))
        .then(() => {
          expect(store.getActions()).toEqual(expectActions);
          expect(localStorage.jwtToken).toEqual(token);
        });
    });
  });
  describe('When Trying to logout', () => {
    const data = {
      status: 'Success',
      message: 'Logout Successful',
    };
    test('Should create SET_CURRENT_USER and remove token', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data,
        });
      });
      const store = mockStore({});
      const user = {};
      const expectActions = [{
        type: types.SET_CURRENT_USER, user
      }];
      return store.dispatch(logout())
        .then(() => {
          expect(store.getActions()).toEqual(expectActions);
          expect(localStorage.jwtToken).toEqual(undefined);
        });
    });
  });
});
