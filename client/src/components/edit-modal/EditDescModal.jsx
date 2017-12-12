import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField';
import ActionButton from './ActionButton';

const EditDescModal = props => (
  <div
    className="edit-modal"
  >
    <TextField
      label="Enter New Description"
      errField={props.error}
      onChange={props.handleFieldChange}
      field="editDescription"
      value={props.description}
      formField="form-group"
      isRequired
      checkExists={props.onChangeBlurEvent}
      type="textarea"
    />
    <ActionButton
      handleEditClick={props.handleEditClick}
    />
  </div>
);
EditDescModal.propTypes = {
  error: PropTypes.string,
  handleEditClick: PropTypes.func.isRequired,
  onChangeBlurEvent: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired
};
EditDescModal.defaultProps = {
  error: '',
};
export default EditDescModal;
