import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextField from '../common/TextField';

const EditModal = (props) => {
  if (props.element === 'publish year') {
    return (
      <div className="edit-modal">
        <TextField
          label="Select New Publish Year"
          onChange={props.handleFieldChange}
          field="editpublishYear"
          value={(props.publishyear === undefined) ?
            props.oldPublishYear : props.publishyear}
          formField="form-group"
          isRequired
          type="text"
        />
      </div>
    );
  }
  if (props.element === 'ISBN') {
    return (
      <div className="edit-modal">
        <TextField
          label="Enter New ISBN"
          onChange={props.handleFieldChange}
          field="editISBN"
          value={(props.ISBN === undefined) ?
            props.oldISBN : props.ISBN}
          formField="form-group"
          isRequired
          type="text"
        />
      </div>
    );
  }
  if (props.element === 'image') {

  }
  if (props.element === 'book name') {

  }
  if (props.element === 'description') {

  }
};
EditModal.propTypes = {
  element: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  publishyear: PropTypes.string,
  oldPublishYear: PropTypes.string.isRequired,
  oldISBN: PropTypes.string.isRequired,
  ISBN: PropTypes.string
};
export default EditModal;
