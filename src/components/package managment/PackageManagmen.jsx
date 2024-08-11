import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

function PackageManagement() {
  const [newPackageData, setNewPackageData] = useState({
    packageId: '',
    customerName: '',
    status: '',
    trackingNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackageData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddPackage = () => {
    // Add logic to handle adding a new package
    console.log('Adding package:', newPackageData);
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-200 rounded-lg shadow-md">
      <Typography variant="h4" className="mb-4 text-center">Package Management</Typography>
      
      {/* Add New Package Form */}
      <Card variant="outlined" className="mb-4 p-4">
        <Typography variant="h5" className="mb-2">Add New Package</Typography>
        <TextField
          fullWidth
          name="packageId"
          label="Package ID"
          value={newPackageData.packageId}
          onChange={handleInputChange}
          variant="outlined"
          className="mb-2"
        />
        <TextField
          fullWidth
          name="customerName"
          label="Customer Name"
          value={newPackageData.customerName}
          onChange={handleInputChange}
          variant="outlined"
          className="mb-2"
        />
        <TextField
          fullWidth
          name="status"
          label="Status"
          value={newPackageData.status}
          onChange={handleInputChange}
          variant="outlined"
          className="mb-2"
        />
        <TextField
          fullWidth
          name="trackingNumber"
          label="Tracking Number"
          value={newPackageData.trackingNumber}
          onChange={handleInputChange}
          variant="outlined"
          className="mb-2"
        />
        <Button variant="contained" color="primary" onClick={handleAddPackage}>Add Package</Button>
      </Card>

      {/* List of Packages */}
      <div>
        <Typography variant="h5" className="mb-2">Packages</Typography>
        <Card variant="outlined" className="p-4">
          <Typography variant="body1">
            <strong>Package ID:</strong> 123456<br />
            <strong>Customer Name:</strong> John Doe<br />
            <strong>Status:</strong> Shipped<br />
            <strong>Tracking Number:</strong> XYZ123456
          </Typography>
          {/* Add button to update package */}
          <Button variant="outlined" color="primary" className="mt-2">Update</Button>
        </Card>
      </div>
    </div>
  );
}

export default PackageManagement;
