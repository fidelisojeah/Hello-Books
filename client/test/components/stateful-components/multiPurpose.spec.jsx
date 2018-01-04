import 'raf/polyfill';
import React from 'react';
import PropTypes from 'prop-types';

import ConnectedMultiPurpose, { MultiPurpose } from
  '../../../src/components/pages/MultiPurpose';
import mockStoreData from '../../__mock__/mockStoreData';

jest.mock('react-router-dom');
let store;
describe('MultiPurpose Component', () => {
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
    store = mockStore({});
  });
  const props = {
    userLogin: jest.fn(),
    resendActivation: jest.fn(),
    verifyUser: jest.fn(),
    error: {},
    message: {
      message: 'Verification Okay'
    },
    match: {
      params: {
      }
    },
    location: {
      search: ''
    },
    isAuthenticated: false
  };
  describe('Non Life Cycle Tests', () => {
    test('Should render Not found component on nothing found', () => {
      const wrapper = shallow(
        <MultiPurpose
          {...props}
        />,
        options
      );
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    describe('Test Connected Component', () => {
      beforeEach(() => {
        store = mockStore(mockStoreData);
      });
      test('Should mount connnected component', () => {
        const wrapper = mount(<ConnectedMultiPurpose
          {...props}
          store={store}
        />,
          options
        );
        expect(wrapper).toBeDefined();
        expect(wrapper.length).toBe(1);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
