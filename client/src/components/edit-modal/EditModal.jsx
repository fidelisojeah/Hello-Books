import React from 'react';
import PropTypes from 'prop-types';

import { displayYear } from '../common/calculateMoment';

import YearListChange from './YearListChange';
import EditISBNModal from './EditISBNModal';
import EditBookModal from './EditBookModal';
import EditDescModal from './EditDescModal';
import EditImageModal from './EditImageModal';
import EditQuantityModal from './EditQuantityModal';

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
  } else if (props.element === 'ISBN') {
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
  } else if (props.element === 'image') {
    return (
      <EditImageModal
        handleImageEditClick={props.handleImageEditClick}
        image={props.newImageURL}
        onImageDrop={props.onImageDrop}
        isLoading={props.isLoading}
        handleEditClick={props.handleEditClick}
      />
    );
  } else if (props.element === 'Book Name') {
    return (<EditBookModal
      error={props.error.bookNameError}
      handleEditClick={props.handleEditClick}
      onChangeBlurEvent={props.onChangeBlurEvent}
      handleFieldChange={props.handleFieldChange}
      bookName={(props.bookName === undefined) ?
        props.oldBookName : props.bookName}
    />);
  } else if (props.element === 'Description') {
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
  } else if (props.element === 'Update Quantity') {
    return (<EditQuantityModal
      bookQuantity={(props.bookQuantity === undefined) ?
        props.oldBookQuantity.toString() : props.bookQuantity
      }
      error={props.error.quantityError}
      handleFieldChange={props.handleFieldChange}
      onChangeBlurEvent={props.onChangeBlurEvent}
      handleQuantityUpdate={props.updateQuantity}
    />);
  }
  return (<div>Nothing to see here</div>);
};
EditModal.propTypes = {
  bookName: PropTypes.string,
  bookQuantity: PropTypes.string,
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
  oldBookQuantity: PropTypes.number.isRequired,
  oldDescription: PropTypes.string.isRequired,
  oldISBN: PropTypes.string.isRequired,
  oldPublishYear: PropTypes.string.isRequired,
  onChangeBlurEvent: PropTypes.func.isRequired,
  onImageDrop: PropTypes.func.isRequired,
  publishyear: PropTypes.string,
  updateQuantity: PropTypes.func.isRequired,
  yearList: PropTypes.arrayOf(PropTypes.number),
  yearListShow: PropTypes.bool,
};
EditModal.defaultProps = {
  bookName: undefined,
  bookQuantity: undefined,
  description: undefined,
  error: {
    bookNameError: '',
    descriptionError: '',
    ISBNError: '',
    publishYear: '',
    quantityError: ''
  },
  ISBN: undefined,
  newImageURL: '',
  publishyear: undefined,
  yearList: [],
  yearListShow: false,
};
export default EditModal;
