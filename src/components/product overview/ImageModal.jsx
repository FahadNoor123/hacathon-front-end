import React from 'react';

function ImageModal({ image, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-md p-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking on the image
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-12 w-12 bg-purple-500 text-white flex justify-center items-center rounded-full text-lg" // Increased height and styled button
        >
          X
        </button>
        <img src={image} alt="Full View" className="max-h-screen max-w-screen" />
      </div>
    </div>
  );
}

export default ImageModal;
