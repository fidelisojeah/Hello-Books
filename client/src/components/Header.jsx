import React from 'react';
import {
  Link,
} from 'react-router-dom';

import hbLogo from '../images/h-b-logo.svg';

import Hamburger from './Hamburger';
import Navbar from './Navbar';

const Header = () => {
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
                <Navbar />
              </div>
            </div>
          </div>
        </div>
        <Hamburger />
      </header>
    </div >
  );
};

export default Header;
