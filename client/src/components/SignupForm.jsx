import React from 'react';
import PropTypes from 'prop-types';

import userHelper from '../../../server/helpers/user-signup';
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
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    userHelper.validateSignup(this.state.username,
      this.state.password,
      this.state.lastname,
      this.state.firstname,
      this.state.email)
      .then(() => {
        this.setState({ errors: {}, isLoading: true });
        this.props.userSignupRequest(this.state)
          .then((response) => {
            this.setState({ response: response.data, isLoading: false });
          })
          .catch((error) => {
            if (error.response) {
              this.setState({ errors: error.response.data, isLoading: false });
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
            label="Username"
            field="username"
            onChange={this.onChange}
            value={this.state.username}
            formField="form-group"
            isReq
            type="text"
          />
        </div>
        <div className="row">
          <TextField
            errorField={errors.errorField}
            errorMessage={errors.message}
            label="Email Address"
            field="email"
            onChange={this.onChange}
            value={this.state.email}
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
          <button disabled={this.state.isLoading} className="button btn">
            <span>Register</span>
          </button>
        </div>
      </form >
    );
  }
}
SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
};
export default SignupForm;
