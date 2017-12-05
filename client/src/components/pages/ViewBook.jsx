import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {
  viewOneBook,
  fetchUserBookHistory,
  borrowBook
} from '../actions/loadBooks';
import { logout } from '../actions/login';


import { todayDate, forBookModal } from '../common/calculate-moment';

import BreadCrumbs from '../common/BreadCrumbs';
import LayoutHeader from '../common/LayoutHeader';
import AuthorList from '../lists/AuthorList';
import MiddleSector from '../minis/MiddleSector';
import EditModal from '../minis/EditModal';
import BookModal from '../minis/BookModal';
import BorrowBookModule from '../minis/BorrowBookModule';
import ViewBookInfoCard from '../minis/ViewBookInfoCard';
import LoadingPage from './LoadingPage';


class ViewBook extends React.Component {
  constructor(props) {
    super(props);
    const pageLinks = [];
    this.collapsible = null;
    pageLinks.push({
      linkName: 'Home',
      link: ''
    });
    pageLinks.push({
      linkName: 'Library',
      link: 'books'
    });
    pageLinks.push({
      linkName: 'Book',
      link: `books/${this.props.match.params.bookId}`
    });
    this.state = {
      editModal: false,
      element: '',
      bookImageURL: '',
      bookId: null,
      bookAuthors: [],
      bookTitle: '',
      authorList: [],
      bookDescription: '',
      bookQuantity: 0,
      publishYear: '',
      ISBN: '',
      pageLinks,
      modalHead: '',
      borrowedBooksCount: 0,
      borrowed: null,
      availableBorrow: 3,
      membershipName: '',
      unreturnedBookCount: 0,
      borrowedBooks: [],
      ratingCount: 0,
      ratingSum: '',
      descriptionHeight: 0,
      divDescHeight: 0,
      expanded: false,
      startDate: todayDate().add(1, 'days'),
      maxDate: forBookModal().maxDate,
      minDate: forBookModal().minDate,
      editpublishYear: undefined,
      editISBN: undefined
    };
  }
  componentDidMount() {
    this.props
      .viewOneBook(this.props.match.params.bookId);
    this.props
      .fetchUserBookHistory(this.props.match.params.bookId);
    window.addEventListener('load', this.checkDescriptionHeight);
    window.addEventListener('resize', this.checkDescriptionHeight);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      if (nextProps
        .error.data.message === 'Not Allowed' ||
        nextProps.error
          .data.message === 'Unauthenticated') {
        this.props.logout();
        this.context.router.history.push('/');
      }
      return;
    }

    const borrowed = (nextProps.borrowedBooks.length > 0) ?
      nextProps.borrowedBooks[0].borrowDate : null;

