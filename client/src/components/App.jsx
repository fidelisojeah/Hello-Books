import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import SiteCache from './SiteCache';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 0,
    };
  }
  render() {
    return (
      <div className="layout">
        <Header />
        <div id="page-content">
          {this.props.children}

          <Footer />
        </div>
        <SiteCache />
      </div >
    );
  }
}
export default App;
