import React from 'react';
import PropTypes from 'prop-types';


const LayoutHeader = props => (
  <div className="layout-header">
    <div className="container">
      <h1 className="page_header--title">
        {!props.headerTitleAnimated && props.headerTitle}
        {props.headerTitleAnimated}
      </h1>
    </div>
  </div>
);

LayoutHeader.defaultProps = {
  headerTitleAnimated: null
};
LayoutHeader.propTypes = {
  headerTitleAnimated: PropTypes.object,
  headerTitle: PropTypes.string.isRequired
};
export default LayoutHeader;