    this.setState({
      bookTitle: nextProps.bookTitle,
      bookId: nextProps.bookId,
      bookImageURL: nextProps.bookImageURL,
      bookDescription: nextProps.bookDescription,
      bookQuantity: nextProps.bookQuantity,
      ISBN: nextProps.ISBN,
      publishYear: nextProps.publishYear,
      borrowedBooksCount: nextProps.borrowedBooksCount,
      ratingSum: nextProps.ratingSum,
      ratingCount: parseInt(nextProps.ratingCount, 10),
      borrowed,
      availableBorrow: nextProps.availableBorrow,
      membershipName: nextProps.membershipName,
      unreturnedBookCount: nextProps.unreturnedBookCount,
      borrowedBooks: nextProps.borrowedBooks
    });
    this.listAuthorstoState(nextProps.Authors);
  }
  componentDidUpdate() {
    if (this.collapsible &&
      this.state.descriptionHeight !==
      this.collapsible.clientHeight) {
      this.checkDescriptionHeight();
    }
  }
  componentWillUnmount() {
    document.body.classList.remove('with--modal');
    window.removeEventListener('load', this.checkDescriptionHeight);
    window.removeEventListener('resize', this.checkDescriptionHeight);
  }
  handleBorrowBook = (event) => {
    event.preventDefault();
    this.props.borrowBook({
      userId: this.props.userId,
      bookId: this.state.bookId,
      duedate: this.state.startDate.format('YYYY-MM-DD HH:mm:ss')
    });
  }
  checkDescriptionHeight = () => {
    if (this.collapsible) {
      this.setState({
        descriptionHeight: this.collapsible.clientHeight,
      });
    }
  }
  listAuthorstoState = (authorFields) => {
    this.setState({
      authorList: authorFields
    });
  }
  reviewFunction(event) {
    event.preventDefault();
  }
  closeModal(event) {
    event.preventDefault();
    document.body.classList.remove('with--modal');
  }
  borrowBookClick = (event) => {
    event.preventDefault();
    this.setState({
      modalHead: 'Borrow Book',
      editModal: false
    });
    document.body.classList.add('with--modal');
  }
  expandCollapseDescription = (event) => {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
    document
      .getElementById('description')
      .classList.toggle('expanded');
  }
  handleDateChange = (date) => {
    this.setState({
      startDate: date
    });
  }
  editFunction = (event, element, elementName) => {
    event.preventDefault();

    this.setState({
      modalHead: `Edit ${element}`,
      editModal: true,
      element
    }, () => {
      if (elementName) {
        // const elementDiv =
        document.getElementById(elementName).select();
        // console.log(elementDiv, '+++');
        // .select();
      }
    });
    document.body.classList.add('with--modal');
  }
  handleBookFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    if (!this.props.bookTitle) {
      return (
        <LoadingPage />
      );
    }
    return (
      <div>
        <div className="layout--container">
          <LayoutHeader
            headerTitle={this.state.bookTitle}
          />
          <BreadCrumbs
            breadCrumbLinks={this.state.pageLinks}
          />
          <div className="section">
            <div className="books-container">
              <div className="innerSection">
                <div className="row">
                  <div className="col-md-8 col-sm-7 col-xs-12">
                    <ViewBookInfoCard
                      publishYear={this.state.publishYear}
                      bookImageURL={this.state.bookImageURL}
                      bookTitle={this.state.bookTitle}
                      ratingCount={this.state.ratingCount}
                      ratingSum={this.state.ratingSum}
                      ISBN={this.state.ISBN}
                      editFunction={this.editFunction}
                    />
                    <div className="col-sm-12 visible-sm-block">
                      <BorrowBookModule
                        bookQuantity={this.state.bookQuantity}
                        borrowBookClick={this.borrowBookClick}
                      />
                    </div>
                    <div className="col-md-6 col-md-offset-2 col-sm-12">
                      <div className="about-padding">
                        <h2 className="book-about">
                          <span className="fieldField">
                            By
                          </span>
                          <span className="bookAuthors">
                            <AuthorList
                              bookAuthors={this.state.authorList}
                            />
                          </span>
                        </h2>
                      </div>
                      <div className="book-description">
                        <div className="fieldField">
                          Description:
                    </div>
                      </div>
                      <div
                        className="description"
                        id="description"
                      >
                        <div
                          className="collapsible-description"
                          id="collapsible-description"
                          ref={(element) => { this.collapsible = element; }}
                        >
                          {this.state.bookDescription}
                        </div>
                        <i
                          className={
                            classnames('description-toggle',
                              {
                                '-expand':
                                  (this.state.descriptionHeight > 205
                                    &&
                                    !this.state.expanded
                                  )
                              },
                              {
                                '-collapse': (this.state.descriptionHeight > 205
                                  && this.state.expanded
                                )
                              })
                          }
                          id="description-toggle"
                          role="presentation"
                          onClick={this.expandCollapseDescription}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-5 hidden-sm-block">
                    <BorrowBookModule
                      bookQuantity={this.state.bookQuantity}
                      borrowBookClick={this.borrowBookClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section_divider" />
        <MiddleSector
          borrowCount={this.state.borrowedBooksCount}
          borrowed={this.state.borrowed}
          reviewFunction={this.reviewFunction}
          borrowList={this.state.borrowedBooks}
        />
        <div id="msg-modal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <button
                className="close"
                onClick={this.closeModal}
              >
                &times;
              </button>
              <h2 id="modal-head">
                {this.state.modalHead}
              </h2>
            </div>
            <div className="modal-body">
              {!this.state.editModal &&
                <BookModal
                  availableBorrow={this.state.availableBorrow}
                  startDate={this.state.startDate}
                  handleDateChange={this.handleDateChange}
                  handleBorrowBook={this.handleBorrowBook}
                  maxDate={this.state.maxDate}
                  minDate={this.state.minDate}
                />
              }
              {
                this.state.editModal &&
                <EditModal
                  element={this.state.element}
                  handleFieldChange={this.handleBookFieldChange}
                  publishyear={this.state.editpublishYear}
                  oldPublishYear={this.state.publishYear}
                  oldISBN={this.state.ISBN}
                  ISBN={this.state.editISBN}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ViewBook.propTypes = {
  viewOneBook: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  borrowBook: PropTypes.func.isRequired,
  fetchUserBookHistory: PropTypes.func.isRequired,
  bookTitle: PropTypes.string,
  userId: PropTypes.number.isRequired,
  bookId: PropTypes.number,
  bookImageURL: PropTypes.string,
  bookDescription: PropTypes.string,
  bookQuantity: PropTypes.number,
  ISBN: PropTypes.string,
  publishYear: PropTypes.string,
  ratingSum: PropTypes.string,
  ratingCount: PropTypes.string,
  Authors: PropTypes.arrayOf(PropTypes.object),
  availableBorrow: PropTypes.number,
  membershipName: PropTypes.string,
  unreturnedBookCount: PropTypes.number,
  borrowedBooks: PropTypes.array,
  borrowedBooksCount: PropTypes.number,
  error: PropTypes.object
};
ViewBook.defaultProps = {
  bookTitle: '',
  bookId: null,
  error: null,
  Authors: [],
  bookDescription: '',
  bookQuantity: 0,
  ISBN: '',
  publishYear: null,
  bookImageURL: '',
  availableBorrow: 3,
  membershipName: '',
  unreturnedBookCount: 0,
  borrowedBooks: [],
  borrowedBooksCount: 0,
  ratingCount: '',
  ratingSum: '',
};
ViewBook.contextTypes = {
  router: PropTypes.object.isRequired,
};
/**
 * @param {*} state
 * @returns {object} nextprops
 */
function mapStateToProps(state) {
  return {
    bookTitle: state.singleBookReducer.fetchedBook.bookName,
    userId: state.auth.user.userId,
    bookId: state.singleBookReducer.fetchedBook.id,
    bookImageURL: state.singleBookReducer.fetchedBook.bookImage,
    bookDescription: state.singleBookReducer.fetchedBook.description,
    bookQuantity: state.singleBookReducer.fetchedBook.bookQuantity,
    ISBN: state.singleBookReducer.fetchedBook.bookISBN,
    publishYear: state.singleBookReducer.fetchedBook.publishYear,
    Authors: state.singleBookReducer.fetchedBook.Authors,
    ratingSum: state.singleBookReducer.fetchedBook.ratingSum || 'empty',
    ratingCount: state.singleBookReducer.fetchedBook.ratingCount,
    availableBorrow: state.bookHistoryReducer.availableBorrow,
    unreturnedBookCount: state.bookHistoryReducer.unreturnedBookCount,
    membershipName: state.bookHistoryReducer.membershipName,
    borrowedBooks: state.bookHistoryReducer.borrowedBooks,
    borrowedBooksCount: state.bookHistoryReducer.borrowedBooksCount,
    error: state.singleBookReducer.error || state.bookHistoryReducer.error
  };
}
export default connect(mapStateToProps,
  {
    viewOneBook,
    fetchUserBookHistory,
    borrowBook,
    logout
  })(ViewBook);
