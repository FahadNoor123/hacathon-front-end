import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [studentName, setStudentName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const generateCertificate = async () => {
    const response = await axios.post('http://localhost:3001/generate-certificate', {
      studentName,
      courseTitle,
      rollNumber
    }, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `certificate_${studentName}.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="App">
      <h1>Generate Certificate</h1>
      <form onSubmit={(e) => { e.preventDefault(); generateCertificate(); }}>
        <div>
          <label>Student Name:</label>
          <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
        </div>
        <div>
          <label>Course Title:</label>
          <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required />
        </div>
        <div>
          <label>Roll Number:</label>
          <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
        </div>
        <button type="submit">Generate Certificate</button>
      </form>
    </div>
  );
};

export default App;
