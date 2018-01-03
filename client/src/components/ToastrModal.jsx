import React from 'react';

import ActionButton from './edit-modal/ActionButton';


const closeModal = (event) => {
  event.preventDefault();
  document.body.classList.remove('with--toastr-modal');
};
/**
 * @return {JSX}
 */
function ToastrModal() {
  return (
    <div
      className="toastr-modal"
      id="confirmationModal"
    >
      <div className="modal-content">
        <div className="modal-header">
          <button
            className="close"
            onClick={closeModal}
          >
            &times;
          </button>
          <h2 id="modal-head">
            <div id="ToastrModalHead">
              Confirm?
            </div>
          </h2>
        </div>
        <div className="modal-body">
          <div id="ToastrModalBody">
            <div
              id="loader"
              className="circle-loader"
            >
              <div
                id="check"
                className="checkmark draw"
              />
            </div>
            <div
              id="ToastrmodalContent"
            >
              Confirm Confirmation
            </div>
            <ActionButton
              handleEditClick={closeModal}
              actionValue="Confirm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastrModal;
