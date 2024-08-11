import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiPhone, FiMail } from 'react-icons/fi';

const ContactUs = () => {
  const [faqIndex, setFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setFaqIndex(faqIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>

      <p className="mb-6 text-lg text-gray-700">
        We're here to help! You can reach out to us via the following methods:
      </p>

      <div className="divide-y divide-gray-200">
        {/* Contact via WhatsApp */}
        <div>
          <button
            className="w-full flex justify-between items-center text-lg font-semibold py-3 hover:bg-gray-100 transition-all"
            onClick={() => toggleFaq(1)}
          >
            <span className="flex items-center gap-2">
              <FiPhone /> Contact via WhatsApp
            </span>
            {faqIndex === 1 ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {faqIndex === 1 && (
            <div className="p-4 bg-gray-50 text-sm sm:text-base rounded-b-xl">
              You can reach us on WhatsApp at +92-300-1234567. Please include your order number and a brief description of your inquiry.
            </div>
          )}
        </div>

        {/* Contact via Email */}
        <div>
          <button
            className="w-full flex justify-between items-center text-lg font-semibold py-3 hover:bg-gray-100 transition-all"
            onClick={() => toggleFaq(2)}
          >
            <span className="flex items-center gap-2">
              <FiMail /> Contact via Email
            </span>
            {faqIndex === 2 ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {faqIndex === 2 && (
            <div className="p-4 bg-gray-50 text-sm sm:text-base rounded-b-xl">
              You can email us at support@yourdomain.com. Please include your order number and a brief description of your issue.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
