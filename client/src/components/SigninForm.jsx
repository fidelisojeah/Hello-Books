import React from 'react';
import PropTypes from 'prop-types';

import UserHelper from '../../../server/helpers/user-signup';
import TextField from './common/TextField';


class SignInForm extends React.Component {
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
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    UserHelper
      .validateSignin(this.state.username,
      this.state.password)
      .then(() => {
        this.setState({ errors: {}, isLoading: true });
        this.props
          .userLogin(this.state)
          .then(() => {
            this
              .props
              .addFlashMessage({
                type: 'Successful',
                text: 'Signin Successful',
              });
            this.context.router.history.push('/Books');
          })
          .catch((errors) => {
            if (errors.response.data.message ===
              'Email Address not Verified') {
              this
                .props
                .addFlashMessage({
                  type: errors.response.data.status,
                  text: errors.response.data.message,
                });
              this.context.router.history.push('/success');
            } else {
              this.setState({
                errors: {
                  errorStat: errors.response.data.status,
                  message: errors.response.data.message,
                },
                isLoading: false,
              });
            }
          });
      })
      .catch((error) => {
        this.setState({
          errors: {
            inputError: error.field,
            message: error.message,
          },
          isLoading: false,
        });
      });
  }
  render() {
    const { errors } = this.state;
    return (

      <form onSubmit={this.onSubmit}>

        {errors.errorStat === 'Unsuccessful' &&
          <div className="login-error">{errors.message}</div>
        }


        <TextField
          inputError={errors.inputError}
          errorMessage={errors.message}
          label="Username / Email Address"
          onChange={this.onChange}
          field="username"
          value={this.state.username}
          formField="form-group"
          isRequired
          type="text"
        />


        <TextField
          inputError={errors.inputError}
          errorMessage={errors.message}
          label="Password"
          field="password"
          onChange={this.onChange}
          value={this.state.password}
          formField="form-group"
          isRequired
          type="password"
        />
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
SignInForm.propTypes = {
  userLogin: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

SignInForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default SignInForm;
