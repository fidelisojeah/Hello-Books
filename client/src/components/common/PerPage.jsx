import React from 'react';
import PropTypes from 'prop-types';


const PerPage = ({ limit, perPageFunction }) => {
  return (
    <div className="limit-per-page">
      <div>
        <a
          href=""
          className={limit === 10 && '-active'}
          onClick={event => perPageFunction(event, 10)}
        >
          10
        </a>
        <a
          href=""
          className={limit === 50 && '-active'}
          onClick={event => perPageFunction(event, 50)}
        >
          50
        </a>
        <a
          href=""
          className={limit === 100 && '-active'}
          onClick={event => perPageFunction(event, 100)}
        >
          100
        </a>
      </div>
      <span>
        Per Page
     </span>
    </div>
  );
};
PerPage.propTypes = {
  perPageFunction: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired
};
export default PerPage;
