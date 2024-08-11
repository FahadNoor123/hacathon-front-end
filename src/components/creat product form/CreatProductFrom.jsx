import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { PropagateLoader } from 'react-spinners';;
const CreateProductForm = () => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [product, setProduct] = useState({
    name: '',
    price: '',
    fakeprice: '',
    description: '',
    category: '',
    quantity: '',
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const sizes = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Orange', 'Purple', 'Pink', 'Brown', 'Gray', 'Cyan'];

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((prevSize) => prevSize !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) => {
      if (prevColors.includes(color)) {
        return prevColors.filter((prevColor) => prevColor !== color);
      } else {
        return [...prevColors, color];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
  
      // Append text fields
      formData.append("product", product.product);
      formData.append("price", product.price);
      formData.append("fakeprice", product.fakeprice);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("quantity", product.quantity);
  
      // Append arrays (selectedSizes and selectedColors)
      formData.append("selectedSizes", JSON.stringify(selectedSizes));
      formData.append("selectedColors", JSON.stringify(selectedColors));
  
      // Append image files
      const imageInput = document.querySelector('input[name="productImage"]');
      for (const file of imageInput.files) {
        formData.append("productImage", file);
      }
  
      const response = await fetch("/api/Admin/create-product", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("Product data submitted successfully");
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product added successfully!',});
          setLoading(false);
        // Additional logic after successful submission
      }  else {
        // Check if the response indicates a duplicate product error
        if (response.status === 409) {
          const errorMessage = await response.text();
          console.error("Failed to submit product data. Server error:", errorMessage);
          // Show Swal alert for duplicate product error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Product already exists!',
          });
          setLoading(false);
        } else {
          // Handle other server errors
          const errorMessage = await response.text();
          console.error("Failed to submit product data. Server error:", errorMessage);
          setLoading(false);
          // Additional error handling logic
        }
      }
    } catch (error) {
      console.error("An error occurred during submission:", error);
      // Handle other errors
    }
    setLoading(false);
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-700 text-white">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md text-black">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Add New Product</h2>
        <form
            encType="multipart/form-data"
          onSubmit={handleSubmit} // Add onSubmit prop here
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="product"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* ... Other form fields ... */}

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fakeprice" className="block text-sm font-medium mb-2">
              Fake Price
            </label>
            <input
              type="text"
              name="fakeprice"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium mb-2 text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium mb-2 text-gray-700">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sizes" className="block text-sm font-medium mb-2" required>
              Sizes
            </label>
            <div className="flex flex-wrap">
              {sizes.map((size) => (
                <label key={size} className="inline-flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  <span className="ml-2 text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>
          {/* ... (other form fields) ... */}

          <div className="mb-4">
            <label htmlFor="colors" className="block text-sm font-medium mb-2" required>
              Colors
            </label>
            <div className="flex flex-wrap">
              {colors.map((color) => (
                <label key={color} className="inline-flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                  />
                  <span className="ml-2 text-sm">{color}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              Product Image
            </label>
            <input type="file" name="productImage" className="w-full py-2" multiple  onChange={(e) => {
        if (e.target.files.length > 4) {
          setImageError(true); // Set imageError to true if more than 4 images are selected
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You can only select up to 4 images!',
          });
        } else {
          setImageError(false); // Clear the error if 4 or fewer images are selected
        }
      }}
    />
    {imageError && (
      <p className="text-red-500 text-sm mt-1">You can only select up to 4 images!</p>
    )}
  </div>

          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 focus:outline-none"
          >{loading ? (
            <PropagateLoader color="rgba(79, 70, 229)"size={30} /> // Render PropagateLoader while loading
          ) : (
            'Add Product'
          )}
           
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
