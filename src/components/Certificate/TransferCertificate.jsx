import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TransferCertificate = () => {
  const [rollNumbers, setRollNumbers] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');

  const fetchStudentData = async () => {
    try {
      const response = await fetch('/api/v1/save-certificate/hero/std', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rollNumber: rollNumbers }), // Send roll number in request body
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching student data:', error);
      setError('Error fetching student data: ' + error.message);
    }
  };

  const generatePDF = async () => {
    const input = document.getElementById('certificate');

    // Increase the resolution of the canvas
    html2canvas(input, { scale: 3 }).then(async (canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0); // Quality set to 1.0 for full quality

      // PDF page size (A4 dimensions in mm)
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm

      // Calculate the image dimensions and scale it to fit the page
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Conversion factor from pixels to millimeters
      const pxToMm = 0.264583;

      // Convert image dimensions from pixels to millimeters
      const imgWidthMm = imgWidth * pxToMm;
      const imgHeightMm = imgHeight * pxToMm;

      // Calculate scale factor to fit image to page
      const scaleX = pdfWidth / imgWidthMm;
      const scaleY = pdfHeight / imgHeightMm;
      const scale = Math.min(scaleX, scaleY);

      // New dimensions of the image in PDF
      const scaledWidth = imgWidthMm * scale;
      const scaledHeight = imgHeightMm * scale;

      // Create PDF
      const pdf = new jsPDF('portrait', 'mm', [pdfWidth, pdfHeight]);

      // Add the image to the PDF with the scaled dimensions
      pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);

      // Add avatar name (text) to the PDF
      const avatarName = 'Authorized Signature'; // You can replace this with any dynamic value
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 0); // Yellow color
      pdf.text(avatarName, pdfWidth / 2, pdfHeight - 20, { align: 'center' }); // Position the text at the bottom center

      // Save PDF
      const pdfFile = pdf.output('blob');

      // Create a URL for the blob and trigger a download
      const url = URL.createObjectURL(pdfFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'certificate.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Send PDF to server
      const formData = new FormData();
      formData.append('file', pdfFile);
      formData.append('email', studentData.email); // Assume studentData contains email

      try {
        await fetch('/api/v1/users/send-pdf', {
          method: 'POST',
          body: formData,
        });
        alert('PDF sent successfully!');
      } catch (error) {
        console.error('Error sending PDF:', error);
        alert('Failed to send PDF.');
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Transfer Certificate Generator</h1>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">
          Roll Number:
          <input
            type="text"
            value={rollNumbers}
            onChange={(e) => setRollNumbers(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <button
          onClick={fetchStudentData}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Fetch Student Data
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {studentData && (
        <div className="mt-6">
          <div
            id="certificate"
            className="w-[850px] mx-auto bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-10 text-center bg-gradient-to-r from-green-500 to-blue-600 text-white">
              <h1 className="text-5xl font-bold uppercase mb-4">Certificate of Completion</h1>
              <p className="text-2xl mb-4">
                This certifies that <strong className="text-yellow-300">{studentData.studentName}</strong> has successfully completed the course:
              </p>
              <p className="text-2xl italic">{studentData.courseName}</p>
            </div>

            <div className="p-10 text-left">
              <p className="text-xl mb-4">
                Awarded to: <strong className="text-yellow-300">{studentData.studentName}</strong>
              </p>
              <p className="text-xl mb-4">
                For successful completion of: <em>{studentData.courseTitle}</em>
              </p>
              <p className="text-lg mb-4">Date of Completion: {studentData.date}</p>
              <p className="text-lg mb-4">Student Email: {studentData.emailAddress}</p>
            </div>

            <div className="flex flex-col items-center mb-10">
              <img
                src="/signature.png"
                alt="Signature"
                className="w-40 h-auto rounded-full border-4 border-white shadow-lg"
              />
              <p className="text-xl text-yellow-300 mt-4 font-semibold">HEAD OF SMIT</p>
            </div>
          </div>
          <button
            onClick={generatePDF}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Download & Send PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default TransferCertificate;
