import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField';

/**
 *
 * @param {object} props {onSubmit}
 *
 * @returns {JSX} JSX element (sign in form)
 */
function SignUpForm(props) {
  const {
    checkUserExists,
    email,
    errors,
    isLoading,
    signUpUsername,
    firstname,
    lastname,
    passwordConfirmation,
    passwordLengthCheck,
    passwordConfirmationCheck,
    signUpPassword,
    onChange
   } = props;
  return (
    <form onSubmit={props.onSubmit}>
      <div className="row">
        <TextField
          inputError={errors.inputError}
          errorMessage={errors.message}
          label="First Name"
          field="firstname"
          onChange={onChange}
          value={firstname}
          formField="form-group col-xs-6"
          isRequired
          type="text"
        />
        <TextField
          inputError={errors.inputError}
          errorMessage={errors.message}
          label="Last Name"
          field="lastname"
          onChange={onChange}
          value={lastname}
          formField="form-group col-xs-6"
          isRequired
          type="text"
        />
      </div>
      <div className="row">
        <TextField
          errorMessage={errors.message}
          errField={errors.signUpUsername}
          field="signUpUsername"
          formField="form-group"
          label="Username"
          inputError={errors.inputError}
          checkExists={checkUserExists}
          autocomplete="false"
          onChange={onChange}
          isRequired
          type="text"
          value={signUpUsername}
        />
      </div>
      <div className="row">
        <TextField
          inputError={errors.inputError}
          errField={errors.email}
          label="Email Address"
          field="email"
          errorMessage={errors.message}
          onChange={onChange}
          value={email}
          checkExists={checkUserExists}
          formField="form-group"
          isRequired
          type="email"
        />
      </div>
      <div className="row">
        <TextField
          errorMessage={errors.message}
          errField={errors.signUpPassword}
          field="signUpPassword"
          formField="form-group"
          label="Password"
          inputError={errors.inputError}
          checkExists={passwordLengthCheck}
          onChange={onChange}
          isRequired
          type="password"
          value={signUpPassword}
          autocomplete="new-password"
        />
      </div>
      <div className="row">
        <TextField
          inputError={errors.inputError}
          errorMessage={errors.message}
          errField={errors.passwordConfirmation}
          label="Confirm Password"
          checkExists={passwordConfirmationCheck}
          field="passwordConfirmation"
          onChange={onChange}
          value={passwordConfirmation}
          formField="form-group"
          isRequired
          type="password"
          autocomplete="false"
        />
      </div>
      <div className="row">

        <div
          className="button-container"
        >
          <button
            className="button btn"
            disabled={isLoading}
          >
            <span>Register</span>
          </button>
        </div>
      </div>
    </form>
  );
}
SignUpForm.defaultProps = {
  email: '',
  errors: {},
  firstname: '',
  lastname: '',
  passwordConfirmation: '',
  signUpPassword: '',
  signUpUsername: '',
};
SignUpForm.propTypes = {
  checkUserExists: PropTypes.func.isRequired,
  email: PropTypes.string,
  errors: PropTypes.object,
  firstname: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  lastname: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  passwordConfirmation: PropTypes.string,
  passwordConfirmationCheck: PropTypes.func.isRequired,
  passwordLengthCheck: PropTypes.func.isRequired,
  signUpPassword: PropTypes.string,
  signUpUsername: PropTypes.string,
};
export default SignUpForm;
