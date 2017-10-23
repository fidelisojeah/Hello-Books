import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BookCard from '../common/BookCard';
import Sorter from '../common/Sorter';
import Pagination from '../common/Pagination';
import PerPage from '../common/PerPage';
import { fetchBooks } from '../actions/loadBooks';

class ViewAllBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 1,
      totalBooks: 0,
      totalPages: 1,
      sort: 'newest',
      allBooks: [],
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
        <div className="layout--container">
          <div className="layout-header">
            <div className="container">
              <h1 className="page_header--title">
                Loading
            </h1>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs--list">
                <li className="breadcrumbs--item">
                  <Link to="/books" className="breadcrumbs--link">
                    Home
                </Link>
                </li>
                <li className="breadcrumbs--item">
                  <Link to="/allbooks" className="breadcrumbs--link">
                    Library
                </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
    return (
      <div className="layout--container">
        <div className="layout-header">
          <div className="container">
            <h1 className="page_header--title">
              Library
            </h1>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs--list">
              <li className="breadcrumbs--item">
                <Link to="/books" className="breadcrumbs--link">
                  Home
                </Link>
              </li>
              <li className="breadcrumbs--item">
                <Link to="/allbooks" className="breadcrumbs--link">
                  Library
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="section">
          <div>
            <div className="list-books">
              <div className="container-fluid">
                All Books in Library
              </div>
              <div className="categories-sorter c-row">
                <div className="c-left">
                  {this.props.totalBooks} Book
                  {this.props.totalBooks > 1 && 's'}</div>
                <Sorter
                  sortFunction={this.sortFunction}
                  sortType={this.state.sort}
                />

              </div>
              <ul className="book-grid">
                {this.props.allBooks.map(bookInfos =>
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
              currentPage={this.state.page}
              totalPages={this.state.totalPages}
              paginationFunction={this.paginationFunction}
            />
            <PerPage
              limit={parseInt(this.state.limit, 10)}
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
  error: PropTypes.objectOf(PropTypes.string)
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

export default connect(mapStateToProps, { fetchBooks })(ViewAllBooks);
