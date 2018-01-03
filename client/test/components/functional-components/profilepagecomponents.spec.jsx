import React from 'react';
import 'raf/polyfill';

import BorrowedBooksList from
  '../../../src/components/profile-page-components/BorrowedBooksList';

describe('BorrowedBooksList Component', () => {
  const fetchedBorrowedBooks = [
    {
      id: 1,
      borrowDate: '2017-12-14T11:58:38.848Z',
      dueDate: '2017-12-19T00:00:00.000Z',
      actualReturnDate: null,
      Book: {
        id: 1,
        bookName: 'Sample Book',
        bookISBN: '1-203-19392-13',
        bookImage: 'abc.jpg',
        publishYear: '2001-01-01T00:00:00.000Z'
      }
    },
    {
      id: 2,
      borrowDate: '2017-12-14T11:59:35.883Z',
      dueDate: '2018-01-01T00:00:00.000Z',
      actualReturnDate: '2017-12-14T18:26:49.552Z',
      Book: {
        id: 6,
        bookName: 'Sample Book',
        bookISBN: '1029-1820-1381-11',
        bookImage: 'lmn.jpg',
        publishYear: '2017-01-01T00:00:00.000Z'
      }
    },
    {
      id: 3,
      borrowDate: '2017-11-22T15:47:09.837Z',
      dueDate: '2017-12-21T00:00:00.000Z',
      actualReturnDate: '2017-12-06T09:58:10.274Z',
      Book: {
        id: 3,
        bookName: 'Another Random Book',
        bookISBN: '0-1203-4291-31431',
        bookImage: 'xyz.jpg',
        publishYear: '2008-01-01T00:00:00.000Z'
      }
    }
  ];
  const returnBookFunction = jest.fn();
  test('Should render component', () => {
    const wrapper = shallow(<BorrowedBooksList
      borrowedList={fetchedBorrowedBooks}
      returnBookFunction={returnBookFunction}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should simulate return book click', () => {
    const wrapper = shallow(<BorrowedBooksList
      borrowedList={fetchedBorrowedBooks}
      returnBookFunction={returnBookFunction}
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('.button').simulate('click');
    expect(returnBookFunction).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
