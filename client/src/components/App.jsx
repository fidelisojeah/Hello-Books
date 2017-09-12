import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

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
      </div>
    );
  }
}
/*
App.PropTypes = {
  children: PropTypes.object.isRequired,
};
*/
export default App;
