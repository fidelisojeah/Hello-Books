import React from 'react';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 0,
    };
  }
  render() {
    return (
      <form>
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

        <div className="button-container">
          <button className="button btn">
            <span>Signin</span>
          </button>
        </div>
      </form>
    );
  }
}
export default SigninForm;
