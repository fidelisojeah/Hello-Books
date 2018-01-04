import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ breadCrumbLinks }) => {
  const pageLinks = breadCrumbLinks.map(bLinks => (
    <li
      key={bLinks.linkName}
      className="breadcrumbs--item"
    >
      <Link
        to={`/${bLinks.link}`}
        className="breadcrumbs--link"
      >
        {bLinks.linkName}
      </Link>
    </li>
  ));
  return (
    <nav className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs--list">
          {pageLinks}
        </ul>
      </div>
    </nav>
  );
};
BreadCrumbs.propTypes = {
  breadCrumbLinks:
    PropTypes.arrayOf(PropTypes.object)
      .isRequired,
};
export default BreadCrumbs;
