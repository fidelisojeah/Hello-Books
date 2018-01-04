import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  viewOneBook,
  fetchUserBookHistory,
  borrowBook,
  clearBookState
} from '../actions/loadBooks';
import {
  editBook,
  updateBookQuantity
} from '../actions/editBook';
import { logout } from '../actions/login';

import {
  bookImageUpload
} from '../actions/newBookAction';

import {
  todayDate,
  forBookModal,
  displayYear
} from '../common/calculateMoment';
import NotFoundComponent from '../common/NotFoundComponent';

import BookGlobalComponent from
  '../view-book-components/BookGlobalComponent';

import LoadingPage from './LoadingPage';


class ViewBook extends React.Component {
  constructor(props) {
    super(props);
    const pageLinks = [];
    this.timeOutClear = null;
    this.collapsible =
      document.getElementById('collapsible-description');
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
      authorList: [],
      availableBorrow: 3,
      bookAuthors: [],
      bookDescription: '',
      bookId: null,
      bookImageURL: '',
      bookTitle: '',
      bookQuantity: 0,
      borrowed: null,
      borrowedBooks: [],
      borrowedBooksCount: 0,
      descriptionHeight: 0,
      divDescHeight: 0,
      editBookName: undefined,
      editDescription: undefined,
      editBookQuantity: undefined,
      editISBN: undefined,
      editModal: false,
      editModalError: false,
      editModalErrors: {},
      editPublishYear: undefined,
      element: '',
      error: null,
      expanded: false,
      fetching: true,
      ISBN: '',
      isLoading: false,
      maxDate: forBookModal().maxDate,
      membershipName: '',
      minDate: forBookModal().minDate,
      modalHead: '',
      newImageURL: undefined,
      pageLinks,
      publishYear: '',
      ratingCount: 0,
      ratingSum: '',
      startDate: todayDate().add(1, 'days'),
      unreturnedBookCount: 0,
      uploadedImage: null,
      yearArray: [],
      yearList: [],
      yearListShow: true,
    };
  }
  componentDidMount() {
    this.allYears(1900);
    this.collapsible =
      document.getElementById('collapsible-description');
    if (!isNaN(parseInt(this.props.match.params.bookId, 10))) {
      this.fetchAll();
      window.addEventListener('load', this.checkDescriptionHeight);
      window.addEventListener('resize', this.checkDescriptionHeight);
    } else {
      this.context.router.history.push('/books');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      if (nextProps.error.status === 504) {
        if (!this.timeOutClear) {
          this.timeOutClear =
            window
              .setInterval(this.refreshOnTimeOutError, 10000);
        }
      }
      if (nextProps.error.data) {
        if (nextProps
          .error.data.message === 'Not Allowed' ||
          nextProps.error
            .data.message === 'Unauthenticated') {
          this.props.logout();
          return this.context.router.history.push('/');
        }
      }
      if (nextProps
        .error.message === 'Book Unavailable') {
        this.setState({
          bookQuantity: 0
        });
      }
      this.setState({
        error: nextProps.error,
        fetching: nextProps.fetching,
        isAdmin: nextProps.isAdmin || false
      });
      return;
    }
    window.clearInterval(this.timeOutClear);
    const borrowed = (nextProps.borrowedBooks.length > 0) ?
      nextProps.borrowedBooks[0].borrowDate : null;

    this.setState({
      error: nextProps.error,
      fetching: nextProps.fetching,
      bookTitle: nextProps.bookTitle,
      bookId: nextProps.bookId,
      bookImageURL: nextProps.bookImageURL,
      bookDescription: nextProps.bookDescription,
      bookQuantity: nextProps.bookQuantity,
      isAdmin: nextProps.isAdmin,
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
    this.collapsible =
      document.getElementById('collapsible-description');
    if (this.collapsible &&
      this.state.descriptionHeight !==
      this.collapsible.clientHeight) {
      this.checkDescriptionHeight();
    }
  }
  componentWillUnmount() {
    this.props.clearBookState();
    document.body.classList.remove('with--modal');
    window.removeEventListener('load', this.checkDescriptionHeight);
    window.removeEventListener('resize', this.checkDescriptionHeight);
  }
  onImageDrop = (images) => {
    this.setState({
      newImageURL: '',
      uploadedImage: images[0],
      isLoading: true
    });
    this.handleImageUpload(images[0]);
  }
  onChangeBlurEvent = (event) => {
    const editModalErrors = this.state.editModalErrors;
    if (event.target.name === 'editPublishYear') {
      const yearArray = this.state.yearArray;
      if (
        !(/^\d+$/.test(event.target.value)) ||
        !yearArray
          .includes(parseInt(event.target.value, 10))) {
        editModalErrors.publishYear =
          'Please Enter a valid Year';
      } else {
        delete editModalErrors.publishYear;
      }
      document.getElementById('year-list').style.display = 'none';
    }
    if (event.target.name === 'editISBN') {
      if (event.target.value.length < 4) {
        editModalErrors.ISBNError =
          'Enter a valid ISBN';
      } else {
        delete editModalErrors.ISBNError;
      }
    }
    if (event.target.name === 'editBookQuantity') {
      if (!event.target.value) {
        this.setState({
          editBookQuantity: this.state.bookQuantity.toString()
        });
      }
    }
    if (event.target.name === 'editBookName') {
      if (event.target.value.length < 1) {
        editModalErrors.bookNameError =
          'Enter a valid Book Name';
      } else {
        delete editModalErrors.bookNameError;
      }
    }
    this.setState({
      editModalError: false,
      editModalErrors
    });
  }
  refreshOnTimeOutError = () => {
    this.fetchAll();
  }
  handleImageUpload = (image) => {
    this
      .props
      .bookImageUpload(image)
      .end((error, response) => {
        if (error) {
          this.setState({
            isLoading: false
          });
        }
        if (response.body.secure_url !== '') {
          this.setState({
            newImageURL: response.body.secure_url,
            isLoading: false,
            uploadedImage: null
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      }
      );
  }
  fetchAll() {
    this.props
      .viewOneBook(this.props.match.params.bookId);
    this.props
      .fetchUserBookHistory(this.props.match.params.bookId);
  }
  handleYearChangeClick = (event, yearValue) => {
    event.preventDefault();
    const editModalErrors = this.state.editModalErrors;
    delete editModalErrors.publishYear;
    if (yearValue) {
      this.setState({
        editModalError: false,
        editModalErrors,
        editPublishYear: yearValue.toString()
      });
    }
    document.getElementById('year-list').style.display = 'none';
  }
  handleImageEditClick = (event) => {
    event.preventDefault();
    this.setState({
      uploadedImage: null,
      newImageURL: undefined
    });
  }
  handleEditClick = (event) => {
    event.preventDefault();

    const { bookId, element,
      editBookName,
      editDescription,
      editISBN,
      editModalErrors,
      editPublishYear,
      publishYear,
      newImageURL
     } = this.state;
    if (element === 'publish year') {
      const editYear = parseInt(editPublishYear, 10);
      const oldPublishYear = parseInt(publishYear, 10);

      if (editModalErrors.publishYear) {
        return this.setState({
          editModalError: true
        });
      }
      if (!editPublishYear ||
        ((/^\d+$/.test(editPublishYear))
          && (editYear === oldPublishYear))
      ) {
        this.setState({
          modalHead: '',
          editDescription: undefined,
          editISBN: undefined,
          editBookQuantity: undefined,
          editPublishYear: undefined,
          editModal: true,
          editModalError: false,
          editModalErrors: {}
        });
        return document.body.classList.remove('with--modal');
      }
    }
    if (element === 'ISBN' || element === 'editBookName') {
      if (editModalErrors.ISBNError || editModalErrors.bookNameError) {
        return this.setState({
          editModalError: true
        });
      }
    }
    if (element === 'image') {
      if (!newImageURL) {
        return -1;
      }
    }
    this.props.editBook({
      bookName: editBookName,
      description: editDescription,
      bookImage: newImageURL,
      bookISBN: editISBN,
      publishYear: editPublishYear,
    }, bookId);
    this.setState({
      modalHead: '',
      newImageURL: undefined,
      editDescription: undefined,
      editBookQuantity: undefined,
      editISBN: undefined,
      editPublishYear: undefined,
      editModal: true,
      editModalError: false,
      editModalErrors: {}
    });
    return document.body.classList.remove('with--modal');
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
      editModalError: false,
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
      editBookName: undefined,
      editBookQuantity: undefined,
      editDescription: undefined,
      editISBN: undefined,
      editModal: true,
      editModalError: false,
      editModalErrors: {},
      editPublishYear: undefined,
      element
    }, () => {
      if (elementName) {
        document.getElementById(elementName).select();
      }
    });
    document.body.classList.add('with--modal');
    if (element !== 'image') {
      this.setState({
        newImageURL: undefined
      });
    }
  }
  allYears = (minYear) => {
    const yearArray = [];
    if (parseInt(minYear, 10) > 0) {
      for (let i = minYear; i <= displayYear(new Date()); i += 1) {
        yearArray.push(i);
      }
    }
    this.setState({
      yearArray
    });
  }
  listAuthorstoState = (authorFields) => {
    this.setState({
      authorList: authorFields
    });
  }
  checkDescriptionHeight = () => {
    if (this.collapsible) {
      this.setState({
        descriptionHeight: this.collapsible.clientHeight,
      });
    }
  }
  handleBorrowBook = (event) => {
    event.preventDefault();
    this.props.borrowBook({
      userId: this.props.userId,
      bookId: this.state.bookId,
      duedate: this.state.startDate.format('YYYY-MM-DD HH:mm:ss')
    });
  }
  handleBookFieldChange = (event) => {
    if (event.target.name === 'editBookQuantity') {
      if (!(/[^0-9]/g.test(event.target.value))) {
        this.setState({ [event.target.name]: event.target.value });
      }
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }

    const { yearArray, editModalErrors } = this.state;
    let yearList = [];
    if (event.target.name === 'editPublishYear') {
      delete editModalErrors.publishYear;

      if (event.target.value.length >= 1) {
        const regField = new RegExp(`^${event.target.value}`, 'gm');
        document.getElementById('year-list').style.display = 'block';
        yearList = yearArray.filter(years =>
          regField.test(years)
        );
      } else {
        document.getElementById('year-list').style.display = 'none';
      }
    }
    if (event.target.name === 'editISBN') {
      if (event.target.value.length >= 4) {
        delete editModalErrors.ISBNError;
      }
    }
    if (event.target.name === 'editBookName') {
      if (event.target.value.length >= 1) {
        delete editModalErrors.bookNameError;
      }
    }
    this.setState({
      yearList,
      editModalErrors
    });
  }
  updateQuantity = (event) => {
    event.preventDefault();
    const {
      editBookQuantity,
      bookQuantity,
      editModalErrors
    } = this.state;
    const newBookQuantity = parseInt(editBookQuantity, 10);
    if (isNaN(newBookQuantity) && editBookQuantity !== undefined) {
      editModalErrors.quantityError = 'Enter Appropraite Quantiy?';
      return this.setState({
        editModalError: true,
        editModalErrors
      });
    }
    if (newBookQuantity !== bookQuantity) {
      this.props.updateBookQuantity({
        quantity: (newBookQuantity - bookQuantity),
        bookId: this.props.bookId
      });
    }
    this.setState({
      modalHead: '',
      editBookQuantity: undefined,
      editModal: true,
      editModalError: false,
      editModalErrors: {}
    });
    return document.body.classList.remove('with--modal');
  }
  render() {
    if (this.state.fetching) {
      return (
        <LoadingPage />
      );
    }
    if (this.state.error
      && this.state.error.message === 'No Books Found') {
      return (
        <NotFoundComponent
          title="No Such Book"
          errorMessage="Invalid Book Maybe?"
          links={this.state.pageLinks}
        />
      );
    }
    return (
      <BookGlobalComponent
        authorList={this.state.authorList}
        availableBorrow={this.state.availableBorrow}
        bookDescription={this.state.bookDescription}
        bookImageURL={this.state.bookImageURL}
        bookQuantity={this.state.bookQuantity}
        bookTitle={this.state.bookTitle}
        borrowBookClick={this.borrowBookClick}
        borrowedBooks={this.state.borrowedBooks}
        borrowedBooksCount={this.state.borrowedBooksCount}
        borrowed={this.state.borrowed}
        closeModal={this.closeModal}
        descriptionHeight={this.state.descriptionHeight}
        editBookDescription={this.state.editDescription}
        editBookName={this.state.editBookName}
        editFunction={this.editFunction}
        editISBN={this.state.editISBN}
        editBookQuantity={this.state.editBookQuantity}
        editModal={this.state.editModal}
        editModalError={this.state.editModalError}
        editModalErrors={this.state.editModalErrors}
        editPublishYear={this.state.editPublishYear}
        element={this.state.element}
        expandCollapseDescription={this.expandCollapseDescription}
        expanded={this.state.expanded}
        handleBookFieldChange={this.handleBookFieldChange}
        handleBorrowBook={this.handleBorrowBook}
        handleDateChange={this.handleDateChange}
        handleEditClick={this.handleEditClick}
        handleImageEditClick={this.handleImageEditClick}
        handleYearChangeClick={this.handleYearChangeClick}
        ISBN={this.state.ISBN}
        isAdmin={this.state.isAdmin}
        isLoading={this.state.isLoading}
        maxDate={this.state.maxDate}
        minDate={this.state.minDate}
        modalHead={this.state.modalHead}
        newImageURL={this.state.newImageURL}
        onChangeBlurEvent={this.onChangeBlurEvent}
        onImageDrop={this.onImageDrop}
        pageLinks={this.state.pageLinks}
        publishYear={this.state.publishYear}
        ratingCount={this.state.ratingCount}
        ratingSum={this.state.ratingSum}
        reviewFunction={this.reviewFunction}
        updateQuantity={this.updateQuantity}
        startDate={this.state.startDate}
        yearList={this.state.yearList}
        yearListShow={this.state.yearListShow}
      />
    );
  }
}
ViewBook.propTypes = {
  Authors: PropTypes.arrayOf(PropTypes.object),
  availableBorrow: PropTypes.number,
  bookDescription: PropTypes.string,
  bookId: PropTypes.number,
  bookImageUpload: PropTypes.func.isRequired,
  bookImageURL: PropTypes.string,
  bookQuantity: PropTypes.number,
  bookTitle: PropTypes.string,
  borrowBook: PropTypes.func.isRequired,
  borrowedBooks: PropTypes.array,
  borrowedBooksCount: PropTypes.number,
  clearBookState: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired,
  error: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  fetchUserBookHistory: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  ISBN: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  membershipName: PropTypes.string,
  publishYear: PropTypes.string,
  ratingSum: PropTypes.string,
  ratingCount: PropTypes.string,
  unreturnedBookCount: PropTypes.number,
  updateBookQuantity: PropTypes.func.isRequired,
  userId: PropTypes.number,
  viewOneBook: PropTypes.func.isRequired
};
ViewBook.defaultProps = {
  bookTitle: '',
  bookId: null,
  error: null,
  Authors: [],
  bookDescription: '',
  bookQuantity: 0,
  isAdmin: false,
  ISBN: '',
  publishYear: null,
  bookImageURL: '',
  availableBorrow: 3,
  membershipName: '',
  unreturnedBookCount: 0,
  borrowedBooks: [],
  borrowedBooksCount: 0,
  userId: null,
  ratingCount: '',
  ratingSum: '',
};
ViewBook.contextTypes = {
  router: PropTypes.object.isRequired,
};
/**
 * @param {object} state
 *
 * @returns {object} nextprops
 */
function mapStateToProps(state) {
  return {
    isAdmin: (state.auth.user.role === 'Admin'),
    fetching: state.singleBookReducer.fetching,
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
    editBook,
    viewOneBook,
    fetchUserBookHistory,
    borrowBook,
    logout,
    clearBookState,
    updateBookQuantity,
    bookImageUpload
  })(ViewBook);
