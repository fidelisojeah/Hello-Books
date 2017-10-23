import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from './actions/login';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  hide(event) {
    if (!event.target.matches('.usrBtn')
      && !event.target.matches('.menu-item-Usr')
      && !event.target.matches('.profile-name')
      && !event.target.matches('.acc-button')
    ) {
      // if outside the profile button is clicked
      const dropdowns = document.getElementsByClassName('profile-dropdown');

      for (let i = 0; i < dropdowns.length; i += 1) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          // show or hide that menu
          openDropdown.classList.remove('show');
        }
      }
    }
    window.removeEventListener('click', this.hide.bind(this));
  }
  show(event) {
    event.preventDefault();
    document.getElementById('profile-stuff').classList.toggle('show');
    document.addEventListener('click', this.hide.bind(this));
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
    if (document.body.classList.contains('with--sidebar')) {
      document.body.classList.remove('with--sidebar');
    }
    this.context.router.history.push('/signin');
  }
  render() {
    return (
      <div className="header--right">
        <nav className="header-nav">
          <div className="header-nav--inner">
            <ul className="menu">
              <li className="menu-item">
                <Link to="/">
                  Home
                  </Link>
              </li>
              <li className="menu-item">
                <Link to="/allBooks">
                  View Library
                </Link>
              </li>
              <li className="menu-item menu-item-Usr">
                <a
                  className="usrBtn large-view"
                  role="presentation"
                  onClick={this.show.bind(this)}>
                  <span className="profile-name">
                    {this.props.username}
                  </span>
                  <i className="acc-button" />
                </a>
                <a className="usrBtn mobile-view">
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
Navbar.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default connect(null, { logout })(Navbar);

