import 'raf/polyfill';
import React from 'react';
import PropTypes from 'prop-types';

import ConnectedViewAllBooks, { ViewAllBooks } from
  '../../../src/components/pages/ViewAllBooks';
import mockStoreData from '../../__mock__/mockStoreData';

jest.mock('react-router-dom');
let store;
describe('ViewAllBooks Component', () => {
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
      fetchBooks: jest.fn(),
      logout: jest.fn(),
      clearAllBookState: jest.fn()
    };
    test('Should render component with just loading page', () => {
      const wrapper = shallow(
        <ViewAllBooks
          logout={props.logout}
          fetchBooks={props.fetchBooks}
          clearAllBookState={props.clearAllBookState}
        />,
        options
      );
      expect(wrapper).toBeDefined();
      expect(props.fetchBooks).toHaveBeenCalled();
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('Should render component with 504 error', () => {
      jest.useFakeTimers();
      const wrapper = shallow(
        <ViewAllBooks
          logout={props.logout}
          clearAllBookState={props.clearAllBookState}
          fetchBooks={props.fetchBooks}
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
      expect(props.fetchBooks).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
    test('Should render component and logout on unauthenticated error',
      () => {
        const wrapper = shallow(
          <ViewAllBooks
            logout={props.logout}
            clearAllBookState={props.clearAllBookState}
            fetchBooks={props.fetchBooks}
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
            <ViewAllBooks
              clearAllBookState={props.clearAllBookState}
              logout={props.logout}
              fetchBooks={props.fetchBooks}
            />,
            options
          );
          wrapper.setProps({
            allBooks:
              mockStoreData
                .bookReducer
                .fetchedBooks
                .bookLists,
            totalPages:
              mockStoreData
                .bookReducer
                .fetchedBooks.totalPages,
            totalBooks:
              mockStoreData
                .bookReducer
                .fetchedBooks
                .totalBooksCount
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate sorting click ',
        () => {
          const wrapper = mount(
            <ViewAllBooks
              clearAllBookState={props.clearAllBookState}
              logout={props.logout}
              fetchBooks={props.fetchBooks}
            />,
            options
          );
          wrapper.setProps({
            allBooks:
              mockStoreData
                .bookReducer
                .fetchedBooks
                .bookLists,
            totalPages:
              mockStoreData
                .bookReducer
                .fetchedBooks.totalPages,
            totalBooks:
              mockStoreData
                .bookReducer
                .fetchedBooks
                .totalBooksCount
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper.find('.c-right a').last().simulate('click');
          expect(wrapper.state('sort')).toEqual('alphabetical');
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate Page Change click ',
        () => {
          const wrapper = mount(
            <ViewAllBooks
              logout={props.logout}
              clearAllBookState={props.clearAllBookState}
              fetchBooks={props.fetchBooks}
            />,
            options
          );
          wrapper.setProps({
            allBooks:
              mockStoreData
                .bookReducer
                .fetchedBooks
                .bookLists,
            totalPages:
              3,
            totalBooks:
              mockStoreData
                .bookReducer
                .fetchedBooks
                .totalBooksCount
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper
            .find('.pagination-div .navigation').last()
            .simulate('click');
          expect(wrapper.state('page')).toEqual(2);
          expect(wrapper).toMatchSnapshot();
        });
      test('Should simulate Limit Change click ',
        () => {
          const wrapper = mount(
            <ViewAllBooks
              logout={props.logout}
              clearAllBookState={props.clearAllBookState}
              fetchBooks={props.fetchBooks}
            />,
            options
          );
          wrapper.setProps({
            allBooks:
              mockStoreData
                .bookReducer
                .fetchedBooks
                .bookLists,
            totalPages:
              3,
            totalBooks:
              mockStoreData
                .bookReducer
                .fetchedBooks
                .totalBooksCount
          });
          expect(wrapper).toBeDefined();
          expect(wrapper.length).toBe(1);
          wrapper.find('#pp100').last().simulate('click');
          expect(wrapper.state('limit')).toEqual(100);
          expect(wrapper).toMatchSnapshot();
        });
    });
    describe('Test Connected Component', () => {
      beforeEach(() => {
        store = mockStore(mockStoreData);
      });
      test('Should mount connnected component', () => {
        const wrapper = mount(<ConnectedViewAllBooks
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
    class ComponentTest extends ViewAllBooks {
      constructor(props) {
        super(props);
        this.componentDidMount = componentDidMount;
        this.componentWillReceiveProps = componentWillReceiveProps;
        this.componentWillUnmount = componentWillUnmount;
      }
      render() {
        return (<ViewAllBooks {...this.props} />);
      }
    }
    test('Should call Component Did Mount Life Cycle', () => {
      const wrapper = shallow(<ComponentTest
        logout={jest.fn()}
        fetchBooks={jest.fn()}
        clearAllBookState={jest.fn()}
      />, options);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      expect(componentDidMount).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
    test('Should call Component will unmount Life Cycle', () => {
      const wrapper = mount(<ComponentTest
        logout={jest.fn()}
        fetchBooks={jest.fn()}
        clearAllBookState={jest.fn()}
      />, options);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      wrapper.unmount();
      expect(componentWillUnmount).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
