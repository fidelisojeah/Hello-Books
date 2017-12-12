import React from 'react';
import PropTypes from 'prop-types';

import TextField from './common/TextField';
import BookVerify from '../../../server/helpers/new-book';
import AuthorSearch from './common/AuthorSearch';

import ImageUploader from './common/ImageUploader';


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
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: [], isLoading: true });
    BookVerify
      .checkNewBookVariables(
      this.state.bookname,
      this.state.ISBN,
      this.state.publishyear,
      this.state.description,
      this.state.image,
      1,
      this.state.authorIds
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
            this.setState({
              bookname: '',
              ISBN: '',
              publishyear: '',
              description: '',
              errors: [],
              image: '',
              uploadedImage: null,
              authorIds: '',
              isLoading: false
            });
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
  handleAuthorChange = (value) => {
    this.setState({
      authorIds: value
    });
  }
  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      uploadedImage: null,
      image: ''
    });
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
  render() {
    const { errors,
      ISBN,
      publishyear,
      description,
      image, isLoading,
      invalid
     } = this.state;
    return (
      <div id="NewBook" className="tabs-item active">
        <div className="tabs-item-content">
          <h2 className="tabs-title">
            New<span>
              book...
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
                  value={publishyear}
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
            <ImageUploader
              handleClick={this.handleClick}
              image={image}
              isLoading={isLoading}
              multiple={false}
              onImageDrop={this.onImageDrop}
              uploadText="Upload Book Image"
            />
            <div className="row">
              <div className="col-md-3">
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
  checkAuthorsRequest: PropTypes.func.isRequired
};

NewBookForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default NewBookForm;
