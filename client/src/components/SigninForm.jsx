import React from 'react';
import PropTypes from 'prop-types';

import userHelper from '../../../server/helpers/user-signup';
import TextField from './common/TextField';


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
          .userLogin(this.state)
          .then(() => {
            this.context.router.history.push('/success');
            // console.log(response);
          })
          .catch((errorStuff) => {
            if (errorStuff.response.data.message === 'Email Address not Verified') {
              this
                .props
                .addFlashMessage({
                  type: errorStuff.response.data.status,
                  text: errorStuff.response.data.message,
                });
              this.context.router.history.push('/success');
            } else {
              this.setState({
                errors: {
                  errorStat: errorStuff.response.data.status,
                  message: errorStuff.response.data.message,
                },
                isLoading: false,
              });
            }
          });
      })
      .catch((error) => {
        this.setState({
          errors: {
            errorField: error.field,
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
SigninForm.propTypes = {
  userLogin: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

SigninForm.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default SigninForm;
