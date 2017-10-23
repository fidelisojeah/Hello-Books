import React from 'react';
import PropTypes from 'prop-types';

/**

 * @param {*} currentPage
 * @param {*} totalPages
 * @returns {array} page numbers to be displayed
 */
function showPages(currentPage, totalPages) {
  currentPage = currentPage || 1;
  currentPage = parseInt(currentPage, 10);
  totalPages = parseInt(totalPages, 10);

  if (currentPage > totalPages) {
    return false;
  }
  const allPages = [];
  if (totalPages > 6) {
    allPages.push(1);

    if ((currentPage - 3) >= 1) {
      allPages.push('...');
      if ((totalPages - currentPage) > 2) {
        if (currentPage > 2 ||
          currentPage < totalPages
        ) {
          allPages.push(currentPage - 1);
        }
        allPages.push(currentPage);

        if ((currentPage + 2) < totalPages) {
          allPages.push(1 + (currentPage));
          allPages.push('...');
        }

        if (currentPage < totalPages) {
          allPages.push(totalPages);
        }
      } else {
        for (let i = (totalPages - 3); i <= totalPages; i += 1) {
          allPages.push(i);
        }
      }
    } else {
      for (let i = 2; i <= 4; i += 1) {
        allPages.push(i);
      }
      allPages.push('...');
      allPages.push(totalPages);
    }
  } else {
    for (let i = 1; i <= totalPages; i += 1) {
      allPages.push(i);
    }
  }
  return allPages;
}

const Pagination = ({ currentPage, totalPages, paginationFunction }) => {
  const pageList = showPages(currentPage, totalPages);
  let i = 0;
  const pageDiv = pageList.map((pageNumber) => {
    i += 1;
    if (pageNumber === '...') {
      return (
        <span
          className="page-continuation"
          key={i}
        >
          ...
          </span>
      );
    }
    return (
      <a
        role="presentation"
        key={i}
        className={pageNumber === currentPage &&
          '-active'}
        onClick={event => paginationFunction(event, pageNumber)}
      >
        {pageNumber}
      </a>
    );
  });

  return (
    <div className="pagination-div">
      <div>
        <a
          className="navigation"
          disabled={currentPage === 1}
        >
          <i className="navigation-dir angle-left" />
        </a>
        {pageDiv}
        <a
          className="navigation"
          disabled={currentPage === totalPages}
        >
          <i className="navigation-dir angle-right" />
        </a>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginationFunction: PropTypes.func.isRequired
};
export default Pagination;
