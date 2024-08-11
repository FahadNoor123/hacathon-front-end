import React, { useState, useEffect } from 'react';
import { Trash } from 'lucide-react'; // Assuming you have lucide-react installed
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../notification/Notification';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ProductCart = ({ updateCartItemCount }) => {
  const navigate = useNavigate();


  const handleCheckOut = (cartTotal) => {
    // Navigate to the /checkout page with cartTotal as a URL parameter
    navigate(`/checkout/${cartTotal}`);
  };
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const showNotificationHandler = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const deliveryCharges = 200;

  const calculateTotalPrice = (item) => {
    const itemPrice = item.product.price * item.quantity;
    const totalWithDelivery = itemPrice + (item.isFirstItem ? deliveryCharges : 0);
    return totalWithDelivery;
  };

  if (cartItems.length > 0) {
    cartItems[0].isFirstItem = true;
  }

  const cartTotal = cartItems.reduce((total, item) => total + calculateTotalPrice(item), 0);

  const handleRemove = (productId) => {
    const confirmRemove = true;
    if (confirmRemove) {
      const updatedCartItems = cartItems.filter((item) => item.product_id !== productId);
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      updateCartItemCount(updatedCartItems.length);
      showNotificationHandler();
    }
  };

  return (
    <div className="mx-auto max-w-xl p-4 bg-white rounded-md shadow-md">
    <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
    {cartItems.length === 0 ? (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl text-black-500">Your cart is  empty.</h1>
        <Link to="/">
        <button
  className="mt-4 px-4 py-2 text-white rounded-md focus:outline-none"
  style={{
    backgroundColor: 'rgb(79, 70, 229)',
    transition: 'background-color 0.3s ease',
  }}
  onClick={() => handleBackToShopping()}
  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(63, 56, 166)'}
  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(79, 70, 229)'}
>
  Back to Shopping
</button>


        </Link>
      </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.product_id} className="py-4">
                <div className="flex items-start space-x-4">
                  <img
                    className="h-20 w-20 flex-shrink-0 rounded object-contain sm:h-24 sm:w-24"
                    src={item.product.image}
                    alt={item.product.product}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold leading-snug">{item.product.product}</h3>
                        <p className="text-sm">{item.product.color}</p>
                      </div>
                      <p className="text-lg font-semibold">{item.product.price} x {item.quantity}</p>
                    </div>
                    <div className="text-sm">
                      <button
                        type="button"
                        className="flex items-center space-x-2 px-2 py-1 pl-0"
                        onClick={() => handleRemove(item.product_id)}
                      >
                        <Trash size={16} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-xl font-bold">Total Amount: Rs {cartTotal}</p>
            {showNotification && <Notification product={cartItems[0]} />}
           
  <button
    className="mt-4 font-bold px-8 py-2 w-full max-w-md text-black rounded-md border border-black hover:bg-gray-100 focus:outline-none"
    onClick={() => handleCheckOut(cartTotal)}
  >
    Check Out
  </button>





          </div>
        </>
      )}
    </div>
  );
};

export default ProductCart;
