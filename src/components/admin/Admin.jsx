// Admin.jsx
import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import CreatProductForm from '../creat product form/CreatProductFrom';

const Admin = () => {
    const navigate = useNavigate();

    const handleCreateProductClick = () => {
      // Navigate to the "create-product" route
      navigate('/admin/create-product');
      console.log("button is clicked")
    };
    const handleManageProductClick = () => {
      // Navigate to the "create-product" route
      navigate('/admin/manage-product');
      console.log("button is clicked")
    };
    const handleNewOrderClick = () => {
      // Navigate to the "create-product" route
      navigate('/admin/new-order');
      console.log("button is clicked")
    };
    const handleTotalOrderClick = () => {
      // Navigate to the "create-product" route
      navigate('/admin/total-order');
      console.log("button is clicked")
    };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white rounded-md shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-blue-700">Admin Section</h2>

        <div className="flex flex-wrap justify-center gap-8">
          <Link >
            <button className="bg-blue-700 text-white px-6 py-4 rounded-md hover:bg-blue-800 focus:outline-none transition duration-300" onClick={handleCreateProductClick}>
              Create Product
            </button>
          </Link>
          <Link >
          <button className="bg-blue-700 text-white px-6 py-4 rounded-md hover:bg-blue-800 focus:outline-none transition duration-300" onClick={handleManageProductClick}>
            Manage Products
          </button>
          </Link>
          <button className="bg-blue-700 text-white px-6 py-4 rounded-md hover:bg-blue-800 focus:outline-none transition duration-300" onClick={handleNewOrderClick}>
            New Orders Details
          </button>

          <button className="bg-blue-700 text-white px-6 py-4 rounded-md hover:bg-blue-800 focus:outline-none transition duration-300" onClick={ handleTotalOrderClick}>
            Total Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
