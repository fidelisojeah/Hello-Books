import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import UserHelper from '../../../server/helpers/user-signup';
import TextField from './common/TextField';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passwordConfirmation: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      phone: '',
      errors: {},
      isLoading: false,
      invalid: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    UserHelper
      .validateSignup(this.state.username,
      this.state.password,
      this.state.lastname,
      this.state.firstname,
      this.state.email)
      .then(() => {
        this.setState({ errors: {}, isLoading: true });
        this
          .props
          .userSignupRequest(this.state)
          .then((response) => {
            this
              .props
              .addFlashMessage({
                type: response.data.status,
                text: response.data.message,
              });

            this.context.router.history.push('/success');
          })
          .catch((error) => {
            if (error.response) {
              this.setState({
                errors: {
                  errorField: error.response.data.errorField,
                  message: error.response.data.message,
                  isLoading: false,
                },
              });
            } else if (error.request) {
              this.setState({ errors: error.request, isLoading: false });
            } else {
              this.setState({ errors: error.message, isLoading: false });
            }
          });
      })
      .catch((error) => {
        this.setState({
          errors: {
            errorField: error.field,
            message: error.message,
          },
        });
      });
  }
  checkUserExists(event) {
    const errorField = event.target.name;
    const val = event.target.value;
    if (val !== '') {
      this.props
        .isUserExists(val)
        .then((result) => {
          const errors = this.state.errors;
          if (result.data.userHere) {
            errors[errorField] = `${errorField} already taken`;
          } else {
            delete errors[errorField];
          }
          this.setState({ errors, invalid: !isEmpty(errors) });
        });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <TextField
            errorField={errors.errorField}
            errorMessage={errors.message}
            label="First Name"
            field="firstname"
            onChange={this.onChange}
            value={this.state.firstname}
            formField="form-group col-xs-6"
            isReq
            type="text"
          />
          <TextField
            errorField={errors.errorField}
            errorMessage={errors.message}
            label="Last Name"
            field="lastname"
            onChange={this.onChange}
            value={this.state.lastname}
            formField="form-group col-xs-6"
            isReq
            type="text"
          />
        </div>
        <div className="row">
          <TextField
            errorField={errors.errorField}
            errorMessage={errors.message}
            errField={errors.username}
            label="Username"
            field="username"
            onChange={this.onChange}
            value={this.state.username}
            checkUserExists={this.checkUserExists}
            formField="form-group"
            isReq
            type="text"
          />
        </div>
        <div className="row">
          <TextField
            errorField={errors.errorField}
            errorMessage={errors.message}
            errField={errors.email}
            label="Email Address"
            field="email"
            onChange={this.onChange}
            value={this.state.email}
            checkUserExists={this.checkUserExists}
            formField="form-group"
            isReq
            type="email"
          />
        </div>
        <div className="row">
          <TextField
            errorField={errors.errorField}
            errorMessage={errors.message}
            label="Phone Number"
            field="phone"
            onChange={this.onChange}
            value={this.state.phone}
            formField="form-group"
            isReq={false}
            type="phone"
          />
        </div>
        <div className="row">
          <TextField
            errorField={errors.errorField}
            errorMessage={errors.message}
            label="Password"
            field="password"
            onChange={this.onChange}
            value={this.state.password}
            formField="form-group"
            isReq
            type="password"
          />
        </div>
        <div className="row">
          <TextField
            errorField={errors.errorField}
            errorMessage={errors.message}
            label="Confirm Password"
            field="passwordConfirmation"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            formField="form-group"
            isReq
            type="password"
          />
        </div>
        <div className="button-container">
          <button disabled={this.state.isLoading || this.state.invalid} className="button btn">
            <span>Register</span>
          </button>
        </div>
      </form >
    );
  }
}
SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
};
SignupForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default SignupForm;
