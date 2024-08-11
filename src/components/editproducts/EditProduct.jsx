import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { RingLoader } from 'react-spinners';

const EditProduct = () => {
  const { productId } = useParams(); // Get the product ID from the route parameter
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [images, setImages] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/Admin/edit-product/${productId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
          setFormValues(productData);
          setImages(productData.productImage || []); // Initialize images
          setLoading(false);
        } else {
          throw new Error('Failed to fetch product');
        }
      } catch (error) {
        Swal.fire('Error', 'Could not load product details.', 'error');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Get the uploaded files
    const newImages = files.map((file) => URL.createObjectURL(file)); // Create object URLs for display
    setImages((prev) => [...prev, ...newImages]); // Add new images
  };

  const handleImageDelete = async (imageUrl) => {
    try {
      const response = await fetch(`/api/Admin/delete-image`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, imageUrl }),
      });

      if (response.ok) {
        const updatedImages = images.filter((img) => img !== imageUrl);
        setImages(updatedImages);
        setFormValues({ ...formValues, productImage: updatedImages });
        Swal.fire('Deleted!', 'Image has been deleted.', 'success');
      } else {
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      Swal.fire('Error', 'Could not delete image. Please try again.', 'error');
    }
  };

  const handleSave = async () => {
    try {
      const updatedProductData = { ...formValues, productImage: images };

      const response = await fetch(`/api/Admin/edit-product/${productId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      });

      if (response.ok) {
        Swal.fire('Success', 'Product updated successfully!', 'success');
        navigate('/admin/manage-product');
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      Swal.fire('Error', 'Could not save product. Please try again.', 'error');
    }
  };

  const handleDelete = async () => {
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
          });

          if (response.ok) {
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            navigate('/admin/manage-product');
          } else {
            throw new Error('Failed to delete product');
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

  if (!product) {
    return (
      <div className="text-center text-red-500">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <div className="bg-white shadow rounded p-6">
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Product Name</label>
            <input
              type="text"
              name="product"
              value={formValues.product}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Product Description</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              rows={7}
              style={{ resize: 'vertical' }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Category</label>
            <input
              type="text"
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div class="mb-4">
            <label className="block text-gray-700 font-bold">Price</label>
            <input
              type="number"
              name="price"
              value={formValues.price}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div class="mb-4">
            <label className="block text-gray-700 font-bold">Fake Price</label>
            <input
              type="number"
              name="fakeprice"
              value={formValues.fakeprice}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div class="mb-4">
            <label className="block text-gray-700 font-bold">Product Color</label>
            <input
              type="string"
              name="colors"
              value={formValues.colors}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div class="mb-4">
            <label className="block text-gray-700 font-bold">Product Size</label>
            <input
              type="string"
              name="size"
              value={formValues.sizes}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Product Images</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {images.map((image, index) => (
                <div key={index} className="relative border p-2 rounded">
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-20 sm:h-28 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    onClick={() => handleImageDelete(image)}
                  >
                    ✖️
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Upload New Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white rounded px-4 py-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white rounded px-4 py-2"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
