import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@mui/material';

function CustomerDashboard() {
  const [trackingId, setTrackingId] = useState('');
  const [carPosition, setCarPosition] = useState('0px');

  const handleTrackingIdChange = (e) => {
    setTrackingId(e.target.value);
  };

  const handleSearch = () => {
    // Add logic to handle search
    console.log('Searching for tracking ID:', trackingId);
    // Trigger animation to start
    setCarPosition('calc(100% - 60px)'); // Adjusted to move car above black line
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-200 rounded-lg shadow-md">
      <Typography variant="h4" className="mb-4 text-center">Package Tracking</Typography>
      
      {/* Search Form */}
      <Card variant="outlined" className="mb-4 p-4">
        <Typography variant="h5" className="mb-2">Track Your Package</Typography>
        <TextField
          fullWidth
          name="trackingId"
          label="Enter Tracking ID"
          value={trackingId}
          onChange={handleTrackingIdChange}
          variant="outlined"
          className="mb-2"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      </Card>

      {/* Animation */}
      <div className="flex justify-center mb-4 relative">
        {/* Black road */}
        <div className="w-full h-2 bg-black absolute bottom-0"></div>
        {/* Car animation */}
        <div 
          className="w-11 h-12  absolute left-0 bottom-4"
          style={{
            left: carPosition,
            transition: 'left 5s linear'
          }}
        >
          {/* Car image with link */}
          <a href="https://ibb.co/QrSVYSB"><img src="https://i.ibb.co/jg0Y30K/car22.png" alt="car22" border="0" /></a>
        </div>
      </div>

      {/* Tracking Status */}
      <div>
        <Typography variant="h5" className="mb-2">Tracking Status</Typography>
        <div className="flex justify-between items-center mb-2">
          <div>Packed</div>
          {/* Add marker for the car to stop at */}
          <div className="marker">⬤</div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div>Arrived for Delivery</div>
          <div className="marker">⬤</div>
        </div>
        {/* Add more tracking statuses as needed */}
      </div>
    </div>
  );
}

export default CustomerDashboard;
