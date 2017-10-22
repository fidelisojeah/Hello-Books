import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userSignupRequest, isUserExists } from '../actions/signupActions';
import { userLogin } from '../actions/login';
import { addFlashMessage } from '../actions/flashMessages';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 0,
    };
  }
  render() {
    return (
      <div id="login-page-layout" className="layout--container">
        <div className="container">
          <h1 className="text--title">
            Hello Books!!!
          </h1>
          <p className="simple--text">
            THE Online Book Repository
          </p>
          <div className="row vertical-align">
            <div className="col-md-5">
              <div className="form-box">
                <div className="form-top">
                  <div className="form-top-left">
                    <h3>Signin!!!</h3>
                  </div>
                </div>
                <div className="form-bottom">
                  <SignInForm
                    addFlashMessage={this.props.addFlashMessage}
                    userLogin={this.props.userLogin}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-1" />
            <div className="col-md-6">
              <div className="form-box">
                <div className="form-top">
                  <div className="form-top-left">
                    <h3>Register!!!</h3>
                  </div>
                </div>
                <div className="form-bottom">
                  <SignUpForm
                    isUserExists={this.props.isUserExists}
                    userSignupRequest={this.props.userSignupRequest}
                    addFlashMessage={this.props.addFlashMessage}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="social-login col-md-2 col-md-offset-5">
              <div className="google-btn">
                <span className="icon" />
                <span className="label">Continue with Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Signin.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired,
};

export default connect(
  null,
  { userLogin, userSignupRequest, addFlashMessage, isUserExists })(Signin);
