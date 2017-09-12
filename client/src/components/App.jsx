import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';

// import '../style.scss';

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
export default App;
