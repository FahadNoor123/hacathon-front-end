import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'tailwindcss/tailwind.css';

const CertificateVerifier = () => {
  const [certificateId, setCertificateId] = useState('');
  const [certificateData, setCertificateData] = useState(null);

  const handleCertificateIdChange = (e) => {
    setCertificateId(e.target.value);
  };

  const handleVerifyCertificate = async () => {
    try {
      const response = await axios.get(`/api/v1/save-certificate/students/${certificateId}`);
      setCertificateData(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Certificate Found',
        html: `Certificate details for <span class="text-green-500 font-bold">${response.data.studentName}</span> have been retrieved successfully.`,
        confirmButtonColor: '#28a745', // Green color
      });
    } catch (error) {
      console.error('Error verifying certificate:', error);
      Swal.fire({
        icon: 'error',
        title: 'Certificate Not Found',
        text: 'No certificate found with the provided ID. Please check the ID and try again.',
        confirmButtonColor: '#d33', // Red color
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 border rounded-lg shadow-lg bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Verify Certificate</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Enter Certificate ID:</label>
        <input
          type="text"
          value={certificateId}
          onChange={handleCertificateIdChange}
          className="w-full p-2 border rounded"
          placeholder="Enter Certificate ID"
        />
      </div>
      <button 
        onClick={handleVerifyCertificate} 
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Verify Certificate
      </button>
      {certificateData && (
        <div className="mt-4 p-4 border rounded bg-white">
          <p className="text-gray-700">
            This is to certify that {certificateData.studentName} has successfully completed the course {certificateData.courseTitle}.
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificateVerifier;
