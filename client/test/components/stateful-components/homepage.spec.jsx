import 'raf/polyfill';
import React from 'react';
import PropTypes from 'prop-types';

import ConnectedLogIndex, { LogIndex } from
  '../../../src/components/pages/LogIndex';
import mockStoreData from '../../__mock__/mockStoreData';

jest.mock('react-router-dom');
let store;
describe('LogIndex Component', () => {
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
  describe('Non Life Cycle Tests', () => {
    const props = {
      loadAllBooks: jest.fn(),
      logout: jest.fn(),
      fetchCategoryList: jest.fn(),
    };
    test('Should render component with just loading page', () => {
      const wrapper = shallow(
        <LogIndex
          logout={props.logout}
          loadAllBooks={props.loadAllBooks}
          fetchCategoryList={props.fetchCategoryList}
        />,
        options
      );
      expect(wrapper).toBeDefined();
      expect(props.loadAllBooks).toHaveBeenCalled();
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('Should render component with 504 error', () => {
      jest.useFakeTimers();
      const wrapper = shallow(
        <LogIndex
          logout={props.logout}
          fetchCategoryList={props.fetchCategoryList}
          loadAllBooks={props.loadAllBooks}
        />,
        options
      );
      wrapper.setProps({
        error: {
          status: 504
        }
      });
      jest.runOnlyPendingTimers();
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(props.loadAllBooks).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
    test('Should render component and logout on unauthenticated error',
      () => {
        const wrapper = shallow(
          <LogIndex
            logout={props.logout}
            loadAllBooks={props.loadAllBooks}
            fetchCategoryList={props.fetchCategoryList}
          />,
          options
        );
        wrapper.setProps({
          error: {
            message: 'unauthenticated'
          }
        });
        expect(wrapper).toBeDefined();
        expect(wrapper.length).toBe(1);
        expect(props.logout).toHaveBeenCalled();
        expect(wrapper).toMatchSnapshot();
      });
    describe('Fully loaded component', () => {
      test('Should fully render component ',
        () => {
          const wrapper = mount(
            <LogIndex
              logout={props.logout}
              loadAllBooks={props.loadAllBooks}
              fetchCategoryList={props.fetchCategoryList}
            />,
            options
          );
          wrapper.setProps({
            ratedBooks:
              mockStoreData
                .homeBooksReducer
                .ratedBooks,
            byLendingBooks:
              mockStoreData
                .homeBooksReducer
                .byLendingBooks
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate right click on rated',
        () => {
          const wrapper = mount(
            <LogIndex
              logout={props.logout}
              loadAllBooks={props.loadAllBooks}
              fetchCategoryList={props.fetchCategoryList}
            />,
            options
          );
          wrapper.setProps({
            ratedBooks:
              mockStoreData
                .homeBooksReducer.ratedBooks,
            byLendingBooks:
              mockStoreData
                .homeBooksReducer
                .byLendingBooks
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper.find('#rate-right').simulate('click');
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate left click on rated',
        () => {
          const wrapper = mount(
            <LogIndex
              logout={props.logout}
              loadAllBooks={props.loadAllBooks}
              fetchCategoryList={props.fetchCategoryList}
            />,
            options
          );
          wrapper.setProps({
            ratedBooks:
              mockStoreData
                .homeBooksReducer.ratedBooks,
            byLendingBooks:
              mockStoreData
                .homeBooksReducer
                .byLendingBooks
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper.find('#rate-left').simulate('click');
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate right click on top pick',
        () => {
          const wrapper = mount(
            <LogIndex
              logout={props.logout}
              fetchCategoryList={props.fetchCategoryList}
              loadAllBooks={props.loadAllBooks}
            />,
            options
          );
          wrapper.setProps({
            ratedBooks:
              mockStoreData
                .homeBooksReducer.ratedBooks,
            byLendingBooks:
              mockStoreData
                .homeBooksReducer
                .byLendingBooks
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper.find('#lend-right').simulate('click');
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate left click on top picks',
        () => {
          const wrapper = mount(
            <LogIndex
              logout={props.logout}
              fetchCategoryList={props.fetchCategoryList}
              loadAllBooks={props.loadAllBooks}
            />,
            options
          );
          wrapper.setProps({
            ratedBooks:
              mockStoreData
                .homeBooksReducer.ratedBooks,
            byLendingBooks:
              mockStoreData
                .homeBooksReducer
                .byLendingBooks
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper.find('#lend-left').simulate('click');
          expect(wrapper).toMatchSnapshot();
        });
    });
    describe('Test Connected Component', () => {
      beforeEach(() => {
        store = mockStore(mockStoreData);
      });
      test('Should mount connnected component', () => {
        const wrapper = mount(<ConnectedLogIndex
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

  describe('Full Componnet Life Cycle Calls', () => {
    const componentDidMount = jest.fn();
    const componentWillReceiveProps = jest.fn();
    const componentWillUnmount = jest.fn();
    class ComponentTest extends LogIndex {
      constructor(props) {
        super(props);
        this.componentDidMount = componentDidMount;
        this.componentWillReceiveProps = componentWillReceiveProps;
        this.componentWillUnmount = componentWillUnmount;
      }
      render() {
        return (<LogIndex {...this.props} />);
      }
    }
    test('Should call Component Did Mount Life Cycle', () => {
      const wrapper = shallow(<ComponentTest
        logout={jest.fn()}
        fetchCategoryList={jest.fn()}
        loadAllBooks={jest.fn()}
      />, options);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(componentDidMount).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
    test('Should call Component will unmount Life Cycle', () => {
      const wrapper = mount(<ComponentTest
        logout={jest.fn()}
        fetchCategoryList={jest.fn()}
        loadAllBooks={jest.fn()}
      />, options);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      wrapper.unmount();
      expect(componentWillUnmount).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
