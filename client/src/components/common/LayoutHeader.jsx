import React from 'react';
import PropTypes from 'prop-types';


const LayoutHeader = props => (
  <div className="layout-header">
    <div className="container">
      <h1 className="page_header--title">
        {props.headerTitle}
      </h1>
    </div>
  </div>
);

LayoutHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired
};
export default LayoutHeader;
