import React, { useState, useEffect } from 'react';

const Totalorder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0); // New state for total order count
  const itemsPerPage = 10; // You can adjust this number

  useEffect(() => {
    const fetchOrders = async () => {
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
        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }
        const data = await response.json();
        setOrders(data.orders || []);
        setTotalOrders(data.totalOrders || 0);
        console.log("This is total order",data.totalOrders) // Update total order count
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

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

  const totalPages = Math.ceil(totalOrders / itemsPerPage); // Calculate total pages based on totalOrders
  
  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages)); // Ensure we don't exceed total pages
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex justify-start items-center">
      <div className="w-full max-w-2xl ml-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center sm:text-left">
          Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div>
            <table className="w-full bg-white shadow-md rounded overflow-hidden">
              <thead className="bg-indigo-600">
                <tr>
                  <th className="p-4 text-left text-white">S.no</th>
                  <th className="p-4 text-left text-white">Customer Name</th>
                  <th className="p-4 text-left text-white">Customer Address</th>
                  <th className="p-4 text-left text-white">Customer Email</th>
                  <th className="p-4 text-left text-white">Order Date</th>
                  <th className="p-4 text-left text-white">Order Status</th>
                  <th className="p-4 text-left text-white">Products</th>
                  <th className="p-4 text-left text-white">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, orderIndex) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-200 transition duration-150 ease-in-out cursor-pointer"
                    onClick={() => handleRowClick(order)}
                  >
                    <td className="p-4 text-center">{(page - 1) * itemsPerPage + orderIndex + 1}</td> {/* Updated S.no */}
                    <td className="p-4 text-center">{order.customer?.firstName || 'N/A'}</td>
                    <td
                      className="p-4 text-center truncate"
                      title={order.customer?.address || 'No address'}
                    >
                      {order.customer?.address?.slice(0, 15) + '...'}
                    </td>
                    <td className="p-4 text-center">{order.customer?.email || 'N/A'}</td>
                    <td className="p-4 text-center">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4 text-center">{order.status || 'Unknown'}</td>
                    <td className="p-4 text-center">
                      <ul className="list-none list-inside truncate">
                        {order.products?.map((product, index) => (
                          <li key={index}>
                            {product?.name?.slice(0, 10) + '...' || 'N/A'}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 text-center">
                      ${order.total ? order.total.toFixed(2) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
                disabled={page === 1}
              >
                Previous
              </button>

              <div className="flex space-x-2"> {/* Page buttons */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-2 rounded ${
                      page === i + 1 ? "bg-blue-700 text-white" : "bg-blue-500 text-white"
                      } hover:bg-blue-700`}
                      >
                      {i + 1}
                      </button>
                      ))}
                      </div>
                      
                     
                                <button
                                  onClick={handleNextPage}
                                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
                                  disabled={page === totalPages}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          )}
                      
                          {selectedOrder && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                              <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                                <h3 className="text-xl font-bold">Order Details</h3>
                                <p>Customer: {selectedOrder.customer?.firstName}</p>
                                <p>Address: {selectedOrder.customer?.address}</p>
                                <p>Email: {selectedOrder.customer?.email}</p>
                                <h4>Products:</h4>
                                <ul>
                                  {selectedOrder.products?.map((product, index) => (
                                    <li key={index}>
                                      {product.name || "Unknown Product"} - {product.quantity} x ${product.price ? product.price.toFixed(2) : "N/A"}
                                      {product.size ? ` (Size: ${product.size})` : ""}
                                      {product.color ? ` (Color: ${product.color})` : ""}
                                    </li>
                                  ))}
                                </ul>
                                <p>Total Price: ${selectedOrder.total ? selectedOrder.total.toFixed(2) : "N/A"}</p>
                                <button
                                  onClick={() => setSelectedOrder(null)}
                                  className="mt-4 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      );
                      };
                      
                      export default Totalorder;
                      
                     
