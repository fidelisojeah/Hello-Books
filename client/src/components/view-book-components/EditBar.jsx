import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {object} props
 *
 * @returns {JSX} jsx component
 */
function EditBar(props) {
  return (
    <div className="edit-bar">
      <i
        role="presentation"
        className="edit-icon"
        onClick={event => props.editFunction(event, props.element,
          props.elementName
        )}
      />
    </div>
  );
}
EditBar.defaultProps = {
  elementName: undefined
};
EditBar.propTypes = {
  editFunction: PropTypes.func.isRequired,
  element: PropTypes.string.isRequired,
  elementName: PropTypes.string
};
export default EditBar;
