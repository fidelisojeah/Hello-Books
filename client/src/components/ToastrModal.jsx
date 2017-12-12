import React from 'react';

const closeModal = (event) => {
  event.preventDefault();
  document.body.classList.remove('with--modal');
};
/**
 * @return {JSX}
 */
function ToastrModal() {
  return (
    <div
      className="modal"
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
            <div id="ToastrModalHead" />
          </h2>
        </div>
        <div className="modal-body">
          <div id="ToastrModalBody" />
        </div>
      </div>
    </div>
  );
}

export default ToastrModal;
