import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import TextField from './common/TextField';
import BookVerify from '../../../server/helpers/new-book';
import AuthorSearch from './common/AuthorSearch';
import loader from '../images/802.gif';

// TODO:
// ADD authorIds field (hidden etc)
// Create add books action too
// for both this and authorIds:
// add client side field validations

class NewBookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname: '',
      ISBN: '',
      publishyear: '',
      description: '',
      errors: [],
      image: '',
      uploadedImage: null,
      authorIds: '',
      isLoading: false
    };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onImageDrop(images) {
    this.setState({
      uploadedImage: images[0],
      isLoading: true
    });
    // console.log(images);
    this.handleImageUpload(images[0]);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: [], isLoading: true });
    BookVerify
      .checkNewBookVariables(
      this.state.bookname,
      this.state.ISBN,
      this.state.publishyear,
      this.state.description,
      this.state.image,
      1
      )
      .then(() => {
        this
          .props
          .newBookRequest(this.state)
          .then((response) => {
            swal(
              'Great',
              response.data.message,
              'success'
            );
            this.setState({ errors: {}, isLoading: true });
          })
          .catch((error) => {
            if (error.response.data.message === 'Not allowed') {
              swal(
                'Too Bad',
                'You don\'t have access',
                'error'
              );
              this.context.router.history.push('/Books');
            } else if (error.response.data.message === 'Unauthenticated') {
              swal(
                'Too Bad',
                'Try signing in Please',
                'error'
              );
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
  handleAuthorChange(value) {
    this.setState({
      authorIds: value
    });
  }
  handleClick(event) {
    event.preventDefault();
    this.setState({
      uploadedImage: null,
      image: ''
    });
  }
  handleImageUpload(image) {
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
  render() {
    const { errors } = this.state;
    return (
      <div id="NewBook" className="tabs-item active">
        <div className="tabs-item-content">
          <h2 className="tabs-title">
            New <span>
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
                  value={this.state.ISBN}
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
                  handleAuthorChange={this.handleAuthorChange}
                  checkAuthorsRequest={this.props.checkAuthorsRequest}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  label="Publish Year..."
                  compoundError={errors}
                  onChange={this.onChange}
                  field="publishyear"
                  value={this.state.publishyear}
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
                  value={this.state.description}
                  formField="form-group"
                  isRequired
                  type="textarea"
                />
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-3 col-sm-6 col-xs-7"
                style={{
                  verticalAlign: 'middle'
                }}
              >
                <div
                  className="form-group"
                  style={{
                    verticalAlign: 'middle'
                  }}
                >
                  <input
                    type="hidden"
                    required
                    name="image"
                    value={this.state.image}
                  />
                  <Dropzone
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop}>
                    <p>Upload Book Image</p>
                  </Dropzone>
                </div>
              </div>
              <div
                className="col-md-4 col-sm-6 col-xs-4 img-container"
              >
                {this.state.isLoading &&
                  <img
                    src={loader}
                    alt="loading"
                    style={{
                      padding: '50px'
                    }}
                  />
                }
                {this.state.image !== '' &&
                  <img
                    src={this.state.image}
                    alt="uploaded Book"
                    style={{
                      color: 'white',
                      maxWidth: '200px'
                    }}
                  />}
                {this.state.image !== '' &&
                  <i
                    className="x-button"
                    role="presentation"
                    onClick={this.handleClick}
                  />
                }

              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="button-container">
                  <button
                    disabled={this.state.isLoading ||
                      this.state.invalid}
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
  checkAuthorsRequest: PropTypes.func.isRequired
};

NewBookForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default NewBookForm;
