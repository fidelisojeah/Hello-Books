import React from 'react';
import PropTypes from 'prop-types';

import TextField from './common/TextField';
import BookVerification from '../../../server/helpers/BookVerification';

import AuthorSearch from './common/AuthorSearch';

import CategorySearch from './common/CategorySearch';

import Toastr from './common/Toastr';

import ImageUploader from './common/ImageUploader';
import {
  displayYear
} from './common/calculateMoment';


class NewBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorField: '',
      authorIds: '',
      authorList: [],
      bookAuthors: [],
      bookAuthorDetails: [],
      bookCategories: [],
      bookname: '',
      categoryDetails: [],
      categoryField: '',
      categoryIds: '',
      categoryList: [],
      description: '',
      errors: [],
      image: '',
      quantity: '1',
      ISBN: '',
      isLoading: false,
      publishyear: '',
      uploadedImage: null,
      yearArray: [],
      yearList: [],
      yearListShow: false
    };
  }
  componentDidMount() {
    this.allYears(1900);
  }
  onImageDrop = (images) => {
    this.setState({
      image: '',
      uploadedImage: images[0],
      isLoading: true
    });
    this.handleImageUpload(images[0]);
  }
  onChange = (event) => {
    let yearList = [];

    if (event.target.name === 'quantity' &&
      (/[^1-9]/g.test(event.target.value))
    ) {
      return;
    }
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === 'publishyear') {
      const { yearArray, errors } = this.state;
      errors
        .splice((errors
          .findIndex(val => val.field === 'publishyear')), 1);

      if (event.target.value.length >= 1) {
        const regField = new RegExp(`^${event.target.value}`, 'gm');
        yearList = yearArray.filter(years =>
          regField.test(years)
        );
      }
      this.setState({
        errors,
        yearList,
        yearListShow: true,
      });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: [], isLoading: true });
    BookVerification
      .checkNewBookVariables(
      this.state.bookname,
      this.state.ISBN,
      this.state.publishyear,
      this.state.description,
      this.state.image,
      1,
      this.state.authorIds,
      this.state.categoryIds
      )
      .then(() => {
        this
          .props
          .newBookRequest(this.state)
          .then((response) => {
            Toastr.Success(response.data.message, 4000);
            this.setState({
              bookname: '',
              authorField: '',
              authorIds: '',
              authorList: [],
              bookAuthors: [],
              categoryDetails: [],
              categoryField: '',
              categoryIds: '',
              categoryList: [],
              bookAuthorDetails: [],
              description: '',
              errors: [],
              image: '',
              ISBN: '',
              isLoading: false,
              quantity: '1',
              yearList: [],
              publishyear: '',
              uploadedImage: null,
            });
          })
          .catch((error) => {
            if (error.response.data.message === 'Not allowed') {
              Toastr.Failure('You don\'t have access', 4000);

              this.context.router.history.push('/Books');
            } else if (error.response.data.message === 'Unauthenticated') {
              Toastr.Failure('Try signing in Please', 4000);

              this.context.router.history.push('/signin');
            } else {
              this.setState({
                errors: error,
                isLoading: false
              });
            }
          });
      })
      .catch((error) => {
        this.setState({
          errors: error,
          isLoading: false
        });
      });
  }
  onBlurEvent = () => {
    document.getElementById('listAuthors').style.display = 'none';
  }
  onCategoryBlur = () => {
    document.getElementById('listCategories').style.display = 'none';
  }
  onAuthorChange = (event) => {
    this.setState({ authorField: event.target.value });
    if (event.target.value.length >= 1) {
      document.getElementById('listAuthors').style.display = 'block';
      this
        .props
        .checkAuthorsRequest(event.target.value)
        .then((response) => {
          if (response.data.status === 'Success') {
            this.setState({
              authorList: response.data.bookAuthors,
            });
          } else {
            this.setState({
              authorList: response.data.message,
            });
          }
        })
        .catch(() => {
          this.setState({
            authorList: [],
          });
        });
    } else {
      document.getElementById('listAuthors').style.display = 'none';
      this.setState({
        authorList: [],
      });
    }
  }
  onCategoryChange = (event) => {
    this.setState({ categoryField: event.target.value });
    if (event.target.value.length >= 1) {
      document.getElementById('listCategories').style.display = 'block';
      this
        .props
        .checkCategoryRequest(event.target.value)
        .then((response) => {
          if (response.data.status === 'Success') {
            this.setState({
              categoryList: response.data.foundCategories,
            });
          } else {
            this.setState({
              categoryList: response.data.message,
            });
          }
        })
        .catch(() => {
          this.setState({
            categoryList: [],
          });
        });
    } else {
      document.getElementById('listCategories').style.display = 'none';
      this.setState({
        categoryList: [],
      });
    }
  }

  onAuthorMouseDown = (event, author) => {
    event.preventDefault();
    const bookAuthors = this.state.bookAuthors;
    const bookAuthorDetails = this.state.bookAuthorDetails;

    bookAuthors.push(author.id);

    bookAuthorDetails.push({
      id: author.id,
      name: author.authorAKA
    });
    this.setState({
      authorField: '',
      authorIds: bookAuthors.join(),
      authorList: [],
      bookAuthors,
      bookAuthorDetails,
    });
  }
  onCategoryMouseDown = (event, category) => {
    event.preventDefault();
    const bookCategories = this.state.bookCategories;
    const categoryDetails = this.state.categoryDetails;

    bookCategories.push(category.id);

    categoryDetails.push({
      id: category.id,
      name: category.categoryName
    });
    this.setState({
      categoryField: '',
      categoryIds: bookCategories.join(),
      categoryList: [],
      bookCategories,
      categoryDetails,
    });
  }
  handleYearChangeClick = (event, yearValue) => {
    event.preventDefault();
    const { errors } = this.state;
    errors
      .splice((errors
        .findIndex(val => val.field === 'publishyear')), 1);

    if (yearValue) {
      this.setState({
        errors,
        yearListShow: false,
        publishyear: yearValue.toString()
      });
    }
  }
  publishYearBlur = (event) => {
    const { yearList,
      errors } = this.state;
    if (
      !(/^\d+$/.test(event.target.value)) ||
      !yearList
        .includes(parseInt(event.target.value, 10))) {
      errors.push({
        field: 'publishyear',
        error: 'Please Enter a valid Year'
      });
    } else {
      errors
        .splice((errors
          .findIndex(val => val.field === 'publishyear')), 1);
    }
    this.setState({
      errors,
      yearListShow: false
    });
  }
  validateQuantity = (event) => {
    if (event.target.value === '') {
      this.setState({
        quantity: '1'
      });
    }
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
            image: response.body.secure_url,
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
  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      uploadedImage: null,
      image: ''
    });
  }
  handleAuthorRemove = (event, position) => {
    event.preventDefault();
    const bookAuthorDetails = this.state.bookAuthorDetails;
    const bookAuthors = this.state.bookAuthors;

    bookAuthorDetails.splice(position, 1);
    bookAuthors.splice(position, 1);

    this.setState({
      authorIds: bookAuthors.join(),
      bookAuthors,
      bookAuthorDetails,
    });
  }
  handleCategoryRemove = (event, position) => {
    event.preventDefault();
    const categoryDetails = this.state.categoryDetails;
    const bookCategories = this.state.bookCategories;

    categoryDetails.splice(position, 1);
    bookCategories.splice(position, 1);

    this.setState({
      categoryIds: bookCategories.join(),
      bookCategories,
      categoryDetails,
    });
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
  render() {
    const { errors,
      ISBN,
      publishyear,
      description,
      image,
      quantity,
      isLoading,
      invalid,
      yearListShow,
      yearList
     } = this.state;
    return (
      <div id="NewBook" className="tabs-item active">
        <div className="tabs-item-content">
          <h2 className="tabs-title">
            New<span>
              Book...
              </span>
          </h2>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  label="Book Title..."
                  compoundError={errors}
                  onChange={this.onChange}
                  field="bookname"
                  value={this.state.bookname}
                  formField="form-group"
                  isRequired
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  label="ISBN"
                  compoundError={errors}
                  onChange={this.onChange}
                  field="ISBN"
                  value={ISBN}
                  formField="form-group"
                  isRequired
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <AuthorSearch
                  compoundError={errors}
                  onAuthorMouseDown={this.onAuthorMouseDown}
                  onBlurEvent={this.onBlurEvent}
                  handleAuthorRemove={this.handleAuthorRemove}
                  authorList={this.state.authorList}
                  bookAuthorDetails={this.state.bookAuthorDetails}
                  bookAuthors={this.state.bookAuthors}
                  authorField={this.state.authorField}
                  onAuthorChange={this.onAuthorChange}
                  handleAuthorChange={this.handleAuthorChange}
                  checkAuthorsRequest={this.props.checkAuthorsRequest}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <CategorySearch
                  compoundError={errors}
                  onCategoryMouseDown={this.onCategoryMouseDown}
                  onBlurEvent={this.onCategoryBlur}
                  handleCategoryRemove={this.handleCategoryRemove}
                  categoryList={this.state.categoryList}
                  categoryDetails={this.state.categoryDetails}
                  bookCategories={this.state.bookCategories}
                  categoryField={this.state.categoryField}
                  onCategoryChange={this.onCategoryChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 publish-year-book">
                <TextField
                  compoundError={errors}
                  checkExists={this.publishYearBlur}
                  label="Publish Year..."
                  onChange={this.onChange}
                  field="publishyear"
                  value={publishyear.toString()}
                  formField="form-group"
                  isRequired={false}
                  autocomplete="off"
                  type="text"
                />

                {yearListShow &&
                  <div>
                    <ul
                      className="year-list"
                      id="year-list"
                    >
                      {yearList.map(years => (
                        <li
                          key={years}
                          role="presentation"
                          onMouseDown={event =>
                            this
                              .handleYearChangeClick(event, years)}
                        >
                          <span
                            className="year-list-span"
                          >
                            {years}
                          </span>
                        </li>))}
                    </ul>
                  </div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <TextField
                  label="Quantity"
                  compoundError={errors}
                  onChange={this.onChange}
                  checkExists={this.validateQuantity}
                  field="quantity"
                  value={quantity}
                  formField="form-group"
                  isRequired={false}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  label="Description"
                  compoundError={errors}
                  onChange={this.onChange}
                  field="description"
                  value={description}
                  formField="form-group"
                  isRequired
                  type="textarea"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <ImageUploader
                  handleClick={this.handleClick}
                  image={image}
                  isLoading={isLoading}
                  multiple={false}
                  onImageDrop={this.onImageDrop}
                  uploadText="Upload Book Image"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="button-container">
                  <button
                    disabled={isLoading ||
                      invalid}
                    className="button btn">
                    <span>Add Book</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
NewBookForm.propTypes = {
  bookImageUpload: PropTypes.func.isRequired,
  newBookRequest: PropTypes.func.isRequired,
  checkAuthorsRequest: PropTypes.func.isRequired,
  checkCategoryRequest: PropTypes.func.isRequired,
};

NewBookForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default NewBookForm;
