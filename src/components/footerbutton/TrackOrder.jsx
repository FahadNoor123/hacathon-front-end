import React, { useState } from 'react';
import { format, addDays } from 'date-fns';

const TrackOrder = () => {
  const [email, setEmail] = useState('');
  const [trackingResults, setTrackingResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTrackingResults([]);
  
    try {
      const response = await fetch(`/api/order/track-order?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tracking information: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.orders && data.orders.length > 0) {
        setTrackingResults(data.orders);
      } else {
        setError('No tracking information found for the provided email.');
      }
    } catch (error) {
      setError('An error occurred while fetching tracking information. Please try again later.');
    }
  
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Track Your Order</h2>

      <p className="text-lg text-gray-700 mb-6">
        To track your order, please enter the email address used to place the order. Click "Track Order" to view the current status and estimated delivery time.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          className="px-4 py-2 border border-gray-300 rounded focus:border-indigo-500 focus:outline-none"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
        >
          {loading ? 'Tracking...' : 'Track Order'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded">
          <h3 className="text-xl font-semibold text-red-700">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {trackingResults.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Tracking Information</h3>
          {trackingResults.map((order, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700">
                <strong>Order #{index + 1}</strong>
              </p>
              <p className="text-gray-700">
                <strong>Customer:</strong> {order.customer.firstName}
              </p>
              <p className="text-gray-700 transition-opacity duration-300">
                <strong>Status:</strong> {order.status}
              </p>
              {order.status === 'Cancelled' ? (
                <p className="text-gray-700">
                  <strong>Estimated Delivery:</strong> Order Cancelled
                </p>
              ) : (
                <p classname="text-gray-700">
                  <strong>Estimated Delivery:</strong> {format(addDays(new Date(order.createdAt), 3), 'MMMM do, yyyy')}
                </p>
              )}
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
