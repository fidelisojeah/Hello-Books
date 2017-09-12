import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import userHelper from '../../../server/helpers/user-signup';

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
          <div className={classnames('form-group col-xs-6', { 'has-error': errors.errorField === 'firstname' })}>
            <input
              type="text"
              value={this.state.firstname}
              required="required"
              name="firstname"
              onChange={this.onChange}
            />
            <label className="control-label" htmlFor="input">First Name</label>
            <i className="bar" />
            {errors.errorField === 'firstname' && <div className="error-field">{errors.message}</div>}
          </div>
          <div className={classnames('form-group col-xs-6', { 'has-error': errors.errorField === 'lastname' })}>
            <input
              type="text"
              value={this.state.lastname}
              required="required"
              name="lastname"
              onChange={this.onChange}
            />
            <label className="control-label" htmlFor="input">Last Name</label>
            <i className="bar" />
            {errors.errorField === 'lastname' && <div className="error-field">{errors.message}</div>}
          </div>
        </div>
        <div className="row">
          <div className={classnames('form-group', { 'has-error': errors.errorField === 'username' })}>
            <input
              value={this.state.username}
              type="text"
              required="required"
              name="username"
              onChange={this.onChange}
            />
            <label className="control-label" htmlFor="input">Username</label>
            <i className="bar" />
            {errors.errorField === 'username' && <div className="error-field">{errors.message}</div>}
          </div>
        </div>
        <div className="row">
          <div className={classnames('form-group', { 'has-error': errors.errorField === 'email' })}>
            <input
              type="email"
              value={this.state.email}
              required="required"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              onChange={this.onChange}
            />
            <label className="control-label" htmlFor="input">Email Address</label>
            <i className="bar" />
            {errors.errorField === 'email' && <div className="error-field">{errors.message}</div>}
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <input
              type="phone"
              value={this.state.phone}
              name="phone"
              onChange={this.onChange}
            />
            <label className="control-label" htmlFor="input">Phone Number</label>
            <i className="bar" />
          </div>
        </div>
        <div className="row">
          <div className={classnames('form-group', { 'has-error': errors.errorField === 'password' })}>
            <input
              type="password"
              value={this.state.password}
              required="required"
              name="password"
              onChange={this.onChange}
            />
            <label className="control-label" htmlFor="input">Password</label>
            <i className="bar" />
            {errors.errorField === 'password' && <div className="error-field">{errors.message}</div>}
          </div>
        </div>
        <div className="row">
          <div className={classnames('form-group', { 'has-error': errors.errorField === 'username' })}>
            <input
              type="password"
              value={this.state.passwordConfirmation}
              required="required"
              name="passwordConfirmation"
              onChange={this.onChange}
            />
            <label className="control-label" htmlFor="input">Confirm Password</label>
            <i className="bar" />
            <div className="error-field" />
          </div>
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
