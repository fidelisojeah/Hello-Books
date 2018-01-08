import React from 'react';
import 'raf/polyfill';

import AuthorSearch from
  '../../../src/components/common/AuthorSearch';

describe('Author Search Component', () => {
  test('Should render Author Search Component', () => {
    const onAuthorMouseDown = jest.fn();
    const onBlurEvent = jest.fn();
    const checkAuthorsRequest = jest.fn();
    const handleAuthorChange = jest.fn();
    const onAuthorChange = jest.fn();
    const handleAuthorRemove = jest.fn();
    const authorList = null;
    const bookAuthorDetails = null;
    const bookAuthors = [];
    const authorField = '';

    const wrapper = shallow(<AuthorSearch
      onAuthorMouseDown={onAuthorMouseDown}
      onBlurEvent={onBlurEvent}
      handleAuthorRemove={handleAuthorRemove}
      authorList={authorList}
      bookAuthorDetails={bookAuthorDetails}
      bookAuthors={bookAuthors}
      authorField={authorField}
      onAuthorChange={onAuthorChange}
      handleAuthorChange={handleAuthorChange}
      checkAuthorsRequest={checkAuthorsRequest}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should List Selected Book Authors', () => {
    const onAuthorMouseDown = jest.fn();
    const onBlurEvent = jest.fn();
    const checkAuthorsRequest = jest.fn();
    const handleAuthorChange = jest.fn();
    const onAuthorChange = jest.fn();
    const handleAuthorRemove = jest.fn();
    const authorList = [];
    const bookAuthorDetails = [{
      id: 1,
      name: 'Random Author'
    }, {
      id: 2,
      name: 'Second Author'
    }];
    const bookAuthors = [];
    const authorField = '';

    const wrapper = shallow(<AuthorSearch
      onAuthorMouseDown={onAuthorMouseDown}
      onBlurEvent={onBlurEvent}
      handleAuthorRemove={handleAuthorRemove}
      authorList={authorList}
      bookAuthorDetails={bookAuthorDetails}
      bookAuthors={bookAuthors}
      authorField={authorField}
      onAuthorChange={onAuthorChange}
      handleAuthorChange={handleAuthorChange}
      checkAuthorsRequest={checkAuthorsRequest}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.selected-Authors li')).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should Remove Selected Book author', () => {
    const onAuthorMouseDown = jest.fn();
    const onBlurEvent = jest.fn();
    const checkAuthorsRequest = jest.fn();
    const handleAuthorChange = jest.fn();
    const onAuthorChange = jest.fn();
    const handleAuthorRemove = jest.fn();
    const authorList = [];
    const bookAuthorDetails = [{
      id: 1,
      name: 'Random Author'
    }, {
      id: 2,
      name: 'Second Author'
    }];
    const bookAuthors = [];
    const authorField = '';

    const wrapper = shallow(<AuthorSearch
      onAuthorMouseDown={onAuthorMouseDown}
      onBlurEvent={onBlurEvent}
      handleAuthorRemove={handleAuthorRemove}
      authorList={authorList}
      bookAuthorDetails={bookAuthorDetails}
      bookAuthors={bookAuthors}
      authorField={authorField}
      onAuthorChange={onAuthorChange}
      handleAuthorChange={handleAuthorChange}
      checkAuthorsRequest={checkAuthorsRequest}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.selected-Authors li')).toHaveLength(2);
    wrapper.find('.selected-Authors button').first().simulate('click');
    expect(handleAuthorRemove).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
  test('Should List Book Authors', () => {
    const onAuthorMouseDown = jest.fn();
    const onBlurEvent = jest.fn();
    const checkAuthorsRequest = jest.fn();
    const handleAuthorChange = jest.fn();
    const onAuthorChange = jest.fn();
    const handleAuthorRemove = jest.fn();
    const authorList = [{
      id: 1,
      name: 'Random Author',
      dateofBirth: '1990-12-12'
    }, {
      id: 2,
      name: 'Second Author',
      dateofBirth: '1900-12-12'
    }];
    const bookAuthorDetails = [{
      id: 1,
      name: 'Random Author'
    }];
    const bookAuthors = [1];
    const authorField = '';

    const wrapper = shallow(<AuthorSearch
      onAuthorMouseDown={onAuthorMouseDown}
      onBlurEvent={onBlurEvent}
      handleAuthorRemove={handleAuthorRemove}
      authorList={authorList}
      bookAuthorDetails={bookAuthorDetails}
      bookAuthors={bookAuthors}
      authorField={authorField}
      onAuthorChange={onAuthorChange}
      handleAuthorChange={handleAuthorChange}
      checkAuthorsRequest={checkAuthorsRequest}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#listAuthors li')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should Select an Author from list', () => {
    const onAuthorMouseDown = jest.fn();
    const onBlurEvent = jest.fn();
    const checkAuthorsRequest = jest.fn();
    const handleAuthorChange = jest.fn();
    const onAuthorChange = jest.fn();
    const handleAuthorRemove = jest.fn();
    const authorList = [{
      id: 1,
      name: 'Random Author',
      dateofBirth: '1990-12-12'
    }, {
      id: 2,
      name: 'Second Author',
      dateofBirth: '1900-12-12'
    }];
    const bookAuthorDetails = [{
      id: 1,
      name: 'Random Author'
    }];
    const bookAuthors = [1];
    const authorField = '';

    const wrapper = shallow(<AuthorSearch
      onAuthorMouseDown={onAuthorMouseDown}
      onBlurEvent={onBlurEvent}
      handleAuthorRemove={handleAuthorRemove}
      authorList={authorList}
      bookAuthorDetails={bookAuthorDetails}
      bookAuthors={bookAuthors}
      authorField={authorField}
      onAuthorChange={onAuthorChange}
      handleAuthorChange={handleAuthorChange}
      checkAuthorsRequest={checkAuthorsRequest}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#listAuthors li')).toHaveLength(1);
    wrapper.find('.author-list-span').simulate('mouseDown');
    expect(onAuthorMouseDown).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
