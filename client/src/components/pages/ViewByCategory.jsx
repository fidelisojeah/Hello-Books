import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../actions/login';

import LayoutHeader from '../common/LayoutHeader';
import BookGrid from '../common/BookGrid';
import BreadCrumbs from '../common/BreadCrumbs';
import LoadingPage from './LoadingPage';

import {
  clearAllBookState,
  fetchBooks,
  viewBookByCategory
} from '../actions/loadBooks';
import {
  fetchCategoryList,
  removeBookFromCategory
} from '../actions/categoryActions';

import NotFoundComponent from '../common/NotFoundComponent';

export class ViewByCategory extends React.Component {
  constructor(props) {
    super(props);
    const pageLinks = [];
    this.timeOutClear = null;

    pageLinks.push({
      linkName: 'Home',
      link: ''
    });
    pageLinks.push({
      linkName: 'Library',
      link: 'books'
    });
    this.state = {
      categoryId: this.props.match.params.categoryId,
      limit: 10,
      page: 1,
      totalBooks: 0,
      totalPages: 1,
      sort: 'newest',
      allBooks: [],
      title: 'Categories',
      titleGrid: 'All In Library',
      pageLinks
    };
  }
  componentDidMount() {
    this.fetchAll();
    this.props.fetchCategoryList();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error.status === 504) {
      if (!this.timeOutClear) {
        this.timeOutClear =
          window
            .setInterval(this.refreshOnTimeOutError, 10000);
      }
    } else if (nextProps.error &&
      nextProps.error.message === 'unauthenticated') {
      this.props.logout();
      this.context.router.history.push('/signin');
    } else {
      window.clearInterval(this.timeOutClear);
      const { categoryId } = this.state;
      const title = nextProps.bookCategories.find(o => o.id === categoryId).categoryName || 'Categories'
      this.setState({
        error: nextProps.error,
        title,
        titleGrid: title === 'Categories' ? 'All In Library' : `All ${title} Books`,
        bookCategories: nextProps.bookCategories,
        fetching: nextProps.fetching,
        totalBooks: nextProps.totalBooks,
        totalPages: nextProps.totalPages
      });
    }
  }
  componentWillUnmount() {
    window.clearInterval(this.timeOutClear);
    this.props.clearAllBookState();
  }
  refreshOnTimeOutError = () => {
    this.fetchAll();
  }
  fetchAll = () => {
    const { categoryId } = this.props.match.params;
    if (categoryId) {
      this.props.viewBookByCategory(
        {
          categoryId,
          page: this.state.page,
          limit: this.state.limit,
          sort: this.state.sort
        }
      );
    } else {
      this.props.fetchBooks(
        this.state.page,
        this.state.limit,
        this.state.sort
      );
    }
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
        page: 1,
        limit: index
      }, () => {
        this.fetchAll();
      });
    }
  }
  removeFromCategory = (event, book) => {
    event.preventDefault();
    const { categoryId } = this.props.match.params;
    if (categoryId) {
      this.props.removeBookFromCategory({
        categoryId,
        bookId: book
      });
    }
  }
  render() {
    if (this.state.fetching) {
      return (
        <LoadingPage />
      );
    }
    if (this.state.error
      && this.state.error.message === 'No Books in Category') {
      return (
        <NotFoundComponent
          title={this.state.error.message}
          errorMessage="No Books in Category"
          links={this.state.pageLinks}
        />
      );
    }
    const {
      totalBooks,
      allBooks,
      isAdmin
     } = this.props;
    const { page,
      totalPages,
      limit,
      pageLinks,
      sort,
      title,
      titleGrid
    } = this.state;
    const { categoryId } = this.props.match.params;
    return (
      <div className="layout--container -categories">
        <LayoutHeader
          headerTitle={title}
        />
        <BreadCrumbs
          breadCrumbLinks={pageLinks}
        />
        <BookGrid
          limit={limit}
          allowEdit={(categoryId && isAdmin)}
          page={page}
          totalPages={totalPages}
          removeFromCategory={this.removeFromCategory}
          totalBooks={totalBooks}
          allBooks={allBooks}
          perPageFunction={this.perPageFunction}
          paginationFunction={this.paginationFunction}
          sortFunction={this.sortFunction}
          sort={sort}
          title={titleGrid}
        />
      </div>
    );
  }
}
ViewByCategory.propTypes = {
  allBooks: PropTypes.arrayOf(PropTypes.object),
  bookCategories: PropTypes.array,
  clearAllBookState: PropTypes.func.isRequired,
  error: PropTypes.object,
  fetchBooks: PropTypes.func.isRequired,
  fetchCategoryList: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  removeBookFromCategory: PropTypes.func.isRequired,
  totalBooks: PropTypes.number,
  totalPages: PropTypes.number,
  viewBookByCategory: PropTypes.func.isRequired,
};
ViewByCategory.contextTypes = {
  router: PropTypes.object.isRequired,
};
ViewByCategory.defaultProps = {
  bookCategories: [],
  totalBooks: 0,
  error: null,
  isAdmin: false,
  allBooks: null,
  totalPages: 0
};
/**
 * @param {object} state
 *
 * @returns {object} nextprops
 */
function mapStateToProps(state) {
  return {
    isAdmin: (state.auth.user.role === 'Admin'),
    allBooks: state.bookReducer.fetchedBooks.bookLists,
    bookCategories: state.bookCategoryListReducer.bookCategories,
    fetching: state.bookReducer.fetching,
    fetched: state.bookReducer.fetched,
    totalPages: state.bookReducer.fetchedBooks.totalPages,
    totalBooks: state.bookReducer.fetchedBooks.totalBooksCount,
    error: state.bookReducer.error
  };
}
export default connect(mapStateToProps, {
  clearAllBookState,
  logout,
  viewBookByCategory,
  fetchBooks,
  fetchCategoryList,
  removeBookFromCategory
})(ViewByCategory);
