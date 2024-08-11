import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Navbar from './components/nav/Navbar.jsx';
import Productcart from './components/cart/ProductCart.jsx';  // Import the Productcart component
import { Newnavbar } from './components/nav/Newnavbar.jsx';

function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div>
     <Navbar openCart={openCart} />
    {/* <Newnavbar/> */}
      {/* Navbar with shopping cart icon */}


      

      {/* Other components rendered by the Router */}
      <Outlet />

      {/* Shopping cart component */}
      {isCartOpen && <Productcart />}

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
