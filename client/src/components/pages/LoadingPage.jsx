import React from 'react';

import BreadCrumbs from '../common/BreadCrumbs';
import LoadingBar from '../common/LoadingBar';
import LayoutHeader from '../common/LayoutHeader';

const defaultPageLink = [{
  linkName: 'Home',
  link: ''
}];
/**
 * @return {JSX}
 */
function LoadingPage() {
  return (
    <div className="layout--container loading-page">
      <LayoutHeader
        headerTitle="Loading..."
        headerTitleAnimated={<LoadingBar />}
      />
      <BreadCrumbs
        breadCrumbLinks={defaultPageLink}
      />
    </div>
  );
}
export default LoadingPage;
