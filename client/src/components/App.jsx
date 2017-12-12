import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import SiteCache from './SiteCache';
import ToastrComponent from './ToastrComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 0,
    };
  }
  handleCacheClick = (event) => {
    event.preventDefault();
    document.body.classList.remove('with--sidebar');
    document.body.classList.remove('with--modal');
  }
  render() {
    return (
      <div className="layout">
        <Header />
        <div id="page-content">
          {this.props.children}
          <Footer />
        </div>
        <ToastrComponent />
        <SiteCache
          handleClick={this.handleCacheClick}
        />
      </div >
    );
  }
}
export default App;
