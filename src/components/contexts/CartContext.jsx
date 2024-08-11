import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setCartItemCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.product_id !== productId));
    setCartItemCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <CartContext.Provider value={{ cartItems, cartItemCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
