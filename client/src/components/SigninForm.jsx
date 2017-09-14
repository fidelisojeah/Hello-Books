import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import userHelper from '../../../server/helpers/user-signup';
import TextField from './common/TextField';
import { login } from './actions/login';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    userHelper
      .validateSignin(this.state.username,
      this.state.password)
      .then(() => {
        this.setState({ errors: {}, isLoading: true });
        this.props
          .login(this.state)
          .then(

          )
          .catch((error) => {

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
    const { errors,
      username,
      password,
      isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          errorField={errors.errorField}
          errorMessage={errors.message}
          //  errField={errors.username}
          label="Username / Email Address"
          onChange={this.onChange}
          field="username"
          value={this.state.username}
          formField="form-group"
          isReq
          type="text"
        />


        <TextField
          errorField={errors.errorField}
          errorMessage={errors.message}
          //  errField={errors.username}
          label="Password"
          field="password"
          onChange={this.onChange}
          value={this.state.password}
          formField="form-group"
          isReq
          type="password"
        />
        {/*
        <div className="form-group">
          <input type="text" required="required" name="login-username" />
          <label className="control-label" htmlFor="input">Username</label>
          <i className="bar" />
        </div>
        <div className="form-group">
          <input type="password" required="required" name="login-password" />
          <label className="control-label" htmlFor="input">Password</label>
          <i className="bar" />
        </div>
*/}
        <div
          className="button-container"
        >
          <button
            className="button btn"
            disabled={this.state.isLoading}
          >
            <span>Signin</span>
          </button>
        </div>
      </form >
    );
  }
}
SigninForm.PropTypes = {
  login: PropTypes.func.isRequired,
};
export default connect(null, { login })(SigninForm);
