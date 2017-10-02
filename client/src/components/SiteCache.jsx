import React from 'react';

class SiteCache extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    document.body.classList.remove('with--sidebar');
  }
  render() {
    return (
      <div
        className="site-cache"
        role="presentation"
        id="site-cache"
        onClick={this.handleClick}
      />
    );
  }
}

export default SiteCache;
