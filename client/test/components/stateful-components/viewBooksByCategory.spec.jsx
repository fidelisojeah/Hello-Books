import 'raf/polyfill';
import React from 'react';
import PropTypes from 'prop-types';

import ConnectedViewByCategory, { ViewByCategory } from
  '../../../src/components/pages/ViewByCategory';
import mockStoreData from '../../__mock__/mockStoreData';

jest.mock('react-router-dom');
let store;
describe('ViewByCategory Component', () => {
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
      viewBookByCategory: jest.fn(),
      logout: jest.fn(),
      fetching: false,
      match: {
        params: {}
      }
    };
    test('Should render component with just loading page', () => {
      const wrapper = shallow(
        <ViewByCategory
          match={props.match}
          logout={props.logout}
          clearAllBookState={jest.fn()}
          fetchCategoryList={jest.fn()}
          fetchBooks={props.fetchBooks}
          fetching
          viewBookByCategory={props.viewBookByCategory}
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
        <ViewByCategory
          match={props.match}
          fetchCategoryList={jest.fn()}
          fetching={props.fetching}
          logout={props.logout}
          fetchBooks={props.fetchBooks}
          clearAllBookState={jest.fn()}
          viewBookByCategory={props.viewBookByCategory}
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
          <ViewByCategory
            match={props.match}
            fetching={props.fetching}
            fetchCategoryList={jest.fn()}
            logout={props.logout}
            clearAllBookState={jest.fn()}
            viewBookByCategory={props.viewBookByCategory}
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
            <ViewByCategory
              match={props.match}
              fetching={props.fetching}
              viewBookByCategory={props.viewBookByCategory}
              fetchCategoryList={jest.fn()}
              clearAllBookState={jest.fn()}
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
            <ViewByCategory
              fetching={props.fetching}
              match={props.match}
              logout={props.logout}
              clearAllBookState={jest.fn()}
              fetchCategoryList={jest.fn()}
              viewBookByCategory={props.viewBookByCategory}
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
            <ViewByCategory
              logout={props.logout}
              match={props.match}
              viewBookByCategory={props.viewBookByCategory}
              fetchCategoryList={jest.fn()}
              fetching={props.fetching}
              clearAllBookState={jest.fn()}
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
            <ViewByCategory
              logout={props.logout}
              fetchCategoryList={jest.fn()}
              fetching={props.fetching}
              clearAllBookState={jest.fn()}
              match={props.match}
              viewBookByCategory={props.viewBookByCategory}
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
        const wrapper = mount(<ConnectedViewByCategory
          match={props.match}
          fetching={false}
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
    class ComponentTest extends ViewByCategory {
      constructor(props) {
        super(props);
        this.componentDidMount = componentDidMount;
        this.componentWillReceiveProps = componentWillReceiveProps;
        this.componentWillUnmount = componentWillUnmount;
      }
      render() {
        return (<ViewByCategory {...this.props} />);
      }
    }
    test('Should call Component Did Mount Life Cycle', () => {
      const wrapper = shallow(<ComponentTest
        logout={jest.fn()}
        fetchCategoryList={jest.fn()}
        fetchBooks={jest.fn()}
        fetching={false}
        viewBookByCategory={jest.fn()}
        clearAllBookState={jest.fn()}
        match={{
          params: {}
        }}
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
        fetching={false}
        fetchCategoryList={jest.fn()}
        viewBookByCategory={jest.fn()}
        clearAllBookState={jest.fn()}
        match={{
          params: {}
        }}
      />, options);
      expect(wrapper).toBeDefined();
      expect(wrapper.length).toBe(1);
      wrapper.unmount();
      expect(componentWillUnmount).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
