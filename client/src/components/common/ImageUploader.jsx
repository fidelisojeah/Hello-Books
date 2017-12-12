import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import loader from '../../images/802.gif';

/**
 * @param {object} props
 */
function ImageUploader(props) {
  return (
    <div className="row">
      <div className="image-uploader">
        <div className="form-group">
          <div className="dropzone-holder">
            <input
              type="hidden"
              requiredname="image"
              value={props.image}
            />
            <Dropzone
              multiple={props.multiple}
              accept="image/*"
              onDrop={props.onImageDrop}
            >
              {!props.image
                && <p>
                  {props.uploadText}
                </p>}
              <div className="image-placeholder">
                {props.isLoading && !props.image &&
                  <img
                    className="loader-image"
                    src={loader}
                    alt="loading"
                  />
                }
                {props.image !== '' &&
                  <img
                    src={props.image}
                    className="upload-image"
                    alt="uploaded Book"
                  />
                }
              </div>
            </Dropzone>
          </div>
          <div className="img-container">
            {props.image !== '' &&
              <i
                className="x-button"
                role="presentation"
                onClick={props.handleClick}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
ImageUploader.defaultProps = {
  image: ''
};
ImageUploader.propTypes = {
  handleClick: PropTypes.func.isRequired,
  image: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  multiple: PropTypes.bool.isRequired,
  onImageDrop: PropTypes.func.isRequired,
  uploadText: PropTypes.string.isRequired,

};
export default ImageUploader;
