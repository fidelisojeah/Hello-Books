import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField';
import ActionButton from './ActionButton';

const EditBookModal = props => (
  <div
    className="edit-modal"
  >
    <TextField
      label="Enter New Book Name"
      errField={props.error}
      onChange={props.handleFieldChange}
      field="editBookName"
      value={props.bookName}
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
EditBookModal.propTypes = {
  error: PropTypes.string,
  handleEditClick: PropTypes.func.isRequired,
  onChangeBlurEvent: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  bookName: PropTypes.string.isRequired
};
EditBookModal.defaultProps = {
  error: '',
};
export default EditBookModal;
