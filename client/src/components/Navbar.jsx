import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from './actions/login';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  render() {
    return (
      <div className="header--right">
        <nav className="header-nav">
          <div className="header-nav--inner">
            <ul className="menu">
              <li className="menu-item">
                <a href="">Home</a>
              </li>
              <li className="menu-item">
                <a href="">View Library</a>
              </li>
              <li className="menu-item menu-item-Usr">
                <a className="usrBtn">
                  <span>{this.props.username}</span><i className="acc-button" />
                </a>
                <div id="profile-stuff" className="profile-dropdown">
                  <ul className="sub-menu">
                    <li><a href="user_profile.html">Profile</a></li>
                    <li><a href="">Messages</a></li>
                    <li><a href="">Membership</a></li>
                    <li><a href="" onClick={this.logout}>Logout</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(null, { logout })(Navbar);

