import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import hbLogo from '../images/h-b-logo.svg';

import Hamburger from './Hamburger';
import Navbar from './Navbar';

import { logout } from './actions/login';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {}
    };
  }
  hide = (event) => {
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
    window.removeEventListener('click', this.hide);
  }
  show = (event) => {
    event.preventDefault();
    document.getElementById('profile-stuff').classList.toggle('show');
    document.addEventListener('click', this.hide);
  }

  logout = (event) => {
    event.preventDefault();
    this.props.logout();
    if (document.body.classList.contains('with--sidebar')) {
      document.body.classList.remove('with--sidebar');
    }
    this.context.router.history.push('/signin');
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className="layout--header">
        <header className="header">
          <div className="container">
            <div className="header--inner">
              <div className="row vertical-align">
                <div className="col-lg-2 col-md-2">
                  <div className="header--logo q_logo">
                    <Link to="/">
                      <div dangerouslySetInnerHTML={{ __html: hbLogo }} />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-10 col-md-10">
                  {isAuthenticated &&
                    <Navbar
                      username={user.username}
                      logout={this.logout}
                      show={this.show}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
          {isAuthenticated && <Hamburger />}
        </header>
      </div >
    );
  }
}
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // isAuthenticated: PropTypes.object,
  // user: PropTypes.object
};
Header.defaultProps = {
  isAuthenticated: null,
  user: null
};
Header.contextTypes = {
  router: PropTypes.object.isRequired,
};
/**
 * @param {object} state
 *
 * @return {object} prop assigned to value of state
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps, { logout })(Header);
