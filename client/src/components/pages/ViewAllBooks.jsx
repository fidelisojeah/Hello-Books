import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookCard from '../common/BookCard';
import Sorter from '../common/Sorter';
import Pagination from '../common/Pagination';
import PerPage from '../common/PerPage';
import { fetchBooks } from '../actions/loadBooks';
import { logout } from '../actions/login';
import BreadCrumbs from '../common/BreadCrumbs';

import LoadingPage from './LoadingPage';

class ViewAllBooks extends React.Component {
  constructor(props) {
    super(props);
    const pageLinks = [];
    pageLinks.push({
      linkName: 'Home',
      link: ''
    });
    pageLinks.push({
      linkName: 'Library',
      link: 'books'
    });

    this.state = {
      limit: 10,
      page: 1,
      totalBooks: 0,
      totalPages: 1,
      sort: 'newest',
      allBooks: [],
      pageLinks
    };
  }
  componentDidMount() {
    this.fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error &&
      nextProps.error.message) {
      // extra check cos why not?
      // ideally, this should never happen
      this.props.logout();
      this.context.router.history.push('/signin');
    } else {
      this.setState({
        totalBooks: nextProps.totalBooks,
        totalPages: nextProps.totalPages
      });
    }
  }
  fetchAll() {
    this.props.fetchBooks(
      this.state.page,
      this.state.limit,
      this.state.sort
    );
  }
  sortFunction = (event, index) => {
    event.preventDefault();
    if (index !== this.state.sort) {
      this.setState({
        sort: index
      }, () => {
        this.fetchAll();
      });
    }
  }
  paginationFunction = (event, index) => {
    event.preventDefault();
    if (index !== this.state.page) {
      this.setState({
        page: index
      }, () => {
        this.fetchAll();
      });
    }
  }
  perPageFunction = (event, index) => {
    event.preventDefault();
    if (index !== this.state.limit) {
      this.setState({
        limit: index
      }, () => {
        this.fetchAll();
      });
    }
  }
  render() {
    if (!this.props.allBooks) {
      return (
        <LoadingPage />
      );
    }
    const { totalBooks, allBooks } = this.props;
    const { page,
      totalPages,
      limit,
      pageLinks, sort } = this.state;
    return (
      <div className="layout--container">
        <div className="layout-header">
          <div className="container">
            <h1 className="page_header--title">
              Library
            </h1>
          </div>
        </div>
        <BreadCrumbs
          breadCrumbLinks={pageLinks}
        />
        <div className="section">
          <div>
            <div className="list-books">
              <div className="container-fluid">
                All Books in Library
              </div>
              <div className="categories-sorter c-row">
                <div className="c-left">
                  {totalBooks} Book
                  {totalBooks > 1 && 's'}</div>
                <Sorter
                  sortFunction={this.sortFunction}
                  sortType={sort}
                />

              </div>
              <ul className="book-grid">
                {Array.isArray(allBooks) && allBooks.map(bookInfos =>
                  (<BookCard
                    key={bookInfos.id}
                    bookName={bookInfos.bookName}
                    bookID={bookInfos.id}
                    synopsis={bookInfos.description}
                    ratingSum={(bookInfos.RatingSum === null) ?
                      'empty' :
                      bookInfos.RatingSum}
                    ratingCount={bookInfos.RatingCount}
                    imgHref={bookInfos.bookImage}
                    bookAuthors={bookInfos.Authors}
                  />),
                )}
              </ul>
            </div>
          </div>
          <div className="pagination-view container">
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
      </div>
    );
  }
}
ViewAllBooks.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  totalBooks: PropTypes.number,
  totalPages: PropTypes.number,
  allBooks: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.objectOf(PropTypes.string),
  logout: PropTypes.func.isRequired,
};
ViewAllBooks.contextTypes = {
  router: PropTypes.object.isRequired,
};
ViewAllBooks.defaultProps = {
  totalBooks: 0,
  error: null,
  allBooks: null,
  totalPages: 0
};

/**
 * @param {*} state
 * @returns {object} nextprops
 */
function mapStateToProps(state) {
  return {
    allBooks: state.bookReducer.fetchedBooks.bookLists,
    totalPages: state.bookReducer.fetchedBooks.totalPages,
    totalBooks: state.bookReducer.fetchedBooks.totalBooksCount,
    error: state.bookReducer.error
  };
}

export default connect(mapStateToProps, { fetchBooks, logout })(ViewAllBooks);
