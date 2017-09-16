import React from 'react';

// const SiteCache = () => {
class SiteCache extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    document.getElementById('main').className = '';
    this.setState({
      clearBckgrnd: true,
    });
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
