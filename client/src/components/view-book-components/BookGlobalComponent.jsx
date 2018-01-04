import React from 'react';
import PropTypes from 'prop-types';

import LayoutHeader from '../common/LayoutHeader';
import BreadCrumbs from '../common/BreadCrumbs';

import MainSection from './MainSection';
import MiddleSector from './MiddleSector';
import AdminBookSection from './AdminBookSection';
import BookModal from './BookModal';


import EditModal from '../edit-modal/EditModal';

/**
 * @param {object} props
 *
 * @returns {JSX} JSX element
 */
function BookGlobalComponent(props) {
  return (
    <div>
      <div className="layout--container">
        <LayoutHeader
          headerTitle={props.bookTitle}
        />
        <BreadCrumbs
          breadCrumbLinks={props.pageLinks}
        />

      </div>
      <MainSection
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
      />
      <div className="section_divider" />
      {!props.isAdmin &&
        <MiddleSector
          borrowCount={props.borrowedBooksCount}
          borrowed={props.borrowed}
          reviewFunction={props.reviewFunction}
          borrowList={props.borrowedBooks}
        />
      }
      {props.isAdmin &&
        <AdminBookSection
          bookQuantity={props.bookQuantity}
          editFunction={props.editFunction}
        />
      }
      <div
        id="msg-modal"
        className={`modal ${(props.editModalError
          && props.editModal) ?
          '-has-error' : ''
          }`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              className="close"
              onClick={props.closeModal}
            >
              &times;
              </button>
            <h2 id="modal-head">
              {props.modalHead}
            </h2>
          </div>
          <div className="modal-body">
            {!props.editModal &&
              <BookModal
                availableBorrow={props.availableBorrow}
                startDate={props.startDate}
                handleDateChange={props.handleDateChange}
                handleBorrowBook={props.handleBorrowBook}
                maxDate={props.maxDate}
                minDate={props.minDate}
              />
            }
            {
              props.editModal &&
              props.isAdmin &&
              <EditModal
                bookName={props.editBookName}
                bookQuantity={props.editBookQuantity}
                description={props.editBookDescription}
                element={props.element}
                error={props.editModalErrors}
                handleFieldChange={props.handleBookFieldChange}
                handleEditClick={props.handleEditClick}
                handleImageEditClick={props.handleImageEditClick}
                handleYearChangeClick={props.handleYearChangeClick}
                ISBN={props.editISBN}
                isLoading={props.isLoading}
                newImageURL={props.newImageURL}
                oldBookName={props.bookTitle}
                oldDescription={props.bookDescription}
                oldBookQuantity={props.bookQuantity}
                oldPublishYear={props.publishYear}
                oldISBN={props.ISBN}
                updateQuantity={props.updateQuantity}
                onChangeBlurEvent={props.onChangeBlurEvent}
                onImageDrop={props.onImageDrop}
                publishyear={props.editPublishYear}
                yearList={props.yearList}
                yearListShow={props.yearListShow}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
BookGlobalComponent.defaultProps = {
  authorList: [],
  borrowed: null,
  editBookName: undefined,
  editBookDescription: undefined,
  editBookQuantity: undefined,
  editISBN: undefined,
  editPublishYear: undefined,
  modalHead: '',
  newImageURL: '',
  yearListShow: false,
  yearList: [],
  editModalErrors: {}
};
BookGlobalComponent.propTypes = {
  authorList: PropTypes.array,
  availableBorrow: PropTypes.number.isRequired,
  bookDescription: PropTypes.string.isRequired,
  bookImageURL: PropTypes.string.isRequired,
  bookQuantity: PropTypes.number.isRequired,
  bookTitle: PropTypes.string.isRequired,
  borrowBookClick: PropTypes.func.isRequired,
  borrowedBooks: PropTypes.array.isRequired,
  borrowedBooksCount: PropTypes.number.isRequired,
  borrowed: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  descriptionHeight: PropTypes.number.isRequired,
  editBookDescription: PropTypes.string,
  editBookQuantity: PropTypes.string,
  editBookName: PropTypes.string,
  editFunction: PropTypes.func.isRequired,
  editISBN: PropTypes.string,
  editModal: PropTypes.bool.isRequired,
  editModalError: PropTypes.bool.isRequired,
  editModalErrors: PropTypes.object,
  editPublishYear: PropTypes.string,
  element: PropTypes.string.isRequired,
  expandCollapseDescription: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  handleBookFieldChange: PropTypes.func.isRequired,
  handleBorrowBook: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleImageEditClick: PropTypes.func.isRequired,
  handleYearChangeClick: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  ISBN: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  maxDate: PropTypes.object.isRequired,
  minDate: PropTypes.object.isRequired,
  modalHead: PropTypes.string,
  newImageURL: PropTypes.string,
  onChangeBlurEvent: PropTypes.func.isRequired,
  onImageDrop: PropTypes.func.isRequired,
  pageLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  publishYear: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  ratingSum: PropTypes.string.isRequired,
  reviewFunction: PropTypes.func.isRequired,
  startDate: PropTypes.object.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  yearList: PropTypes.arrayOf(PropTypes.number),
  yearListShow: PropTypes.bool,

};
export default BookGlobalComponent;
