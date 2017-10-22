import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BookCard from '../common/BookCard';
import { fetchBooks } from '../actions/loadBooks';

class ViewAllBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      page: 1,
      totalBooks: null,
      totalPages: null,
      sort: 'newest',
      allBooks: [],
    };
  }
  componentDidMount() {
    this.props.fetchBooks(
      this.state.page,
      this.state.limit,
      this.state.sort
    );
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
                  <a href="/" className="breadcrumbs--link">
                    Home
                </a>
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
              Some stuff
            </h1>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs--list">
              <li className="breadcrumbs--item">
                <a href="/" className="breadcrumbs--link">
                  Home
                </a>
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
                <div className="c-right">
                  <a
                    href=""
                    className={this.state.sort === 'newest' &&
                      '-active'
                    }
                  >
                    Newest
                    </a>
                  <a
                    href=""
                    className={this.state.sort === 'rating' &&
                      '-active'
                    }
                  >
                    Rating
                  </a>
                  <a
                    href=""
                    className={this.state.sort === 'alphabetical' &&
                      '-active'
                    }
                  >
                    Alphabetical
                  </a>
                </div>

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
