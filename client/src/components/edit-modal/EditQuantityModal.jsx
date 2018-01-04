import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField';
import ActionButton from './ActionButton';

const EditQuantityModal = props => (
  <div
    className="edit-modal"
  >
    <TextField
      label="Enter New Quantity"
      errField={props.error}
      onChange={props.handleFieldChange}
      field="editBookQuantity"
      value={props.bookQuantity}
      formField="form-group"
      isRequired
      checkExists={props.onChangeBlurEvent}
      type="text"
    />
    <ActionButton
      handleEditClick={props.handleQuantityUpdate}
    />
  </div>
);
EditQuantityModal.propTypes = {
  error: PropTypes.string,
  handleQuantityUpdate: PropTypes.func.isRequired,
  onChangeBlurEvent: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  bookQuantity: PropTypes.string.isRequired
};
EditQuantityModal.defaultProps = {
  error: '',
};
export default EditQuantityModal;
