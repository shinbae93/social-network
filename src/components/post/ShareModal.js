import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/Button';

const ShareModal = ({ handleClose, handleShare }) => {
  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 z-60 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-10 overlay"></div>
      <div className="relative z-10 rounded-lg w-full max-w-[300px] h-[150px]  bg-slate-100 px-5 py-5 flex flex-col">
        <h2 className="font-semibold text-center">
          Are you sure to share this post?
        </h2>
        <div className="flex flex-row gap-3 mx-auto mt-auto">
          <Button onClick={handleShare}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </div>
      </div>
    </div>,
    document.querySelector('body')
  );
};

export default ShareModal;
