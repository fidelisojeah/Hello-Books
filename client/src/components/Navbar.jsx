import React from 'react';

const Navbar = () => {
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
              <a className="usrBtn">Profile</a>
              <div id="profile-stuff" className="profile-dropdown">
                <ul className="sub-menu">
                  <li><a href="user_profile.html">Profile</a></li>
                  <li><a href="">Messages</a></li>
                  <li><a href="">Membership</a></li>
                  <li><a href="">Logout</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

//  onClick="shwUsrProfile()"
