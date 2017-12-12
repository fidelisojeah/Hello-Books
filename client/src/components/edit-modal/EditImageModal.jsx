import React from 'react';
import PropTypes from 'prop-types';

import ImageUploader from '../common/ImageUploader';
import ActionButton from './ActionButton';

const EditImageModal = props => (
  <div
    className="edit-modal"
  >
    <ImageUploader
      handleClick={props.handleImageEditClick}
      image={props.image}
      isLoading={props.isLoading}
      multiple={false}
      onImageDrop={props.onImageDrop}
      uploadText="Place New Book Image"
    />
    <ActionButton
      handleEditClick={props.handleEditClick}
      isLoading={props.isLoading}
    />
  </div>
);
EditImageModal.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  handleImageEditClick: PropTypes.func.isRequired,
  image: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onImageDrop: PropTypes.func.isRequired
};
EditImageModal.defaultProps = {
  image: '',
};
export default EditImageModal;
