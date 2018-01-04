import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {object} props
 *
 * @returns {JSX} JSX element
 */
function AdminBookSection(props) {
  return (
    <div className="section">
      <div className="container update-quantity">
        <p>
          {props.bookQuantity < 1 &&
            <span>No Copy of Book Left in Library</span>
          }
          {props.bookQuantity >= 1 &&
            <span><b>{props.bookQuantity}</b> Book{props.bookQuantity > 1 ? 's ' : ' '}
              available in the Library
            </span>
          }
          <button
            onClick={event => props.editFunction(event, 'Update Quantity',
              'editBookQuantity'
            )}
          >
            <span>
              Update Quantity
            </span>
          </button>
        </p>
      </div>
    </div>

  );
}

AdminBookSection.propTypes = {
  bookQuantity: PropTypes.number.isRequired,
  editFunction: PropTypes.func.isRequired
};
export default AdminBookSection;
