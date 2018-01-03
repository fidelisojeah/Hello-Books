import 'raf/polyfill';
import React from 'react';
import PropTypes from 'prop-types';

import ConnectedLoginPage, { LoginPage } from
  '../../../src/components/pages/LoginPage';
import { userSignupRequest, isUserExists } from
  '../../../src/components/actions/signupActions';
import { userLogin } from
  '../../../src/components/actions/login';
import mockStoreData from '../../__mock__/mockStoreData';

jest.mock('react-router-dom');
let store;
describe('LoginPage Component', () => {
  const options = {
    context: {
      router: {
        history: [
          '/home'
        ]
      }
    },
    childContextTypes: {
      router: PropTypes.object.isRequired
    }
  };
  beforeEach(() => {
    document.body.innerHTML = toastrMock;
    store = mockStore({});
  });
  describe('Non Life Cycle Tests', () => {
    test('Should render component Normally', () => {
      const wrapper = shallow(
        <LoginPage
          userLogin={userLogin}
          isUserExists={isUserExists}
          userSignupRequest={userSignupRequest}
        />,
        options
      );
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('Should render component and change page if authenticated',
      () => {
        const wrapper = shallow(
          <LoginPage
            isAuthenticated
            userLogin={userLogin}
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest}
          />,
          options
        );
        wrapper.setProps({
          isAuthenticated: true,
          error: {}
        });
        expect(wrapper).toBeDefined();
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      });
    describe('COnnected Component', () => {
      test('Should fully render component ',
        () => {
          const wrapper = mount(
            <LoginPage
              userLogin={userLogin}
              isUserExists={isUserExists}
              userSignupRequest={userSignupRequest}
            />,
            options
          );
          wrapper.setProps({
            error: {},
            isAuthenticated: false
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          expect(wrapper).toMatchSnapshot();
        });
    });
    describe('Fully loaded component', () => {
      beforeEach(() => {
        store = mockStore(mockStoreData);
      });
      test('Should fully render component ',
        () => {
          const wrapper = mount(
            <ConnectedLoginPage
              userLogin={userLogin}
              isUserExists={isUserExists}
              userSignupRequest={userSignupRequest}
              store={store}
            />,
            options
          );
          wrapper.setProps({
            error: {},
            isAuthenticated: false
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate user Signin email verification', () => {
        const wrapper = mount(
          <LoginPage
            userLogin={userLogin}
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest}
          />,
          options
        );
        wrapper.setProps({
          error: {
            message: 'Email Address not Verified'
          },
          isAuthenticated: false
        });
        expect(wrapper).toBeDefined();
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      });
      test('Should simulate redirect to previous page on successful',
        () => {
          const wrapper = mount(
            <LoginPage
              userLogin={userLogin}
              isUserExists={isUserExists}
              userSignupRequest={userSignupRequest}
              locationHistory={{
                from: {
                  pathname: '/signin'
                }
              }}
            />,
            options
          );
          wrapper.setProps({
            error: {},
            isAuthenticated: true
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate clicking signup tab', () => {
        const wrapper = mount(
          <LoginPage
            userLogin={userLogin}
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest}
          />,
          options
        );
        wrapper.setProps({
          error: {},
          isAuthenticated: false
        });
        expect(wrapper).toBeDefined();
        expect(wrapper.length).toBe(1);
        expect(wrapper.state('currentTab')).toEqual('sign-in');
        wrapper.find('#sign-up').simulate('click');
        expect(wrapper.state('currentTab')).toEqual('sign-up');
        expect(wrapper).toMatchSnapshot();
      });
      test('Should simulate clicking signin tab', () => {
        const wrapper = mount(
          <LoginPage
            userLogin={userLogin}
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest}
          />,
          options
        );
        wrapper.setProps({
          error: {},
          isAuthenticated: false
        });
        expect(wrapper).toBeDefined();
        expect(wrapper.length).toBe(1);
        expect(wrapper.state('currentTab')).toEqual('sign-in');
        wrapper.find('#sign-in').simulate('click');
        expect(wrapper.state('currentTab')).toEqual('sign-in');
        expect(wrapper).toMatchSnapshot();
      });
      test('Should simulate typing username', () => {
        const wrapper = mount(
          <LoginPage
            userLogin={userLogin}
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest}
          />,
          options
        );
        wrapper.setProps({
          error: {},
          isAuthenticated: false
        });
        expect(wrapper).toBeDefined();
        expect(wrapper.length).toBe(1);
        wrapper
          .find('#signInUsername')
          .simulate('change',
          {
            target:
              { name: 'signInUsername', value: 'newUsername' }
          });
        expect(wrapper.state('signInUsername')).toEqual('newUsername');
        expect(wrapper).toMatchSnapshot();
      });
      test('Should simulate password too short error',
        () => {
          const wrapper = mount(
            <LoginPage
              userLogin={userLogin}
              isUserExists={isUserExists}
              userSignupRequest={userSignupRequest}
            />,
            options
          );
          wrapper.setProps({
            error: {},
            isAuthenticated: false
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper
            .find('#signUpPassword')
            .simulate('change',
            {
              target:
                { name: 'signUpPassword', value: 's' }
            });
          wrapper
            .find('#signUpPassword').simulate('blur');
          expect(wrapper.state('invalid')).toBe(true);
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate password of correct length',
        () => {
          const wrapper = mount(
            <LoginPage
              userLogin={userLogin}
              isUserExists={isUserExists}
              userSignupRequest={userSignupRequest}
            />,
            options
          );
          wrapper.setProps({
            error: {},
            isAuthenticated: false
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper
            .find('#signUpPassword')
            .simulate('change',
            {
              target:
                { name: 'signUpPassword', value: 'lengthypassword' }
            });
          wrapper
            .find('#signUpPassword').simulate('blur');
          expect(wrapper.state('invalid')).toBe(false);
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate confirm password mixmatch',
        () => {
          const wrapper = mount(
            <LoginPage
              userLogin={userLogin}
              isUserExists={isUserExists}
              userSignupRequest={userSignupRequest}
            />,
            options
          );
          wrapper.setProps({
            error: {},
            isAuthenticated: false
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper
            .find('#signUpPassword')
            .simulate('change',
            {
              target:
                { name: 'signUpPassword', value: 'newpassword' }
            });
          wrapper
            .find('#signUpPassword')
            .simulate('change',
            {
              target:
                { name: 'passwordConfirmation', value: 'wrong' }
            });
          wrapper
            .find('#passwordConfirmation').simulate('blur');
          expect(wrapper.state('invalid')).toBe(true);
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate confirm password match',
        () => {
          const wrapper = mount(
            <LoginPage
              userLogin={userLogin}
              isUserExists={isUserExists}
              userSignupRequest={userSignupRequest}
            />,
            options
          );
          wrapper.setProps({
            error: {},
            isAuthenticated: false
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper
            .find('#signUpPassword')
            .simulate('change',
            {
              target: {
                name: 'signUpPassword',
                value: 'lengthypassword'
              }
            });
          wrapper
            .find('#passwordConfirmation')
            .simulate('change',
            {
              target: {
                name: 'passwordConfirmation',
                value: 'lengthypassword'
              }
            });
          wrapper
            .find('#passwordConfirmation').simulate('blur');
          expect(wrapper.state('invalid')).toBe(false);
          expect(wrapper).toMatchSnapshot();
        });

      test('Should check User Existing Error',
        () => {
          const checkExists = () => {
            return new Promise((resolve) => {
              resolve({
                data: {
                  userHere: 'true'
                }
              });
            });
          };
          const wrapper = mount(
            <LoginPage
              userLogin={userLogin}
              isUserExists={checkExists}
              userSignupRequest={userSignupRequest}
            />,
            options
          );
          wrapper.setProps({
            error: {},
            isAuthenticated: false
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper
            .find('#signUpUsername')
            .simulate('change',
            {
              target: {
                name: 'signUpUsername',
                value: 'newuser'
              }
            });

          wrapper
            .find('#signUpUsername').simulate('blur');
          expect(wrapper).toMatchSnapshot();
        });
      test('Should check User Not Existing',
        () => {
          const checkExists = () => {
            return new Promise((resolve) => {
              resolve({
                data: {
                  message: 'stuff'
                }
              });
            });
          };
          const wrapper = mount(
            <LoginPage
              userLogin={userLogin}
              isUserExists={checkExists}
              userSignupRequest={userSignupRequest}
            />,
            options
          );
          wrapper.setProps({
            error: {},
            isAuthenticated: false
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper
            .find('#signUpUsername')
            .simulate('change',
            {
              target: {
                name: 'signUpUsername',
                value: 'newusername'
              }
            });
          wrapper
            .find('#signUpUsername').simulate('blur');
          expect(wrapper.state('invalid')).toBe(false);
          expect(wrapper).toMatchSnapshot();
        });
      describe('On SignIn', () => {
        const checkExists = jest.fn();
        test('Signin Errors on validation errors (username null)',
          () => {
            const wrapper = mount(
              <LoginPage
                userLogin={userLogin}
                isUserExists={checkExists}
                userSignupRequest={userSignupRequest}
              />,
              options
            );
            wrapper.setProps({
              error: {},
              isAuthenticated: false
            });
            expect(wrapper).toBeDefined();
            expect(wrapper.length).toBe(1);
            wrapper
              .find('#sign-in-container form')
              .simulate('submit');

            expect(wrapper).toMatchSnapshot();
          });
        test('Signin Errors on validation errors (username short)',
          () => {
            const wrapper = mount(
              <LoginPage
                userLogin={userLogin}
                isUserExists={checkExists}
                userSignupRequest={userSignupRequest}
              />,
              options
            );
            wrapper.setProps({
              error: {},
              isAuthenticated: false
            });
            expect(wrapper).toBeDefined();
            expect(wrapper.length).toBe(1);
            wrapper
              .find('#signInUsername')
              .simulate('change',
              {
                target: {
                  name: 'signInUsername',
                  value: 'a'
                }
              });
            wrapper
              .find('#sign-in-container form')
              .simulate('submit');

            expect(wrapper).toMatchSnapshot();
          });
        test('Signin Errors on validation errors (password null)',
          () => {
            const wrapper = mount(
              <LoginPage
                userLogin={userLogin}
                isUserExists={checkExists}
                userSignupRequest={userSignupRequest}
              />,
              options
            );
            wrapper.setProps({
              error: {},
              isAuthenticated: false
            });
            expect(wrapper).toBeDefined();
            expect(wrapper.length).toBe(1);
            wrapper
              .find('#signInUsername')
              .simulate('change',
              {
                target: {
                  name: 'signInUsername',
                  value: 'validUsername'
                }
              });
            wrapper
              .find('#sign-in-container form')
              .simulate('submit');

            expect(wrapper).toMatchSnapshot();
          });
        test('Signin Errors on validation errors (password short)',
          () => {
            const wrapper = mount(
              <LoginPage
                userLogin={userLogin}
                isUserExists={checkExists}
                userSignupRequest={userSignupRequest}
              />,
              options
            );
            wrapper.setProps({
              error: {},
              isAuthenticated: false
            });
            expect(wrapper).toBeDefined();
            expect(wrapper.length).toBe(1);
            wrapper
              .find('#signInUsername')
              .simulate('change',
              {
                target: {
                  name: 'signInUsername',
                  value: 'validUsername'
                }
              });
            wrapper
              .find('#signInPassword')
              .simulate('change',
              {
                target: {
                  name: 'signInPassword',
                  value: 'a'
                }
              });
            wrapper
              .find('#sign-in-container form')
              .simulate('submit');

            expect(wrapper).toMatchSnapshot();
          });
      });
      describe('On SignUp', () => {
        const checkExists = jest.fn();
        test('SignUp Errors on validation errors (password mixmatch)',
          () => {
            const wrapper = mount(
              <LoginPage
                userLogin={userLogin}
                isUserExists={checkExists}
                userSignupRequest={userSignupRequest}
              />,
              options
            );
            wrapper.setProps({
              error: {},
              isAuthenticated: false
            });
            expect(wrapper).toBeDefined();
            expect(wrapper.length).toBe(1);
            wrapper
              .find('#signUpPassword')
              .simulate('change',
              {
                target: {
                  name: 'signUpPassword',
                  value: 'newPassword'
                }
              });
            wrapper
              .find('#passwordConfirmation')
              .simulate('change',
              {
                target: {
                  name: 'passwordConfirmation',
                  value: 'wrongPassword'
                }
              });
            wrapper
              .find('#sign-up-container form')
              .simulate('submit');
            expect(wrapper.state('invalid')).toBe(true);
            expect(wrapper
              .state('signUpError'))
              .toHaveProperty('signUpPassword');
            expect(wrapper
              .state('signUpError'))
              .toHaveProperty('passwordConfirmation');
            expect(wrapper).toMatchSnapshot();
          });
        test('SignUp Errors on validation errors (No Firstname)',
          () => {
            const wrapper = mount(
              <LoginPage
                userLogin={userLogin}
                isUserExists={checkExists}
                userSignupRequest={userSignupRequest}
              />,
              options
            );
            wrapper.setProps({
              error: {},
              isAuthenticated: false
            });
            expect(wrapper).toBeDefined();
            expect(wrapper.length).toBe(1);
            wrapper
              .find('#signUpPassword')
              .simulate('change',
              {
                target: {
                  name: 'signUpPassword',
                  value: 'newPassword'
                }
              });
            wrapper
              .find('#passwordConfirmation')
              .simulate('change',
              {
                target: {
                  name: 'passwordConfirmation',
                  value: 'newPassword'
                }
              });
            wrapper
              .find('#sign-up-container form')
              .simulate('submit');

            expect(wrapper).toMatchSnapshot();
          });
        test('SignUp Errors on validation errors (short firstname)',
          () => {
            const wrapper = mount(
              <LoginPage
                userLogin={userLogin}
                isUserExists={checkExists}
                userSignupRequest={userSignupRequest}
              />,
              options
            );
            wrapper.setProps({
              error: {},
              isAuthenticated: false
            });
            expect(wrapper).toBeDefined();
            expect(wrapper.length).toBe(1);
            wrapper
              .find('#signUpPassword')
              .simulate('change',
              {
                target: {
                  name: 'signUpPassword',
                  value: 'newPassword'
                }
              });
            wrapper
              .find('#passwordConfirmation')
              .simulate('change',
              {
                target: {
                  name: 'passwordConfirmation',
                  value: 'newPassword'
                }
              });
            wrapper
              .find('#firstname')
              .simulate('change',
              {
                target: {
                  name: 'firstname',
                  value: 'a'
                }
              });
            wrapper
              .find('#sign-up-container form')
              .simulate('submit');

            expect(wrapper).toMatchSnapshot();
          });
        test('SignUp Errors on validation errors (No Lastname)',
          () => {
            const wrapper = mount(
              <LoginPage
                userLogin={userLogin}
                isUserExists={checkExists}
                userSignupRequest={userSignupRequest}
              />,
              options
            );
            wrapper.setProps({
              error: {},
              isAuthenticated: false
            });
            expect(wrapper).toBeDefined();
            expect(wrapper.length).toBe(1);
            wrapper
              .find('#signUpPassword')
              .simulate('change',
              {
                target: {
                  name: 'signUpPassword',
                  value: 'newPassword'
                }
              });
            wrapper
              .find('#passwordConfirmation')
              .simulate('change',
              {
                target: {
                  name: 'passwordConfirmation',
                  value: 'newPassword'
                }
              });
            wrapper
              .find('#firstname')
              .simulate('change',
              {
                target: {
                  name: 'firstname',
                  value: 'firstname'
                }
              });
            wrapper
              .find('#sign-up-container form')
              .simulate('submit');

            expect(wrapper).toMatchSnapshot();
          });
        test('SignUp Errors on validation errors (short Lastname)',
          () => {
            const wrapper = mount(
              <LoginPage
                userLogin={userLogin}
                isUserExists={checkExists}
                userSignupRequest={userSignupRequest}
              />,
              options
            );
            wrapper.setProps({
              error: {},
              isAuthenticated: false
            });
            expect(wrapper).toBeDefined();
            expect(wrapper.length).toBe(1);
            wrapper
              .find('#signUpPassword')
              .simulate('change',
              {
                target: {
                  name: 'signUpPassword',
                  value: 'newPassword'
                }
              });
            wrapper
              .find('#passwordConfirmation')
              .simulate('change',
              {
                target: {
                  name: 'passwordConfirmation',
                  value: 'newPassword'
                }
              });
            wrapper
              .find('#firstname')
              .simulate('change',
              {
                target: {
                  name: 'firstname',
                  value: 'firstname'
                }
              });
            wrapper
              .find('#lastname')
              .simulate('change',
              {
                target: {
                  name: 'lastname',
                  value: 'a'
                }
              });
            wrapper
              .find('#sign-up-container form')
              .simulate('submit');

            expect(wrapper).toMatchSnapshot();
          });
      });
      describe('Test Connected Component', () => {
        beforeEach(() => {
          store = mockStore(mockStoreData);
        });
      });
    });
  });
});
