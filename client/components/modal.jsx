import React from 'react';

function Modal(props) {
  return (
    <div className="modal-overlay">
      <div className="modal-content p-3">
        <h1 className='text-danger'>Notice!</h1>
        <p>This app is created for demonstration purposes only. By clicking the button below, you acknowledge that no purchases will be made, no payment processing will be done, and actual personal information should not be used at checkout.</p>
        <div className="">
          <button onClick={props.modalToggle} className="btn btn-danger">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
