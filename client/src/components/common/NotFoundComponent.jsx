import React from 'react';
import PropTypes from 'prop-types';

import BreadCrumbs from './BreadCrumbs';
import LayoutHeader from './LayoutHeader';

const NotFoundComponent = props => (
  <div className="layout--container">
    <LayoutHeader
      headerTitle={props.title}
    />
    <BreadCrumbs
      breadCrumbLinks={props.links}
    />
    <div className="section">
      <div className="error-container">
        {props.errorMessage}
      </div>
    </div>
  </div>
);
NotFoundComponent.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired
};
export default NotFoundComponent;
