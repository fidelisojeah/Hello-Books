import React from 'react';
import 'raf/polyfill';

import BookGlobalComponent from
  '../../../src/components/view-book-components/BookGlobalComponent';

import {
  forBookModal,
  todayDate
} from
  '../../../src/components/common/calculateMoment';


describe('BookGlobalComponent Component', () => {
  const availableBorrow = 1;
  const bookDescription = 'some random description';
  const bookImageURL = 'xya.jpg';
  const bookQuantity = 1;
  const bookTitle = 'A Random Book';
  const borrowBookClick = jest.fn();
  const borrowed = '2017-12-14T11:59:35.883Z';
  const borrowedBooks = [{
    actualReturnDate: '2017-12-14T18:26:49.552Z',
    id: 1,
    dueDate: '2018-01-01T00:00:00.000Z',
    borrowedDate: '2017-12-14T11:59:35.883Z'
  }];
  const borrowedBooksCount = 1;
  const closeModal = jest.fn();
  const descriptionHeight = 600;
  const editFunction = jest.fn();
  const element = 'Description';
  const expandCollapseDescription = jest.fn();
  const expanded = false;
  const handleBookFieldChange = jest.fn();
  const handleBorrowBook = jest.fn();
  const handleDateChange = jest.fn();
  const handleEditClick = jest.fn();
  const handleImageEditClick = jest.fn();
  const handleYearChangeClick = jest.fn();
  const ISBN = '10-139081-1981';
  const isAdmin = true;
  const maxDate = forBookModal().maxDate;
  const minDate = forBookModal().maxDate;
  const onChangeBlurEvent = jest.fn();
  const updateQuantity = jest.fn();
  const onImageDrop = jest.fn();
  const pageLinks = [
    {
      linkName: 'Home',
      link: '/'
    },
    {
      linkName: 'Library',
      link: '/library'
    }
  ];
  const publishYear = '1989';
  const ratingCount = 8;
  const ratingSum = '32';
  const reviewFunction = jest.fn();
  const startDate = todayDate();
  const yearList = [1989, 1990, 1991, 1992, 1993, 1994];
  test('Should render component', () => {
    const wrapper = shallow(<BookGlobalComponent
      availableBorrow={availableBorrow}
      bookDescription={bookDescription}
      bookImageURL={bookImageURL}
      bookQuantity={bookQuantity}
      bookTitle={bookTitle}
      borrowBookClick={borrowBookClick}
      borrowedBooks={borrowedBooks}
      borrowedBooksCount={borrowedBooksCount}
      borrowed={borrowed}
      closeModal={closeModal}
      descriptionHeight={descriptionHeight}
      editFunction={editFunction}
      editModal
      editModalError={false}
      element={element}
      expandCollapseDescription={expandCollapseDescription}
      expanded={expanded}
      handleBookFieldChange={handleBookFieldChange}
      handleBorrowBook={handleBorrowBook}
      handleDateChange={handleDateChange}
      handleEditClick={handleEditClick}
      handleImageEditClick={handleImageEditClick}
      handleYearChangeClick={handleYearChangeClick}
      ISBN={ISBN}
      isAdmin={isAdmin}
      isLoading={false}
      maxDate={maxDate}
      minDate={minDate}
      onChangeBlurEvent={onChangeBlurEvent}
      onImageDrop={onImageDrop}
      pageLinks={pageLinks}
      publishYear={publishYear}
      ratingCount={ratingCount}
      ratingSum={ratingSum}
      reviewFunction={reviewFunction}
      startDate={startDate}
      updateQuantity={updateQuantity}
      yearList={yearList}
      yearListShow
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render component with close modal click', () => {
    const wrapper = shallow(<BookGlobalComponent
      availableBorrow={availableBorrow}
      bookDescription={bookDescription}
      bookImageURL={bookImageURL}
      bookQuantity={bookQuantity}
      bookTitle={bookTitle}
      borrowBookClick={borrowBookClick}
      borrowedBooks={borrowedBooks}
      borrowedBooksCount={borrowedBooksCount}
      borrowed={borrowed}
      closeModal={closeModal}
      descriptionHeight={descriptionHeight}
      editFunction={editFunction}
      editModal
      editModalError={false}
      element={element}
      expandCollapseDescription={expandCollapseDescription}
      expanded={expanded}
      handleBookFieldChange={handleBookFieldChange}
      handleBorrowBook={handleBorrowBook}
      handleDateChange={handleDateChange}
      handleEditClick={handleEditClick}
      handleImageEditClick={handleImageEditClick}
      handleYearChangeClick={handleYearChangeClick}
      ISBN={ISBN}
      isAdmin={isAdmin}
      isLoading={false}
      maxDate={maxDate}
      minDate={minDate}
      onChangeBlurEvent={onChangeBlurEvent}
      onImageDrop={onImageDrop}
      pageLinks={pageLinks}
      publishYear={publishYear}
      ratingCount={ratingCount}
      ratingSum={ratingSum}
      reviewFunction={reviewFunction}
      startDate={startDate}
      updateQuantity={updateQuantity}
      yearList={yearList}
      yearListShow
    />);
    expect(wrapper.length).toBe(1);
    wrapper.find('.modal-header .close').first().simulate('click');
    expect(closeModal).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render component with error', () => {
    const wrapper = shallow(<BookGlobalComponent
      availableBorrow={availableBorrow}
      bookDescription={bookDescription}
      bookImageURL={bookImageURL}
      bookQuantity={bookQuantity}
      bookTitle={bookTitle}
      borrowBookClick={borrowBookClick}
      borrowedBooks={borrowedBooks}
      borrowedBooksCount={borrowedBooksCount}
      borrowed={borrowed}
      closeModal={closeModal}
      descriptionHeight={descriptionHeight}
      editFunction={editFunction}
      editModal
      editModalError
      element={element}
      expandCollapseDescription={expandCollapseDescription}
      expanded={expanded}
      handleBookFieldChange={handleBookFieldChange}
      handleBorrowBook={handleBorrowBook}
      handleDateChange={handleDateChange}
      handleEditClick={handleEditClick}
      handleImageEditClick={handleImageEditClick}
      handleYearChangeClick={handleYearChangeClick}
      ISBN={ISBN}
      isAdmin={false}
      isLoading={false}
      modalHead="Enter something nice"
      maxDate={maxDate}
      minDate={minDate}
      onChangeBlurEvent={onChangeBlurEvent}
      onImageDrop={onImageDrop}
      pageLinks={pageLinks}
      publishYear={publishYear}
      ratingCount={ratingCount}
      ratingSum={ratingSum}
      reviewFunction={reviewFunction}
      startDate={startDate}
      updateQuantity={updateQuantity}
      yearList={yearList}
      yearListShow
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('Should render component without modal', () => {
    const wrapper = shallow(<BookGlobalComponent
      availableBorrow={availableBorrow}
      bookDescription={bookDescription}
      bookImageURL={bookImageURL}
      bookQuantity={bookQuantity}
      bookTitle={bookTitle}
      borrowBookClick={borrowBookClick}
      borrowedBooks={borrowedBooks}
      borrowedBooksCount={borrowedBooksCount}
      borrowed={borrowed}
      closeModal={closeModal}
      descriptionHeight={descriptionHeight}
      editFunction={editFunction}
      editModal={false}
      editModalError
      element={element}
      expandCollapseDescription={expandCollapseDescription}
      expanded={expanded}
      handleBookFieldChange={handleBookFieldChange}
      handleBorrowBook={handleBorrowBook}
      handleDateChange={handleDateChange}
      handleEditClick={handleEditClick}
      handleImageEditClick={handleImageEditClick}
      handleYearChangeClick={handleYearChangeClick}
      ISBN={ISBN}
      isAdmin={false}
      isLoading={false}
      modalHead="Enter something nice"
      maxDate={maxDate}
      minDate={minDate}
      onChangeBlurEvent={onChangeBlurEvent}
      onImageDrop={onImageDrop}
      pageLinks={pageLinks}
      publishYear={publishYear}
      ratingCount={ratingCount}
      ratingSum={ratingSum}
      reviewFunction={reviewFunction}
      startDate={startDate}
      updateQuantity={updateQuantity}
      yearList={yearList}
      yearListShow
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
