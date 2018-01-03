import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { userLogin } from '../actions/login';

import { userSignupRequest, isUserExists } from '../actions/signupActions';

import UserHelper from '../../../../server/helpers/UserHelper';
import Toastr from '../common/Toastr';


import SignInForm from '../login-page-components/SignInForm';
import LeftSide from '../login-page-components/LeftSide';
import SignUpForm from '../login-page-components/SignUpForm';


export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'sign-in',
      errors: {},
      email: '',
      firstname: '',
      isLoading: false,
      lastname: '',
      passwordConfirmation: '',
      signInError: {},
      signUpError: {},
      signInPassword: '',
      signInUsername: '',
      signUpPassword: '',
      signUpUsername: '',
      invalid: false
    };
  }
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.context.router.history.push('/');
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      signInError
     } = this.state;
    if (nextProps.error) {
      if (nextProps.error.message === 'Email Address not Verified') {
        const content = `<p>Email Address Not yet Verified</p>
        <p>Please Check Your Email for a Verification Email</p>
        <p>Also Check your spam folders too</P>
        `;
        Toastr.Modal('Email Verification Needed', content, false);
        this.setState({
          isLoading: false,
          signInError: {},
          signInPassword: '',
          signInUsername: ''
        });
        return;
      }
      signInError.errorStat = nextProps.error.status;
      signInError.message = nextProps.error.message;
    }
    if (nextProps.isAuthenticated) {
      if (this.props.locationHistory.from) {
        const { pathname } = this.props.locationHistory.from;
        this.context.router.history.push(pathname);
      } else {
        this.context.router.history.push('/');
      }
      return;
    }
    this.setState({
      signInError,
      isLoading: false
    });
  }
  onSubmitSignUp = (event) => {
    event.preventDefault();
    this.setState({
      signUpError: {},
      isLoading: true
    });

    const {
      firstname,
      lastname,
      email,
      passwordConfirmation,
      signUpError,
      signUpPassword,
      signUpUsername,
     } = this.state;
    if (signUpPassword !== passwordConfirmation) {
      signUpError.signUpPassword = 'Passwords Mismatch';
      signUpError.passwordConfirmation = 'Passwords Mismatch';
      this
        .setState({
          signUpError,
          invalid: Object.keys(signUpError).length !== 0,
          isLoading: false
        });
      return;
    }
    UserHelper
      .validateSignup(
      signUpUsername,
      signUpPassword,
      lastname,
      firstname,
      email
      )
      .then(() => {
        this.props
          .userSignupRequest({
            username: signUpUsername,
            password: signUpPassword,
            lastname,
            firstname,
            email
          })
          .then((response) => {
            const toasterContent = `
            <p>${response.data.message}</p>
            <p>Check your email and Verify Account</p>
            `;
            Toastr
              .Modal('Account Created', toasterContent);
            this.resetState();
          })
          .catch((error) => {
            let inputError;
            const { data } = error.response;
            if (data.inputError === 'password') {
              inputError = 'signUpPassword';
            } else if (data.inputError === 'username') {
              inputError = 'signUpUsername';
            } else {
              inputError = data.inputError;
            }
            signUpError[inputError] = data.message;
            this.setState({
              signUpError,
              isLoading: false
            });
          });
      })
      .catch((error) => {
        let inputError;

        if (error.field === 'password') {
          inputError = 'signUpPassword';
        } else if (error.field === 'username') {
          inputError = 'signUpUsername';
        } else {
          inputError = error.field;
        }
        signUpError[inputError] = error.message;
        this.setState({
          signUpError,
          isLoading: false
        });
      });
  }

  onSubmitSignIn = (event) => {
    event.preventDefault();
    const {
      signInPassword,
      signInUsername,
      signInError
    } = this.state;
    this.setState({
      isLoading: true
    });
    UserHelper
      .validateSignin(
      signInUsername,
      signInPassword
      )
      .then(() => {
        this.props.userLogin({
          username: signInUsername,
          password: signInPassword
        });
      })
      .catch((error) => {
        signInError.inputError = error.field;
        signInError.message = error.message;
        this.setState({
          signInError,
          isLoading: false,
        });
      });
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  resetState = () => {
    this.setState({
      errors: {},
      email: '',
      firstname: '',
      isLoading: false,
      lastname: '',
      passwordConfirmation: '',
      signInError: {},
      signUpError: {},
      signInPassword: '',
      signInUsername: '',
      signUpPassword: '',
      signUpUsername: '',
      invalid: false
    });
  }
  passwordLengthCheck = (event) => {
    event.preventDefault();
    const inputError = event.target.name;
    const { signUpError } = this.state;

    if (event.target.value.length < 6) {
      signUpError[inputError] = 'Password too Short';
    } else {
      delete signUpError[inputError];
    }
    this.setState({
      signUpError,
      invalid: Object.keys(signUpError).length !== 0
    });
  }
  passwordConfirmationCheck = (event) => {
    event.preventDefault();

    const inputError = event.target.name;
    const { signUpError,
      signUpPassword } = this.state;

    if (event.target.value !== signUpPassword) {
      signUpError[inputError] = 'Passwords Mismatch';
    } else {
      delete signUpError[inputError];
    }
    this.setState({
      signUpError,
      invalid: Object.keys(signUpError).length !== 0
    });
  }
  checkUserExists = (event) => {
    const inputError = event.target.name;
    const val = event.target.value;
    if (val !== '') {
      this
        .props
        .isUserExists(val)
        .then((result) => {
          const { signUpError } = this.state;
          if (result.data.userHere) {
            signUpError[inputError] =
              `${inputError === 'signUpUsername' ?
                'Username' : inputError} already taken`;
          } else {
            delete signUpError[inputError];
          }
          this.setState({
            signUpError,
            invalid: Object.keys(signUpError).length !== 0
          });
        });
    }
  }
  changeTabs = (event, index) => {
    event.preventDefault();
    const { currentTab } = this.state;
    this.setState({
      currentTab: index
    });
    if (index !== currentTab) {
      this.resetState();
    }
  }
  render() {
    const {
      currentTab,
      email,
      firstname,
      invalid,
      isLoading,
      lastname,
      passwordConfirmation,
      signInError,
      signUpError,
      signInPassword,
      signInUsername,
      signUpPassword,
      signUpUsername,
      } = this.state;
    return (
      <div className="login-page-container">
        <div className="row">
          <div className="col-lg-8 col-sm-7 col-xs-12 left-side">
            <LeftSide />
            {/* <div className="block">
              <strong>
                Borrow your favourite books
              from your Favourite Authors on Hello Books&reg;
              </strong>

            </div> */}
          </div>
          <div className="col-lg-4 col-sm-5 col-xs-12 right-side">
            <div className="form-box">
              <div className="form-top">
                <div className="form-top-left">
                  <button
                    id="sign-in"
                    name="sign-in-tab"
                    onClick={event => this.changeTabs(event, 'sign-in')}
                    className={
                      (currentTab === 'sign-in')
                        ? '-active' : undefined}
                  >
                    <h3
                    >
                      Sign In
                  </h3>
                  </button>
                  <button
                    name="sign-up-tab"
                    onClick={event => this.changeTabs(event, 'sign-up')}
                    className={
                      (currentTab === 'sign-up')
                        ? '-active' : undefined}
                    id="sign-up"
                  >
                    <h3
                    >
                      Sign Up
                  </h3>
                  </button>
                </div>
              </div>
              <div className="form-bottom">
                <div
                  id="sign-in-container"
                  className={
                    (currentTab === 'sign-in')
                      ? 'signin-tabs -active' :
                      'signin-tabs -inactive'}
                >
                  <SignInForm
                    errors={signInError}
                    onChange={this.handleChange}
                    onSubmit={this.onSubmitSignIn}
                    isLoading={isLoading}
                    signInUsername={signInUsername}
                    signInPassword={signInPassword}
                  />
                </div>
                <div
                  id="sign-up-container"
                  className={
                    (currentTab === 'sign-up')
                      ? 'signin-tabs -active' :
                      'signin-tabs -inactive'}
                >
                  <SignUpForm
                    checkUserExists={this.checkUserExists}
                    email={email}
                    errors={signUpError}
                    firstname={firstname}
                    isLoading={isLoading || invalid}
                    lastname={lastname}
                    onChange={this.handleChange}
                    onSubmit={this.onSubmitSignUp}
                    passwordLengthCheck={this.passwordLengthCheck}
                    passwordConfirmation={passwordConfirmation}
                    passwordConfirmationCheck={this.passwordConfirmationCheck}
                    signUpUsername={signUpUsername}
                    signUpPassword={signUpPassword}
                  />
                </div>

                {/* {
                  (currentTab === 'sign-in') &&
                  <SignInForm

                  />
                }
                {
                  (currentTab === 'sign-up') &&
                  <SignUpForm

                  />
                } */}
              </div>
            </div>
            {/* <SignInForm
              addFlashMessage={this.props.addFlashMessage}

              userLogin={this.props.userLogin}
              locationHistory={this.props.location.state}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}
LoginPage.defaultProps = {
  error: {},
  isAuthenticated: false,
  locationHistory: {}
};
LoginPage.propTypes = {
  error: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  locationHistory: PropTypes.object,
  userLogin: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
  userSignupRequest: PropTypes.func.isRequired,
};
LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
/**
 *
 * @param {object} state
 *
 * @returns {object} props
 */
function mapStateToProps(state) {
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
  };
}
export default connect(mapStateToProps,
  {
    userLogin,
    isUserExists,
    userSignupRequest
  })(LoginPage);
