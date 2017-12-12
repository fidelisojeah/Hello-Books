import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import TextField from './common/TextField';


class NewAuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      authorAKA: '',
      authorDOB: '',
      errors: {},
      isLoading: false,
      invalid: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this
      .props
      .newAuthorRequest(this.state)
      .then((response) => {
        swal(
          'Great',
          response.data.message,
          'success'
        );
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
        }
      });
  }
  render() {
    const { errors } = this.state;
    return (
      <div id="NewAuth" className="tabs-item">
        <div className="tabs-item-content">
          <h2 className="tabs-title">
            New<span>
              author...
              </span>
          </h2>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  inputError={errors.inputError}
                  errorMessage={errors.message}
                  label="Author Firstname"
                  onChange={this.onChange}
                  field="firstname"
                  value={this.state.firstname}
                  formField="form-group"
                  isRequired
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  inputError={errors.inputError}
                  errorMessage={errors.message}
                  label="Author Lastname"
                  onChange={this.onChange}
                  field="lastname"
                  value={this.state.lastname}
                  formField="form-group"
                  isRequired
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  inputError={errors.inputError}
                  errorMessage={errors.message}
                  label="Known as..."
                  onChange={this.onChange}
                  field="authorAKA"
                  isRequired={false}
                  value={this.state.authorAKA}
                  formField="form-group"
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  inputError={errors.inputError}
                  errorMessage={errors.message}
                  label="Date of Birth"
                  onChange={this.onChange}
                  field="authorDOB"
                  value={this.state.authorDOB}
                  formField="form-group"
                  isRequired={false}
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="button-container">
                  <button
                    disabled={this.state.isLoading ||
                      this.state.invalid}
                    className="button btn">
                    <span>Create Author</span>
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
NewAuthorForm.propTypes = {
  newAuthorRequest: PropTypes.func.isRequired
};
NewAuthorForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default NewAuthorForm;
