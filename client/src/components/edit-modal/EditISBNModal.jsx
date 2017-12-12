import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField';
import ActionButton from './ActionButton';

const EditISBNModal = props => (
  <div
    className="edit-modal"
  >
    <TextField
      label="Enter New ISBN"
      errField={props.error}
      onChange={props.handleFieldChange}
      field="editISBN"
      value={props.ISBN}
      formField="form-group"
      isRequired
      checkExists={props.onChangeBlurEvent}
      type="text"
    />
    <ActionButton
      handleEditClick={props.handleEditClick}
    />
  </div>
);
EditISBNModal.propTypes = {
  error: PropTypes.string,
  handleEditClick: PropTypes.func.isRequired,
  onChangeBlurEvent: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  ISBN: PropTypes.string.isRequired
};
EditISBNModal.defaultProps = {
  error: '',
};
export default EditISBNModal;
