import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 *
 * @param {object} props
 *
 * @returns {JSX} jsx element
 */
function Navbar(props) {
  return (
    <div className="header--right" id="nav-bar">
      <nav className="header-nav">
        <div className="header-nav--inner">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/">
                Home
                </Link>
            </li>
            <li className="menu-item">
              <Link to="/books">
                View Library
                </Link>
            </li>
            <li className="menu-item menu-item-Usr">
              <a
                href="/"
                className="usrBtn large-view"
                onClick={event => props.show(event)}>
                <span className="profile-name">
                  {props.user.username}
                </span>
                <i className="acc-button" />
              </a>
              <a
                href="/"
                className="usrBtn mobile-view"
              >
                <span>{props.user.username}</span>
                <i className="acc-button" />
              </a>
              <div id="profile-stuff" className="profile-dropdown">
                <ul className="sub-menu">
                  <li>
                    <Link
                      href="/"
                      to="/profile"
                    >
                      Profile
                      </Link>
                  </li>
                  {props.user.role === 'Admin' &&
                    <li>
                      <Link
                        href="/"
                        to="/bookmgt"
                      >
                        Book Management
                      </Link>
                    </li>
                  }
                  <li><a href="/" onClick={props.logout}>Logout</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default Navbar;

