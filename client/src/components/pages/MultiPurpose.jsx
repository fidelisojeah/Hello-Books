import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingPage from './LoadingPage';

import LayoutHeader from '../common/LayoutHeader';
import NotFoundComponent from '../common/NotFoundComponent';
import TextField from '../common/TextField';

import { userLogin } from '../actions/login';

import {
  verifyUser,
  resendActivation
} from '../actions/userActions';

import UserHelper from '../../../../server/helpers/UserHelper';

import SignInForm from '../login-page-components/SignInForm';

export class MultiPurpose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: this.props.match.params.purpose,
      message: {},
      error: {},
      queryParams: {},
      isLoading: false,
      isSigninLoading: false,
      signInError: {},
      signInUsername: '',
      signInPassword: '',
      username: ''
    };
  }
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.context.router.history.push('/');
    }
    this.getUrlVars();
  }
  componentWillReceiveProps(nextProps) {
    const {
      error,
      message
    } = this.state;
    if (nextProps.error.message) {
      const errorName = nextProps.error.name;
      error.message = (errorName === 'JsonWebTokenError') ?
        'Invalid Token' : nextProps.error.message;
    } else {
      message.message = nextProps.message.message;
    }
    if (nextProps.isAuthenticated) {
      this.context.router.history.push('/');
      return;
    }
    this.setState({
      error,
      message
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
      isSigninLoading: true
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
          isSigninLoading: false,
        });
      });
  }
  getUrlVars = () => {
    const queryParams = {};
    let hash;
    const searches = this.props.location.search;
    const hashes = searches
      .slice(searches
        .indexOf('?') + 1).split('&');
    hashes.forEach((variables) => {
      hash = variables.split('=');
      queryParams[hash[0]] = hash[1];
    });
    this.setState({
      queryParams
    }, () => {
      if (this.state.purpose === 'verify') {
        this.verifyUser();
      }
    });
  }
  submitResendActivation = (event) => {
    event.preventDefault();
    const {
      username
     } = this.state;
    if (username.length >= 1) {
      this.props.resendActivation({ username });
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  verifyUser = () => {
    const {
      error,
      queryParams
    } = this.state;
    if (!queryParams.key || !queryParams.id) {
      error.message = 'Incomplete Information';
      return this.setState({
        error
      });
    }
    this.props.verifyUser(queryParams);
  }
  render() {
    const {
      purpose,
      signInError,
      error,
      message,
      isLoading,
      isSigninLoading,
      signInUsername,
      signInPassword,
      username
    } = this.state;
    if (isLoading) {
      return (
        <LoadingPage />
      );
    }

    if (purpose === 'verify') {
      return (<div className="layout--container">
        <LayoutHeader
          headerTitle="Verify Account"
        />
        <div className="section">
          <div className="innerSection">
            <div className="container">
              {error.message &&
                <div className="verify-container">
                  <div className="inner-message -error">
                    {error.message}
                  </div>
                  <div className="sign-in-container">
                    <span>
                      An Error Has occured,
                       Resend activation Message?
                    </span>
                    <form onSubmit={this.submitResendActivation}>
                      <div className="row">
                        <TextField
                          field="username"
                          formField="form-group"
                          label="Enter Username / Email Address"
                          onChange={this.handleChange}
                          isRequired
                          type="text"
                          value={username}
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
                            <span>Send Mail</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              }
              {message.message &&
                <div className="verify-container">
                  <div className="inner-message -success">
                    {message.message}
                  </div>
                  <div className="sign-in-container">
                    <span>You can Sign In Below</span>
                    <SignInForm
                      errors={signInError}
                      onChange={this.handleChange}
                      onSubmit={this.onSubmitSignIn}
                      isLoading={isSigninLoading}
                      signInUsername={signInUsername}
                      signInPassword={signInPassword}
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>);
    }
    return (
      <NotFoundComponent
        title="No Such Book"
        errorMessage="Invalid Book Maybe?"
        links={[{
          linkName: 'Home',
          link: ''
        }]}
      />
    );
  }
}
MultiPurpose.defaultProps = {
  isAuthenticated: false,
  error: {},
  message: {}
};
MultiPurpose.contextTypes = {
  router: PropTypes.object.isRequired,
};
MultiPurpose.propTypes = {
  userLogin: PropTypes.func.isRequired,
  resendActivation: PropTypes.func.isRequired,
  error: PropTypes.object,
  message: PropTypes.object,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  verifyUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,

};
/**
 *
 * @param {object} state
 *
 * @returns {object} props
 */
function mapStateToProps(state) {
  return {
    error: state.userActionReducer.error,
    message: state.userActionReducer.message,
    isAuthenticated: state.auth.isAuthenticated
  };
}
export default connect(mapStateToProps,
  {
    verifyUser,
    userLogin,
    resendActivation
  }
)(MultiPurpose);
