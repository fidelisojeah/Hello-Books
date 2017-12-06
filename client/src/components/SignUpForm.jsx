import React from 'react';
import PropTypes from 'prop-types';

import UserHelper from '../../../server/helpers/user-signup';
import TextField from './common/TextField';

class SignUpForm extends React.Component {
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
    if (this.state.password !== this.state.passwordConfirmation) {
      const errors = this.state.errors;
      errors.password = 'Passwords Mismatch';
      errors.passwordConfirmation = 'Passwords Mismatch';
      this
        .setState({ errors, invalid: Object.keys(errors).length !== 0 });
      return;
    }
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
                  inputError: error.response.data.inputError,
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
            inputError: error.field,
            message: error.message,
          },
        });
      });
  }
  passwordLengthCheck = (event) => {
    event.preventDefault();
    const inputError = event.target.name;
    const errors = this.state.errors;

    if (event.target.value.length < 6) {
      errors[inputError] = 'Password too Short';
    } else {
      delete errors[inputError];
    }
    this.setState({ errors, invalid: Object.keys(errors).length !== 0 });
  }
  passwordConfirmationCheck = (event) => {
    event.preventDefault();

    const inputError = event.target.name;
    const errors = this.state.errors;


    if (event.target.value !== this.state.password) {
      errors[inputError] = 'Passwords Mismatch';
    } else {
      delete errors[inputError];
    }
    this.setState({ errors, invalid: Object.keys(errors).length !== 0 });
  }
  checkUserExists(event) {
    const inputError = event.target.name;
    const val = event.target.value;
    if (val !== '') {
      this.props
        .isUserExists(val)
        .then((result) => {
          const errors = this.state.errors;
          if (result.data.userHere) {
            errors[inputError] = `${inputError} already taken`;
          } else {
            delete errors[inputError];
          }
          this.setState({ errors, invalid: Object.keys(errors).length !== 0 });
        });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <TextField
            inputError={errors.inputError}
            errorMessage={errors.message}
            label="First Name"
            field="firstname"
            onChange={this.onChange}
            value={this.state.firstname}
            formField="form-group col-xs-6"
            isRequired
            type="text"
          />
          <TextField
            inputError={errors.inputError}
            errorMessage={errors.message}
            label="Last Name"
            field="lastname"
            onChange={this.onChange}
            value={this.state.lastname}
            formField="form-group col-xs-6"
            isRequired
            type="text"
          />
        </div>
        <div className="row">
          <TextField
            inputError={errors.inputError}
            errorMessage={errors.message}
            errField={errors.username}
            label="Username"
            field="username"
            onChange={this.onChange}
            value={this.state.username}
            checkExists={this.checkUserExists}
            formField="form-group"
            isRequired
            type="text"
          />
        </div>
        <div className="row">
          <TextField
            inputError={errors.inputError}
            errorMessage={errors.message}
            errField={errors.email}
            label="Email Address"
            field="email"
            onChange={this.onChange}
            value={this.state.email}
            checkExists={this.checkUserExists}
            formField="form-group"
            isRequired
            type="email"
          />
        </div>
        <div className="row">
          <TextField
            inputError={errors.inputError}
            errorMessage={errors.message}
            label="Phone Number"
            field="phone"
            onChange={this.onChange}
            value={this.state.phone}
            formField="form-group"
            isRequired={false}
            type="phone"
          />
        </div>
        <div className="row">
          <TextField
            inputError={errors.inputError}
            errorMessage={errors.message}
            errField={errors.password}
            label="Password"
            field="password"
            onChange={this.onChange}
            value={this.state.password}
            checkExists={this.passwordLengthCheck}
            formField="form-group"
            isRequired
            type="password"
          />
        </div>
        <div className="row">
          <TextField
            inputError={errors.inputError}
            errorMessage={errors.message}
            errField={errors.passwordConfirmation}
            label="Confirm Password"
            checkExists={this.passwordConfirmationCheck}
            field="passwordConfirmation"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            formField="form-group"
            isRequired
            type="password"
          />
        </div>
        <div className="button-container">
          <button
            disabled={this.state.isLoading ||
              this.state.invalid}
            className="button btn">
            <span>Register</span>
          </button>
        </div>
      </form >
    );
  }
}
SignUpForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
};
SignUpForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default SignUpForm;
