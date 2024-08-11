import React, { useState } from 'react';

const ReturnPolicy = () => {
  const [faqIndex, setFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setFaqIndex(faqIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Return Policy</h2>

      <p className="mb-4 text-gray-600 text-base sm:text-lg">
        We understand that sometimes things don't work out. Here's our return policy to ensure a smooth process.
      </p>

      <div className="divide-y divide-gray-200">
        {/* FAQ - When is the return policy applicable? */}
        <div>
          <button
            className="w-full text-left text-base sm:text-lg font-semibold py-3 hover:bg-gray-100"
            onClick={() => toggleFaq(1)}
          >
            When is the return policy applicable?
          </button>
          {faqIndex === 1 && (
            <div className="p-4 bg-gray-50 text-sm sm:text-base">
              The return policy is applicable when the product is unused, in its original packaging, and includes all tags and accessories. If shoes are worn, they will not be accepted for return.
            </div>
          )}
        </div>

        {/* FAQ - What is the return timeframe? */}
        <div>
          <button
            className="w-full text-left text-base sm:text-lg font-semibold py-3 hover:bg-gray-100"
            onClick={() => toggleFaq(2)}
          >
            What is the return timeframe?
          </button>
          {faqIndex === 2 && (
            <div className="p-4 bg-gray-50 text-sm sm:text-base">
              Returns must be initiated within 15 days from the date of receipt or purchase. If you're outside this window, we won't be able to accept your return.
            </div>
          )}
        </div>

        {/* FAQ - Who pays for return shipping? */}
        <div>
          <button
            className="w-full text-left text-base sm:text-lg font-semibold py-3 hover:bg-gray-100"
            onClick={() => toggleFaq(3)}
          >
            Who pays for return shipping?
          </button>
          {faqIndex === 3 && (
            <div className="p-4 bg-gray-50 text-sm sm:text-base">
              Customers are responsible for return shipping costs unless the item is defective or incorrect. We provide prepaid labels in such cases.
            </div>
          )}
        </div>

        {/* FAQ - How are refunds processed? */}
        <div>
          <button
            class="w-full text-left text-base sm:text-lg font-semibold py-3 hover:bg-gray-100"
            onClick={() => toggleFaq(4)}
          >
            How are refunds processed?
          </button>
          {faqIndex === 4 && (
            <div className="p-4 bg-gray-50 text-sm sm:text-base">
              Refunds are processed within 5-10 business days after receiving the returned item. Refunds are issued to the original payment method or as store credit, depending on your preference.
            </div>
          )}
        </div>

        {/* FAQ - What if I receive a defective or damaged item? */}
        <div>
          <button
            class="w-full text-left text-base sm:text-lg font-semibold py-3 hover:bg-gray-100"
            onClick={() => toggleFaq(5)}
          >
            What if I receive a defective or damaged item?
          </button>
          {faqIndex === 5 && (
            <div className="p-4 bg-gray-50 text-sm sm:text-base">
              If you receive a defective or damaged item, please contact us the same day you receive the parcel. We will arrange for a replacement, including a prepaid return label.
            </div>
          )}
        </div>

        {/* FAQ - How does a customer contact for a return? */}
        <div>
          <button
            className="w-full text-left text-base sm:text-lg font-semibold py-3 hover:bg-gray-100"
            onClick={() => toggleFaq(6)}
          >
            How does a customer contact for a return?
          </button>
          {faqIndex === 6 && (
            <div className="p-4 bg-gray-50 text-sm sm:text-base">
              You can contact our customer service through WhatsApp at +92-300-1234567. Please provide your order details and the reason for return.
            </div>
          )}
        </div>

        {/* FAQ - How does a customer return a parcel? */}
        <div>
          <button
            className="w-full text-left text-base sm:text-lg font-semibold py-3 hover:bg-gray-100"
            onClick={() => toggleFaq(7)}
          >
            How does a customer return a parcel?
          </button>
          {faqIndex === 7 && (
            <div className="p-4 bg-gray-50 text-sm sm:text-base">
              Once you contact customer service via WhatsApp, we'll guide you on how to send the parcel back to us.

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
