import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {object} props
 * @return {JSX}
 */
function SiteCache(props) {
  return (
    <div
      className="site-cache"
      role="presentation"
      id="site-cache"
      onClick={props.handleClick}
    />
  );
}

SiteCache.propTypes = {
  handleClick: PropTypes.func.isRequired
};
export default SiteCache;
