import React from 'react';
import PropTypes from 'prop-types';


const PerPage = ({ limit, perPageFunction }) => {
  return (
    <div className="limit-per-page">
      <div>
        <span
          role="presentation"
          id="pp10"
          className={limit === 10 ? '-active' : undefined}
          onClick={event => perPageFunction(event, 10)}
        >
          10
        </span>
        <span
          role="presentation"
          id="pp50"
          className={limit === 50 ? '-active' : undefined}
          onClick={event => perPageFunction(event, 50)}
        >
          50
        </span>
        <span
          role="presentation"
          id="pp100"
          className={limit === 100 ? '-active' : undefined}
          onClick={event => perPageFunction(event, 100)}
        >
          100
        </span>
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
