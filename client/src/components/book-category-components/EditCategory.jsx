import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  bookCategoryRequest,
  fetchCategoryList,
  deleteCategory
} from
  '../actions/categoryActions';
import { fetchAllBooks }
  from '../actions/loadBooks';


export class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bookList: [],
      bookForCategory: 'Add Book',
      bookCategories: this.props.bookCategories,
      bookCategorySelect: 'Select Category'
    };
  }
  componentDidMount() {
    this.props.fetchCategoryList();
    this.loadAllBooks();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      bookList: nextProps.bookList,
      bookCategories: nextProps.bookCategories
    });
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  loadAllBooks = () => {
    this.props.fetchAllBooks();
  }
  addToCategory = (event) => {
    event.preventDefault();
    const {
      bookCategorySelect,
      bookForCategory } = this.state;
    this.props.bookCategoryRequest({
      categoryId: bookCategorySelect,
      bookId: bookForCategory
    });
  }
  deleteCategory = (event) => {
    event.preventDefault();
    const { bookCategorySelect } = this.state;
    this.props.deleteCategory(bookCategorySelect);
  };
  render() {
    return (
      <div id="EditCategory" className="tabs-item">
        <div className="tabs-item-content">
          <h2 className="tabs-title">
            Edit<span>Category...</span>
          </h2>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <select
                  name="bookCategorySelect"
                  onChange={this.onChange}
                  value={this.state.bookCategorySelect}
                >
                  <option
                    defaultValue
                    disabled
                    value="Select Category"
                  >
                    Select Category
                    </option>
                  {this.state.bookCategories.map(category =>
                    (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.categoryName}
                      </option>
                    )
                  )}
                </select>
                <i className="bar" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {this.state.bookCategorySelect !== 'Select Category'
                &&
                <div className="button-container">
                  <button
                    disabled={this.state.isLoading ||
                      this.state.invalid}
                    onClick={this.deleteCategory}
                    className="button btn">
                    <span>Delete Category</span>
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {this.state.bookCategorySelect !== 'Select Category'
                &&
                <div className="book-list">
                  <select
                    name="bookForCategory"
                    onChange={this.onChange}
                    value={this.state.bookForCategory}
                  >
                    <option
                      defaultValue
                      disabled
                      value="Add Book"
                    >
                      Add Book
                    </option>
                    {this.state.bookList.map(book =>
                      (
                        <option
                          key={book.id}
                          value={book.id}
                        >
                          {book.bookName} {book.ISBN}
                        </option>
                      ))
                    }
                  </select>
                  <div className="row">
                    <div className="col-md-6">
                      {this.state.bookForCategory !== 'Add Book' &&
                        <div className="button-container">
                          <button
                            disabled={this.state.isLoading ||
                              this.state.invalid}
                            onClick={this.addToCategory}
                            className="button btn">
                            <span>Add Book To Category</span>
                          </button>
                        </div>
                      }
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditCategory.propTypes = {
  bookCategories: PropTypes.array,
  bookList: PropTypes.array,
  bookCategoryRequest: PropTypes.func.isRequired,
  fetchAllBooks: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  fetchCategoryList: PropTypes.func.isRequired,
};
EditCategory.defaultProps = {
  bookCategories: [],
  bookList: []
};
EditCategory.contextTypes = {
  router: PropTypes.object.isRequired
};
/**
 * @param {object} state
 *
 * @returns {object} nextprops
 */
function mapStateToProps(state) {
  return {
    bookCategories: state.bookCategoryListReducer.bookCategories,
    bookList: state.allBooksReducer.bookList,
  };
}
export default connect(
  mapStateToProps, {
    bookCategoryRequest,
    fetchCategoryList,
    deleteCategory,
    fetchAllBooks
  })(EditCategory);
