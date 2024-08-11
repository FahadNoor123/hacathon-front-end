import React, { useState } from 'react';
import Swal from 'sweetalert2';

const GenerateCertificate = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    awardeeName: '',
    details: '',
    course: '',
    signatureTitle: '',
    date: '',
    dateTitle: ''
  });

  const [certificateUrl, setCertificateUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, subtitle, awardeeName, details, course, signatureTitle, date, dateTitle } = formData;

    const modifications = [
      { name: 'title', text: title },
      { name: 'subtitle', text: subtitle },
      { name: 'awardee_name', text: awardeeName },
      { name: 'details', text: details },
      { name: 'course', text: course },
      { name: 'signature_title', text: signatureTitle },
      { name: 'date', text: date },
      { name: 'date_title', text: dateTitle }
    ];

    const apiKey = import.meta.env.VITE_BANNERBEAR_API_KEY;
    const templateId = import.meta.env.VITE_BANNERBEAR_TEMPLATE_ID;
 
    const requestBody = {
      template: templateId,
      modifications,
      webhook_url: null,
      transparent: false,
      metadata: null
    };

    try {
      const response = await fetch('https://api.bannerbear.com/v2/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificate');
      }

      const data = await response.json();
      console.log('Certificate generated:', data);

      setCertificateUrl(data.self);

      Swal.fire({
        icon: 'success',
        title: 'Certificate Generated!',
        text: 'Your certificate has been successfully generated.',
        confirmButtonText: 'Download Certificate',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          handleDownload(data.self);
        }
      });

    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDownload = async (selfUrl) => {
    if (selfUrl) {
      const apiKey = import.meta.env.VITE_BANNERBEAR_API_KEY;

      try {
        const response = await fetch(selfUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch certificate details');
        }

        const data = await response.json();
        console.log('Certificate details:', data);

        window.open(data.image_url, '_blank');
      } catch (error) {
        console.error('Error fetching certificate details:', error);
      }
    } else {
      console.error('Certificate URL is not available');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Certificate Generator Portal</h1>
        <div>
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input mt-1 w-full rounded-lg px-4 py-2 border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Subtitle:</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="form-input mt-1 w-full rounded-lg px-4 py-2 border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Awardee Name:</label>
          <input
            type="text"
            name="awardeeName"
            value={formData.awardeeName}
            onChange={handleChange}
            className="form-input mt-1 w-full rounded-lg px-4 py-2 border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Details:</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="form-textarea mt-1 w-full rounded-lg px-4 py-2 border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="form-input mt-1 w-full rounded-lg px-4 py-2 border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Signature Title:</label>
          <input
            type="text"
            name="signatureTitle"
            value={formData.signatureTitle}
            onChange={handleChange}
            className="form-input mt-1 w-full rounded-lg px-4 py-2 border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Date:</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input mt-1 w-full rounded-lg px-4 py-2 border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-700">Date Title:</label>
          <input
            type="text"
            name="dateTitle"
            value={formData.dateTitle}
            onChange={handleChange}
            className="form-input mt-1 w-full rounded-lg px-4 py-2 border border-gray-300"
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Generate Certificate
        </button>
      </form>

      {certificateUrl && (
        <button
          onClick={() => handleDownload(certificateUrl)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Download Certificate
        </button>
      )}
    </div>
  );
};

export default GenerateCertificate;
