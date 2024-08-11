import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import Swal from 'sweetalert2';

// Utility function to group products by category
const groupByCategory = (products) => {
  return products.reduce((result, product) => {
    const { category } = product;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(product);
    return result;
  }, {});
};

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('myAccessToken='))
      ?.split('=')[1];
      
      try {
        const response = await fetch('/api/Admin/manage-products', {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        Swal.fire('Error', 'Could not load products.', 'error');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/Admin/delete-product/${productId}`, {
            method: 'DELETE',
            credentials: 'include',
          });

          if (response.ok) {
            setProducts(products.filter((product) => product._id !== productId));
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
          } else {
            throw new Error('Failed to delete the product');
          }
        } catch (error) {
          Swal.fire('Error', 'Could not delete the product. Please try again.', 'error');
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RingLoader size={100} color="#123abc" loading={true} />
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  const productsByCategory = groupByCategory(products);

  return (
    <div className="container mx-auto py-8 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Manage Products</h2>

      {Object.keys(productsByCategory).map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-teal-600">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsByCategory[category].map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row p-4 gap-6">
                  <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">{product.product}</h4>
                  <p className="text-base text-gray-700 mb-2">{`Price: ${product.price}`}</p>
                  <p className="text-base text-gray-700 mb-2">{`Fake Price: ${product.fakeprice}`}</p>
                  <p className="text-base text-gray-700 mb-2">{`Category: ${product.category}`}</p>
                  </div>
                  <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
                    {product.productImage?.slice(0, 4).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between p-4 border-t">
                  <button
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                    className="bg-blue-500 text-white rounded px-3 py-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white rounded px-3 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProduct;
