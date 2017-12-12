import React from 'react';
import PropTypes from 'prop-types';

import { displayYear } from '../common/calculate-moment';

import YearListChange from './YearListChange';
import EditISBNModal from './EditISBNModal';
import EditBookModal from './EditBookModal';
import EditDescModal from './EditDescModal';
import EditImageModal from './EditImageModal';

const EditModal = (props) => {
  if (props.element === 'publish year') {
    return (
      <YearListChange
        error={props.error.publishYear}
        yearList={props.yearList}
        publishYear={((props.publishyear === undefined) ?
          parseInt(displayYear(props.oldPublishYear), 10)
          : props.publishyear).toString()}
        yearListShow={props.yearListShow}
        onChangeBlurEvent={props.onChangeBlurEvent}
        handleYearChangeClick={props.handleYearChangeClick}
        handleFieldChange={props.handleFieldChange}
        handleEditClick={props.handleEditClick}
      />
    );
  }
  if (props.element === 'ISBN') {
    return (
      <EditISBNModal
        error={props.error.ISBNError}
        handleEditClick={props.handleEditClick}
        onChangeBlurEvent={props.onChangeBlurEvent}
        handleFieldChange={props.handleFieldChange}
        ISBN={(props.ISBN === undefined) ?
          props.oldISBN : props.ISBN}
      />
    );
  }
  if (props.element === 'image') {
    return (
      <EditImageModal
        handleImageEditClick={props.handleImageEditClick}
        image={props.newImageURL}
        onImageDrop={props.onImageDrop}
        isLoading={props.isLoading}
        handleEditClick={props.handleEditClick}
      />
    );
  }
  if (props.element === 'Book Name') {
    return (<EditBookModal
      error={props.error.bookNameError}
      handleEditClick={props.handleEditClick}
      onChangeBlurEvent={props.onChangeBlurEvent}
      handleFieldChange={props.handleFieldChange}
      bookName={(props.bookName === undefined) ?
        props.oldBookName : props.bookName}
    />);
  }
  if (props.element === 'Description') {
    return (
      <EditDescModal
        error={props.error.descriptionError}
        handleEditClick={props.handleEditClick}
        onChangeBlurEvent={props.onChangeBlurEvent}
        handleFieldChange={props.handleFieldChange}
        description={(props.description === undefined) ?
          props.oldDescription : props.description}
      />
    );
  }
};
EditModal.propTypes = {
  bookName: PropTypes.string,
  description: PropTypes.string,
  element: PropTypes.string.isRequired,
  error: PropTypes.object,
  handleEditClick: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleImageEditClick: PropTypes.func.isRequired,
  handleYearChangeClick: PropTypes.func.isRequired,
  ISBN: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  newImageURL: PropTypes.string,
  oldBookName: PropTypes.string.isRequired,
  oldDescription: PropTypes.string.isRequired,
  oldISBN: PropTypes.string.isRequired,
  oldPublishYear: PropTypes.string.isRequired,
  onChangeBlurEvent: PropTypes.func.isRequired,
  onImageDrop: PropTypes.func.isRequired,
  publishyear: PropTypes.string,
  yearList: PropTypes.arrayOf(PropTypes.number),
  yearListShow: PropTypes.bool,
};
EditModal.defaultProps = {
  bookName: undefined,
  description: undefined,
  error: {
    bookNameError: '',
    descriptionError: '',
    ISBNError: '',
    publishYear: ''
  },
  ISBN: undefined,
  newImageURL: '',
  publishyear: undefined,
  yearList: [],
  yearListShow: false,
};
export default EditModal;
