import React, { useState } from 'react';

const CertificateDataUploader = () => {
  const [studentName, setStudentName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [cnicNumber, setCnicNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const saveCertificate = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/v1/save-certificate/save-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          courseTitle,
          rollNumber,
          cnicNumber,
          emailAddress,
        }),
      });
  
      if (response.status === 201) {
        alert('Certificate data saved successfully');
        // Clear form after successful save
        setStudentName('');
        setCourseTitle('');
        setRollNumber('');
        setCnicNumber('');
        setEmailAddress('');
      } else {
        alert('Failed to save certificate data');
      }
    } catch (error) {
      console.error('Error saving certificate data:', error); // Corrected console.log statement
      alert('Error saving certificate data');
    }
  };
  return (
    <div className="text-center mt-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <h1 className="mb-6 text-3xl">Upload Certificate Data</h1>
      <form onSubmit={saveCertificate} className="inline-block text-left">
        <div className="mb-4">
          <label className="inline-block w-full sm:w-24">Student Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            className="px-3 py-2 w-full sm:w-48 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="inline-block w-full sm:w-24">Course Title:</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
            className="px-3 py-2 w-full sm:w-48 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="inline-block w-full sm:w-24">Roll Number:</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            className="px-3 py-2 w-full sm:w-48 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="inline-block w-full sm:w-24">CNIC Number:</label>
          <input
            type="text"
            value={cnicNumber}
            onChange={(e) => setCnicNumber(e.target.value)}
            required
            className="px-3 py-2 w-full sm:w-48 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="inline-block w-full sm:w-24">Email Address:</label>
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
            className="px-3 py-2 w-full sm:w-48 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Certificate Data
        </button>
      </form>
    </div>
  );
};

export default CertificateDataUploader;
