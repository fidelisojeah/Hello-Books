import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BorrowedBooksList from
  '../profile-page-components/BorrowedBooksList';

import BreadCrumbs from '../common/BreadCrumbs';
import LoadingBar from '../common/LoadingBar';
import LayoutHeader from '../common/LayoutHeader';
import Toastr from '../common/Toastr';
import Pagination from '../common/Pagination';
import PerPage from '../common/PerPage';

import {
  retrieveBorrowHistory,
  returnBook
} from '../actions/loadBooks';

export class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const pageLinks = [];
    pageLinks.push({
      linkName: 'Home',
      link: ''
    });
    pageLinks.push({
      linkName: 'Profile',
      link: 'profile'
    });
    this.state = {
      displayName: this.props.displayName,
      isLoading: false,
      hasLoaded: false,
      totalBorrowed: 0,
      notReturned: false,
      totalPages: 1,
      page: 1,
      sortBy: 'returndate',
      limit: 10,
      sortDesc: true,
      pageLinks,
      error: null
    };
  }
  componentDidMount() {
    this.getBorrowHistory();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error.status === 504) {
      // reload on timeout failure
      if (!this.timeOutClear) {
        Toastr.Failure('Something\'s Wrong', 3000);
        this.timeOutClear =
          window
            .setInterval(this.refreshOnTimeOutError, 10000);
      }
    }

    this.setState({
      fetchedBorrowedBooks: nextProps.fetchedBorrowedBooks,
      isLoading: nextProps.isLoading,
      totalPages: nextProps.totalPages,
      hasLoaded: nextProps.hasLoaded,
      error: nextProps.error
    });
  }
  componentWillUnmount() {
    window.clearInterval(this.timeOutClear);
  }
  getBorrowHistory = () => {
    const {
      sortBy,
      sortDesc,
      limit,
      page,
      notReturned
    } = this.state;
    this.setState({
      isLoading: true
    });
    this.props.retrieveBorrowHistory({
      userId: this.props.userId,
      notReturned,
      sortBy,
      sortDesc,
      limit,
      page
    });
  }
  handleisReturn = (event) => {
    this.setState({
      notReturned: event.target.checked
    }, () =>
        this.getBorrowHistory()
    );
  }
  returnBookFunction = (event, lendId, bookId) => {
    event.preventDefault();
    this.props.returnBook(
      {
        lendId,
        bookId,
        userId: this.props.userId
      }
    );
  }
  refreshOnTimeOutError = () => {
    this.getBorrowHistory();
  }
  sorterFunction = (event, field) => {
    event.preventDefault();
    const { sortDesc, sortBy } = this.state;
    this.setState({
      sortBy: field,
      sortDesc: (sortBy === field) ? !(sortDesc) : true
    }, () => {
      this.getBorrowHistory();
    });
  }
  paginationFunction = (event, index) => {
    event.preventDefault();
    if (index !== this.state.page) {
      this.setState({
        page: index
      }, () => {
        this.getBorrowHistory();
      });
    }
  }
  perPageFunction = (event, index) => {
    event.preventDefault();
    if (index !== this.state.limit) {
      this.setState({
        page: 1,
        limit: index
      }, () => {
        this.getBorrowHistory();
      });
    }
  }
  render() {
    const { displayName,
      fetchedBorrowedBooks,
      hasLoaded,
      isLoading,
      notReturned,
      pageLinks,
      page,
      totalPages,
      limit,
      sortBy,
      sortDesc } = this.state;
    return (
      <div className="layout--container">
        <LayoutHeader
          headerTitle={displayName}
        />
        <BreadCrumbs
          breadCrumbLinks={pageLinks}
        />
        <div className="section profile-page">
          <div className="container">
            <div className="innerSection">
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="innerSection--section">
                    <div className="innerSection--section_title">
                      Borrowed Books
                    </div>
                    <form>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={event => this.handleisReturn(event)}
                        id="is-returned"
                        checked={notReturned}
                        value="Returned"
                      />
                      <label
                        className="control-label"
                        htmlFor="is-returned"
                      >
                        Not Returned?
                      </label>
                    </form>
                  </div>
                </div>
              </div>
              {(hasLoaded && fetchedBorrowedBooks.length > 0) && (
                <div className="row borrow-table">
                  <div className="table-outer">
                    <table className="all-books-table">
                      <thead>
                        <tr>
                          <th
                            onClick={event =>
                              this.sorterFunction(event, 'bookname')}
                          >
                            Book Name
                            <i
                              className={`table-sorter ${sortBy === 'bookname' ?
                                sortDesc
                                : '-normal'}`}
                            />
                          </th>
                          <th
                            className="hidden-sm-table brwdate"
                            onClick={event =>
                              this.sorterFunction(event, 'dateborrowed')}
                          >

                            Date
                            Borrowed
                            <i
                              className={`table-sorter 
                              ${sortBy === 'dateborrowed' ?
                                  sortDesc
                                  : '-normal'}`}
                            />
                          </th>
                          <th
                            onClick={event =>
                              this.sorterFunction(event, 'duedate')}
                            className="hidden-xs-table">
                            Due Date
                             <i
                              className={`table-sorter 
                              ${sortBy === 'duedate' ?
                                  sortDesc
                                  : '-normal'}`}
                            />
                          </th>
                          <th
                            onClick={event =>
                              this.sorterFunction(event, 'returndate')}
                          >
                            Status
                            <i
                              className={`table-sorter 
                              ${sortBy === 'returndate' ?
                                  sortDesc
                                  : '-normal'}`}
                            />
                          </th>
                        </tr>
                      </thead>
                      <BorrowedBooksList
                        borrowedList={fetchedBorrowedBooks}
                        returnBookFunction={this.returnBookFunction}
                      />
                    </table>
                  </div>
                  <div className="pagination-view">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      paginationFunction={this.paginationFunction}
                    />
                    <PerPage
                      limit={parseInt(limit, 10)}
                      perPageFunction={this.perPageFunction}
                    />
                  </div>
                </div>
              )}
              {isLoading &&
                (
                  <div className="row borrow-table">
                    <div className="table-outer">
                      <LoadingBar />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ProfilePage.defaultProps = {
  error: null,
  fetchedBorrowedBooks: [],
  totalPages: 1
};
ProfilePage.propTypes = {
  retrieveBorrowHistory: PropTypes.func.isRequired,
  returnBook: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
  userId: PropTypes.number.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  fetchedBorrowedBooks: PropTypes.arrayOf(PropTypes.object)
};
/**
 * @param {object} state
 *
 * @returns {object} state
 */
function mapStateToProps(state) {
  return {
    userId: state.auth.user.userId,
    displayName:
      `${state.auth.user.firstName} ${state.auth.user.lastName}`,
    fetchedBorrowedBooks: state.borrowHistoryReducer.fetchedBooks,
    totalPages: state.borrowHistoryReducer.totalPages,
    isLoading: state.borrowHistoryReducer.loading,
    hasLoaded: state.borrowHistoryReducer.loaded,
    error: state.borrowHistoryReducer.error
  };
}
export default connect(mapStateToProps,
  { retrieveBorrowHistory, returnBook })(ProfilePage);
