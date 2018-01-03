import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField';

/**
 *
 * @param {object} props {signInPassword,signInUsername, etc}
 *
 * @returns {JSX} JSX element (sign in form)
 */
function SignInForm(props) {
  const { errors,
    isLoading,
    signInUsername,
    signInPassword,
    onChange
   } = props;
  return (
    <form onSubmit={props.onSubmit}>
      {errors.errorStat === 'Unsuccessful' &&
        <div className="login-error">{errors.message}</div>
      }
      <div className="row">
        <TextField
          errorMessage={errors.message}
          field="signInUsername"
          formField="form-group"
          label="Username / Email Address"
          inputError={errors.inputError}
          onChange={onChange}
          isRequired
          type="text"
          value={signInUsername}
        />
      </div>
      <div className="row">
        <TextField
          errorMessage={errors.message}
          field="signInPassword"
          formField="form-group"
          label="Password"
          inputError={errors.inputError}
          onChange={props.onChange}
          isRequired
          type="password"
          value={signInPassword}
          autocomplete="new-password"
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
            <span>Signin</span>
          </button>
        </div>
      </div>
    </form>
  );
}
SignInForm.defaultProps = {
  errors: {},
  signInPassword: '',
  signInUsername: ''
};
SignInForm.propTypes = {
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  signInPassword: PropTypes.string,
  signInUsername: PropTypes.string,
};
export default SignInForm;
