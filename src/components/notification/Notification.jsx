import React, { useState, useEffect } from 'react';

const Notification = ({ product }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // Set the duration for how long the notification will be visible (e.g., 5 seconds)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`bg-green-200 p-3 rounded-md shadow-md ${visible ? 'block' : 'hidden'}`}>
      <p>{product.product} Removed From  cart!</p>
    </div>
  );
};

export default Notification;
