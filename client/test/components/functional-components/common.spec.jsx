import React from 'react';
import 'raf/polyfill';

import AuthorSearch from
  '../../../src/components/common/AuthorSearch';

import BookCard from
  '../../../src/components/common/BookCard';
import ImageUploader from
  '../../../src/components/common/ImageUploader';
import Pagination from
  '../../../src/components/common/Pagination';
import LoadingBar from
  '../../../src/components/common/LoadingBar';
import NotFoundComponent from
  '../../../src/components/common/NotFoundComponent';
import Ratings from
  '../../../src/components/common/Ratings';


describe('Book Card Component', () => {
  test('Should render Book Card Component', () => {
    const bookAuthors = [{
      id: 1,
      name: 'Random Author',
      dateofBirth: '1990-12-12'
    }, {
      id: 2,
      name: 'Second Author',
      dateofBirth: '1900-12-12'
    }];

    const wrapper = shallow(<BookCard
      bookID={1}
      removeFromCategory={jest.fn()}
      allowEdit={false}
      bookName="Some random Book"
      synopsis="Random description about random Books"
      imgHref="xyz.jpg"
      ratingCount="4"
      ratingSum="90"
      bookAuthors={bookAuthors}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Rating Component', () => {
  test('Should render Rating Component', () => {
    const wrapper = shallow(<Ratings
      ratingCount={10}
      rateSum="420"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render Rating Component', () => {
    const wrapper = shallow(<Ratings
      ratingCount={0}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Not Found Component', () => {
  test('Should render Not Found Component', () => {
    const wrapper = shallow(<NotFoundComponent
      errorMessage="Stuff Not Found!!!"
      links={[
        {
          linkName: 'Home',
          link: '/'
        }
      ]}
      title="Stuff"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Image Uploader Component', () => {
  test('Should render Image Uploader Component', () => {
    const handleClick = jest.fn();
    const onImageDrop = jest.fn();
    const image = '';
    const wrapper = shallow(<ImageUploader
      handleClick={handleClick}
      image={image}
      isLoading={false}
      multiple={false}
      onImageDrop={onImageDrop}
      uploadText="Upload Images"
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
describe('Loading Bar Component', () => {
  test('Should render Loading Bar Component', () => {
    const wrapper = shallow(<LoadingBar
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});

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
describe('Pagination', () => {
  test('should render Pagination Component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination
      currentPage={1}
      totalPages={10}
      paginationFunction={onClick}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render Pagination Component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination
      totalPages={10}
      paginationFunction={onClick}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render Pagination Component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination
      currentPage={8}
      totalPages={10}
      paginationFunction={onClick}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render Pagination Component', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination
      currentPage={2}
      totalPages={4}
      paginationFunction={onClick}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render middle page of Pagination Component',
    () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Pagination
        currentPage={5}
        totalPages={10}
        paginationFunction={onClick}
      />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  test('should Not show pages',
    () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Pagination
        currentPage={50}
        totalPages={10}
        paginationFunction={onClick}
      />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  test('should Simulate click of page',
    () => {
      const onClick = jest.fn();
      const wrapper = shallow(<Pagination
        currentPage={5}
        totalPages={10}
        paginationFunction={onClick}
      />);
      expect(wrapper.length).toBe(1);
      wrapper.find('.pagination-div button').first().simulate('click');
      expect(onClick).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
});
