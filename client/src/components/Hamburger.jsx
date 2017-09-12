import React from 'react';

class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: 0,
    };
  }
  render() {
    return (
      <div className="header--menu-opener">
        <span id="hamburger" className="c-hamburger c-hamburger--htx visible-xs-block visible-sm-block">
          <span>toggle menu</span>
        </span>
      </div>
    );
  }
}
export default Hamburger;
