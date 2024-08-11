// CarAnimation.jsx
import React from 'react';

const CarAnimation = ({ path }) => {
  return (
    <svg
      width="300"
      height="200"
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Road */}
      <rect x="0" y="100" width="300" height="50" fill="#999" />
      
      {/* Car */}
      <rect x="10" y="80" width="60" height="30" fill="#007bff">
        {/* Animate the car */}
        <animateMotion
          dur="5s"
          repeatCount="indefinite"
          path={path}
        />
      </rect>
      <circle cx="25" cy="110" r="10" fill="#007bff" />
      <circle cx="55" cy="110" r="10" fill="#007bff" />
      
      <path d={path} fill="none" />
    </svg>
  );
};

export default CarAnimation;
