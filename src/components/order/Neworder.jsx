import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import swal from 'sweetalert2';

const NewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [totalOrders, setTotalOrders] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders =async () => {
      const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('myAccessToken='))
      ?.split('=')[1];
      setLoading(true);
      try {
        const response = await fetch(`/api/order/total-order?page=${page}&limit=${itemsPerPage}`, {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
;
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }
        const data = await response.json();
        setOrders(data.orders || []);
        setTotalOrders(data.totalOrders || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setSelectedStatus(order.status); // Initialize the selected status with the order's status
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value); // Update the selected status when it changes
  };

  const handleStatusSave = async () => {
    console.log("Order ID:", selectedOrder?._id); 
    try {
      const response = await fetch(`/api/order/update/${selectedOrder._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: selectedStatus }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }
  
      // Success alert with SweetAlert
      swal.fire({
        title: 'Status Updated',
        text: 'The order status has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      setSelectedOrder(null); // Close the modal after saving
    } catch (error) {
      console.error("Error saving status:", error);
  
      // Error alert with SweetAlert
      swal.fire({
        title: 'Error Updating Status',
        text: 'There was an error updating the order status. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-700">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error fetching orders: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-center items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Latest Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <>
            <table className="w-full bg-white shadow-md rounded overflow-hidden">
              <thead className="bg-indigo-600">
                <tr>
                  <th className="p-4 text-left text-white">S.no</th>
                  <th className="p-4 text-left text-white">Customer Name</th>
                  <th className="p-4 text-left text-white">Status</th>
                  <th className="p-4 text-left text-white">Order Date</th>
                  <th className="p-4 text-left text-white">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-200 transition duration-150 ease-in-out cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <td className="p-4 text-center">{(page - 1) * itemsPerPage + index + 1}</td>
                    <td className="p-4 text-center">{order.customer?.firstName || 'N/A'}</td>
                    <td className="p-4 text-center">{order.status|| 'N/A'}</td>
                    <td class="p-4 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td class="p-4 text-center">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
                disabled={page === 1}
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-2 rounded ${
                      page === i + 1 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-3/4 md/w-1/2 lg/w-1/3">
              <h3 className="text-xl font-bold">Order Details</h3>
              <p>Order ID: {selectedOrder._id}</p>
              <p>Customer: {selectedOrder.customer?.firstName}</p>
              <p>Order Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              <p>Total Price: ${selectedOrder.total.toFixed(2)}</p>

              <div>
  <label htmlFor="status" className="block mt-4 font-bold">
    Change Status
  </label>
  <select
    id="status"
    value={selectedStatus} // This should reflect the current status
    onChange={handleStatusChange}
    className="mt-2 border-gray-300 rounded px-3 py-2"
  >
    {['Pending', 'Process', 'Dispatched', 'Delivered', 'Cancelled'].map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </select>
</div>


              <div className="flex justify-between mt-4">
                <button
                  onClick={handleStatusSave}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrder;
