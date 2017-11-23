import React from 'react';
import PropTypes from 'prop-types';

const BorrowBookModule = props =>
  (
    <div className="borrow-panel">
      <div className="box">
        <div className="box-button">

          <button
            className="btn button"
            disabled={props.bookQuantity < 1}
            onClick={event => props.borrowBookClick(event)}
          >
            <span>
              {props.bookQuantity < 1 &&
                'Book Unavailable'}
              {props.bookQuantity >= 1 &&
                'Borrow Book'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
BorrowBookModule.propTypes = {
  bookQuantity: PropTypes.number.isRequired,
  borrowBookClick: PropTypes.func.isRequired
};
export default BorrowBookModule;
