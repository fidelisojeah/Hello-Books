import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {object} props
 * @return {JSX}
 */
function BorrowBookModule(props) {
  return (
    <div className="borrow-panel">
      <div className="box">
        <div className="box-button">
          {props.isAdmin &&
            <button
              className="btn button"
              onClick={event => props.editFunction(event, 'Book Name',
                ''
              )}
            >
              <span>
                Edit Book Title
              </span>
            </button>
          }
          {!props.isAdmin &&
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
          }
        </div>
      </div>
    </div>
  );
}
BorrowBookModule.propTypes = {
  bookQuantity: PropTypes.number.isRequired,
  borrowBookClick: PropTypes.func.isRequired,
  editFunction: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
export default BorrowBookModule;
