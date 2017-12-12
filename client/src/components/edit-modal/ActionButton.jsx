import React from 'react';
import PropTypes from 'prop-types';

const ActionButton = props => (
  <div className="action-bar">
    <div className="place-right">
      <button
        className="btn button"
        onClick={event => props.handleEditClick(event)}
        disabled={props.isLoading}
      >
        <span>
          Edit
          </span>
      </button>
    </div>
  </div>
);

ActionButton.defaultProps = {
  isLoading: false
};
ActionButton.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};
export default ActionButton;
