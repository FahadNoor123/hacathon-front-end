import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProductCart from '../cart/ProductCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageModal from './ImageModal'; 
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
const QuantityInput = ({ quantity, incrementQuantity, decrementQuantity }) => (
  <div className="flex items-center mt-4">
    <label className="mr-4">Quantity:</label>
    <div className="flex items-center">
      <button onClick={decrementQuantity} className="p-2 border rounded-md">-</button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="p-2 border rounded-md w-16 text-center"
      />
      <button onClick={incrementQuantity} className="p-2 border rounded-md">+</button>
    </div>
  </div>
);

function ProductOverview() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal control
  const [modalImage, setModalImage] = useState(null);



  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/product/product-over-view/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }

        const data = await response.json();

        if (!data.product) {
          throw new Error('Invalid server response');
        }

        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const loaderContainerStyles = {
    display: "flex",
    justifyContent: "center", // Centers horizontally
    alignItems: "center", // Centers vertically
    height: "100vh", // Ensures the loader fills the full viewport height
    width: "100%", // Fills full viewport width
  };

  const loaderStyles = css`
    border-color: red; // Color of the spinner border
  `;

  if (loading) {
    return (
      <div style={loaderContainerStyles}>
        <RingLoader css={loaderStyles} size={80} color={"#123abc"} loading={true} />
      </div>
    );
  }

  if (!product) {
    return <div>No product found!</div>;
  }
  const handleImageClick = (image) => {
    setModalImage(image); // Set the clicked image to modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalImage(null); // Clear the modal image
  };

  const highlights = Array.isArray(product.highlights) ? product.highlights : [];
  const images = Array.isArray(product.productImage) ? product.productImage : [];

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    const cartItem = {
      product: {
        ...product,
        image: images[0], // Assuming you want to use the first image in the cart
      },
      selectedColor,
      selectedSize,
      price: product.price,
      quantity,
      product_id: id + selectedColor,
    };

    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = [...existingCartItems, cartItem];

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItemCount(updatedCartItems.length);

    toast.success(
      <div className="flex items-center">
        <img
          src={cartItem.product.image}
          alt={`Product: ${cartItem.product.product}`}
          className="w-12 h-12 object-cover rounded-md mr-2"
        />
        <div>
          <p className="text-lg font-semibold mb-1">{cartItem.product.product}</p>
          <p>Price: {cartItem.product.price}</p>
          <p>Quantity: {cartItem.quantity}</p>
        </div>
      </div>,
      {
        position: 'top-right',
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };
 

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">{product.product}</h1>

        <div className="grid grid-cols-2 gap-2">
          {product.productImage.slice(0, 4).map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-full h-38 md:h-64 object-cover object-center rounded-md"
                onClick={() => handleImageClick(image)} // Open the modal with the clicked image
              />
            </div>
          ))}
        </div>



<p className="text-sm sm:text-base text-gray-700 mt-4">{product.description}</p>


        <div className="flex items-center mt-4">
          <label className="mr-4 text-black">Color:</label>
          <div className="flex space-x-4">
            {product.colors.map((color, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`cursor-pointer p-2 rounded-md ${selectedColor === color ? 'border border-black bg-gray-500 text-white' : ''}`}
              >
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center mt-4">
          <label className="mr-4 text-black">Size:</label>
          <div className="flex space-x-4">
            {product.sizes.map((size, index) => (
              <div
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`cursor-pointer p-2 rounded-md ${selectedSize === size ? 'border border-black bg-gray-500 text-white font-bold' : ''}`}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white">
          <QuantityInput
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        <h3 className="flex items-center text-gray-700 mt-4 font-bold underline">
  PKR = {product.price}
  <del className="text-gray-500 ml-2">{`RS ${product.fakeprice}`}</del>
</h3>
          <button
            type="button"
            onClick={addToCart}
            className="mt-8 bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Add to Cart
          </button>
          <Link to="/" className="block mt-8">
          <button
            type="button"
            className="bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Continue Shopping
          </button>
        </Link>
          {/* <ProductCart cartItemCount={cartItemCount} /> */}
        </div>
      </div>
      {isModalOpen && modalImage && (
          <ImageModal image={modalImage} onClose={closeModal} />
        )}
      <ToastContainer />
    </div>
  );
}

export default ProductOverview;
