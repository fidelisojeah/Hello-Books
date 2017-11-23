import React from 'react';

import BreadCrumbs from '../common/BreadCrumbs';
import LayoutHeader from '../common/LayoutHeader';

const defaultPageLink = [{
  linkName: 'Home',
  link: ''
}];

const LoadingPage = () => {
  return (
    <div className="layout--container">
      <LayoutHeader
        headerTitle="Loading..."
      />
      <BreadCrumbs
        breadCrumbLinks={defaultPageLink}
      />
    </div>
  );
};
export default LoadingPage;
