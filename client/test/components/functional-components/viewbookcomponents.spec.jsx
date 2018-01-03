import React from 'react';
import 'raf/polyfill';

import BookModal from
  '../../../src/components/view-book-components/BookModal';
import BorrowBookModule from
  '../../../src/components/view-book-components/BorrowBookModule';
import EditBar from
  '../../../src/components/view-book-components/EditBar';
import MainSection from
  '../../../src/components/view-book-components/MainSection';
import MiddleSector from
  '../../../src/components/view-book-components/MiddleSector';
import ViewBookInfoCard from
  '../../../src/components/view-book-components/ViewBookInfoCard';

import {
  forBookModal,
  todayDate
} from
  '../../../src/components/common/calculate-moment';

describe('BookModal Component', () => {
  const handleDateChange = jest.fn();
  const handleBorrowBook = jest.fn();
  describe('when Available books is less than 1', () => {
    test('should render component', () => {
      const wrapper = shallow(<BookModal
        availableBorrow={0}
        startDate={todayDate()}
        minDate={forBookModal().minDate}
        maxDate={forBookModal().maxDate}
        handleDateChange={handleDateChange}
        handleBorrowBook={handleBorrowBook}
      />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when Available books is greater than 1', () => {
    test('should render component', () => {
      const wrapper = shallow(<BookModal
        availableBorrow={3}
        startDate={todayDate()}
        minDate={forBookModal().minDate}
        maxDate={forBookModal().maxDate}
        handleDateChange={handleDateChange}
        handleBorrowBook={handleBorrowBook}
      />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should render component and click borrow', () => {
      const wrapper = shallow(<BookModal
        availableBorrow={3}
        startDate={todayDate()}
        minDate={forBookModal().minDate}
        maxDate={forBookModal().maxDate}
        handleDateChange={handleDateChange}
        handleBorrowBook={handleBorrowBook}
      />);
      expect(wrapper.length).toBe(1);
      wrapper.find('.borrow-button button').simulate('click');
      expect(handleBorrowBook).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('BorrowBookModule Component', () => {
  const borrowBookClick = jest.fn();
  const editFunction = jest.fn();
  describe('When is Admin', () => {
    test('should render component', () => {
      const wrapper = shallow(<BorrowBookModule
        bookQuantity={1}
        borrowBookClick={borrowBookClick}
        editFunction={editFunction}
        isAdmin
      />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should simulate Edit button click', () => {
      const wrapper = shallow(<BorrowBookModule
        bookQuantity={1}
        borrowBookClick={borrowBookClick}
        editFunction={editFunction}
        isAdmin
      />);
      expect(wrapper.length).toBe(1);
      wrapper.find('.box-button button').simulate('click');
      expect(editFunction).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When Not Admin', () => {
    test('should render component', () => {
      const wrapper = shallow(<BorrowBookModule
        bookQuantity={0}
        borrowBookClick={borrowBookClick}
        editFunction={editFunction}
        isAdmin={false}
      />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('should simulate Borrow button click', () => {
      const wrapper = shallow(<BorrowBookModule
        bookQuantity={1}
        borrowBookClick={borrowBookClick}
        editFunction={editFunction}
        isAdmin={false}
      />);
      expect(wrapper.length).toBe(1);
      wrapper.find('.box-button button').simulate('click');
      expect(borrowBookClick).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
describe('EditBar Component', () => {
  const editFunction = jest.fn();

  test('should render component', () => {
    const wrapper = shallow(<EditBar
      element="ISBN"
      elementName="ISBN"
      editFunction={editFunction}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should simulate edit icon click', () => {
    const wrapper = shallow(<EditBar
      element="ISBN"
      elementName="ISBN"
      editFunction={editFunction}
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('.edit-icon').simulate('click');
    expect(editFunction).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
describe('MainSection Component', () => {
  const props = {
    authorList: [],
    bookDescription: 'Some very random description',
    bookImageURL: 'xyz..jpg',
    bookQuantity: 3,
    bookTitle: 'John Doe\'s Book',
    borrowBookClick: jest.fn(),
    descriptionHeight: 200,
    editFunction: jest.fn(),
    expandCollapseDescription: jest.fn(),
    expanded: false,
    isAdmin: true,
    ISBN: '0-123-456-7-89-0',
    publishYear: '1989',
    ratingCount: 5,
    ratingSum: '420',
  };
  test('Should render component', () => {
    const wrapper = shallow(<MainSection
      publishYear={props.publishYear}
      bookImageURL={props.bookImageURL}
      bookTitle={props.bookTitle}
      ratingCount={props.ratingCount}
      ratingSum={props.ratingSum}
      isAdmin={props.isAdmin}
      ISBN={props.ISBN}
      editFunction={props.editFunction}
      bookQuantity={props.bookQuantity}
      borrowBookClick={props.borrowBookClick}
      authorList={props.authorList}
      bookDescription={props.bookDescription}
      descriptionHeight={props.descriptionHeight}
      expanded={props.expanded}
      expandCollapseDescription={props.expandCollapseDescription}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper
      .find('#description-toggle')
      .hasClass('-expand'))
      .toBe(false);
    expect(wrapper
      .find('#description-toggle')
      .hasClass('-collapse'))
      .toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render component with expanded description icon', () => {
    const wrapper = shallow(<MainSection
      publishYear={props.publishYear}
      bookImageURL={props.bookImageURL}
      bookTitle={props.bookTitle}
      ratingCount={props.ratingCount}
      ratingSum={props.ratingSum}
      isAdmin={props.isAdmin}
      ISBN={props.ISBN}
      editFunction={props.editFunction}
      bookQuantity={props.bookQuantity}
      borrowBookClick={props.borrowBookClick}
      authorList={props.authorList}
      bookDescription={props.bookDescription}
      descriptionHeight={300}
      expanded={props.expanded}
      expandCollapseDescription={props.expandCollapseDescription}
    />);
    expect(wrapper.length).toBe(1);
    expect(
      wrapper
        .find('#description-toggle')
        .hasClass('-expand'))
      .toBe(true);
    expect(
      wrapper
        .find('#description-toggle')
        .hasClass('-collapse'))
      .toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render component with collapsed description icon', () => {
    const wrapper = shallow(<MainSection
      publishYear={props.publishYear}
      bookImageURL={props.bookImageURL}
      bookTitle={props.bookTitle}
      ratingCount={props.ratingCount}
      ratingSum={props.ratingSum}
      isAdmin={props.isAdmin}
      ISBN={props.ISBN}
      editFunction={props.editFunction}
      bookQuantity={props.bookQuantity}
      borrowBookClick={props.borrowBookClick}
      authorList={props.authorList}
      bookDescription={props.bookDescription}
      descriptionHeight={300}
      expanded
      expandCollapseDescription={props.expandCollapseDescription}
    />);
    expect(wrapper.length).toBe(1);
    expect(
      wrapper
        .find('#description-toggle')
        .hasClass('-expand'))
      .toBe(false);
    expect(
      wrapper
        .find('#description-toggle')
        .hasClass('-collapse'))
      .toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should simulate description toggle', () => {
    const wrapper = shallow(<MainSection
      publishYear={props.publishYear}
      bookImageURL={props.bookImageURL}
      bookTitle={props.bookTitle}
      ratingCount={props.ratingCount}
      ratingSum={props.ratingSum}
      isAdmin={props.isAdmin}
      ISBN={props.ISBN}
      editFunction={props.editFunction}
      bookQuantity={props.bookQuantity}
      borrowBookClick={props.borrowBookClick}
      authorList={props.authorList}
      bookDescription={props.bookDescription}
      descriptionHeight={300}
      expanded
      expandCollapseDescription={props.expandCollapseDescription}
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('#description-toggle').simulate('click');
    expect(props.expandCollapseDescription).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
describe('MiddleSector Component', () => {
  const props = {
    borrowedBooksCount: 0,
    borrowed: '2017-12-14T11:59:35.883Z',
    reviewFunction: jest.fn(),
    borrowedBooks: [{
      id: 1,
      dueDate: '2018-01-01T00:00:00.000Z',
      actualReturnDate: '2017-12-14T18:26:49.552Z'
    },
    {
      id: 2,
      dueDate: '2018-01-01T00:00:00.000Z',
      actualReturnDate: null
    }]
  };
  test('Should render component', () => {
    const wrapper = shallow(<MiddleSector
      borrowCount={props.borrowedBooksCount}
      borrowed={props.borrowed}
      reviewFunction={props.reviewFunction}
      borrowList={props.borrowedBooks}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render component empty borrow list', () => {
    const wrapper = shallow(<MiddleSector
      borrowCount={props.borrowedBooksCount}
      borrowed={props.borrowed}
      reviewFunction={props.reviewFunction}
      borrowList={null}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render component with multiple borrow count', () => {
    const wrapper = shallow(<MiddleSector
      borrowCount={3}
      borrowed={props.borrowed}
      reviewFunction={props.reviewFunction}
      borrowList={props.borrowedBooks}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should simulate review click function', () => {
    const wrapper = shallow(<MiddleSector
      borrowCount={1}
      borrowed={props.borrowed}
      reviewFunction={props.reviewFunction}
      borrowList={props.borrowedBooks}
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('.book-times-review').simulate('click');
    expect(props.reviewFunction).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
describe('ViewBookInfoCard Component', () => {
  const props = {
    bookImageURL: 'xyz.jpg',
    bookTitle: 'Sample Book',
    editFunction: jest.fn(),
    isAdmin: true,
    ISBN: '1-023-4567-9-8',
    publishYear: '1992-01-01',
    ratingCount: 5,
    ratingSum: '400'
  };
  test('Should render component', () => {
    const wrapper = shallow(<ViewBookInfoCard
      publishYear={props.publishYear}
      bookImageURL={props.bookImageURL}
      bookTitle={props.bookTitle}
      ratingCount={props.ratingCount}
      ratingSum={props.ratingSum}
      isAdmin={props.isAdmin}
      ISBN={props.ISBN}
      editFunction={props.editFunction}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
