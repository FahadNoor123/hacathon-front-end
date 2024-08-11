import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import swal from 'sweetalert2';

const navigation = {
  pages: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Generate Certificate', href: '/generate-certificate' },
    { name: 'Verify Certificate', href: '/verify-certificate' },
    { name: 'Transfer Certificate Roll Number', href: '/transfer-certificate' },
  ],
};
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);

  useEffect(() => {
    // Check isAdmin status from local storage on component mount
    const isAdminStored = localStorage.getItem('isAdmin');
    setIsAdmin(isAdminStored === 'true');
    const isloggedin = localStorage.getItem('isloggedin');
    setIsloggedin(isloggedin === 'true');
    // Load cart item count from local storage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    setCartItemCount(storedCartItems ? storedCartItems.length : 0);

    // Listen for changes in local storage and update cart item count accordingly
    const handleStorageChange = (event) => {
      if (event.key === 'cartItems') {
        const updatedCartItems = JSON.parse(event.newValue);
        setCartItemCount(updatedCartItems ? updatedCartItems.length : 0);
      }
      if (event.key === 'isAdmin') {
        setIsAdmin(event.newValue === 'true');
      }
      if (event.key === 'isloggedin') {
        setIsloggedin(event.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCategoryClick = (offset) => {
    setScrollOffset(offset);
    setOpen(false); // Close the mobile menu
  };

  const handlePakistanClick = () => {
    // Show success message
    swal.fire({
      icon: 'info',
      text: 'Empowering lives by offering food, clean water, financial aid, and skill-building courses to uplift communities and create a brighter future for the youth.',
      confirmButtonText: 'OK',
    });
  };
  const clearAllCookies = () => {
    // Get all cookies from document.cookie
    const cookies = document.cookie.split(';');
  
    // Loop through each cookie and set its expiration to a past date
    cookies.forEach((cookie) => {
      // Extract the cookie name
      const cookieName = cookie.split('=')[0].trim();
  
      // Clear the cookie by setting its value to empty and expiration to the past
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
  };
  
  const handleLogout = () => {
    console.log("user logout")
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isloggedin');
    clearAllCookies();
    setIsAdmin(false);
    setIsloggedin(false);
  };
  return (
    <div className="bg-white">
      
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        to={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        onClick={() => setOpen(false)}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                
                  <div className="flow-root">
                  {isloggedin  ? (
  <li className="-m-2 block p-2 font-medium text-gray-900" style={{ listStyle: 'none' }}>
    <button onClick={handleLogout} >Logout</button>
  </li>
) : (
  <li className="-m-2 block p-2 font-medium text-gray-900" style={{ listStyle: 'none' }}>
    <Link to="/create-account" >Login</Link>
  </li>
)}
                   
                  </div>

                  <div className="flow-root">
                  <Link to='Admin' style={{ listStyle: 'none' }} className="-m-2 block p-2 font-medium text-gray-900">
                         {isAdmin && <li>Admin</li>}
                  </Link>
                   
                  </div>

                  
                </div>

               
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-12"
                    src="data:image/png;base64,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"
                    alt="brand Logo"
                  />
                </Link>
              </div>

              <div className="hidden lg:ml-8 lg:flex lg:self-stretch">
                <div className="flex h-full space-x-8 px-4 py-6">
                {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        to={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        onClick={() => setOpen(false)}
                      >
                        {page.name}
                      </Link>
                    ))}
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link to='admin' className="text-white no-underline">
  {isAdmin && (
    <div className="list-none">
      <li className="transition-colors duration-300 hover:text-blue-500 rounded-md p-2" style={{ backgroundColor: 'rgba(79, 70, 229, 0.8)', fontWeight: 'bold' }}>
        Admin
      </li>
    </div>
  )}
</Link>
                  {/* <Link to='login'>
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Sign in
                    </a>
                  </Link> */}
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  {isloggedin  ? (
  <li className="-m-2 block p-2 font-medium text-gray-900" style={{ listStyle: 'none' }}>
    <button onClick={handleLogout} >Logout</button>
  </li>
) : (
  <li className="-m-2 block p-2 font-medium text-gray-900" style={{ listStyle: 'none' }}>
    <Link to="/create-account" >Login</Link>
  </li>
)}

                </div>

                <div className="bg-white">
      {/* Your JSX code here */}
      <a href="#" className="flex items-center text-gray-700 hover:text-gray-800" onClick={handlePakistanClick}>
        <img
          src="https://imgs.search.brave.com/q5XNfJ_a4uJ5O7iZqNY-O1BfAsU7ypT-ZHVoW7KYQyc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8zLzMyL0Zs/YWdfb2ZfUGFraXN0/YW4uc3ZnLzY0MHB4/LUZsYWdfb2ZfUGFr/aXN0YW4uc3ZnLnBu/Zw"
          alt=""
          className="block h-auto w-5 flex-shrink-0"
        />
        <span className="ml-3 block text-sm font-medium">PAK</span>
        <span className="sr-only">, change currency</span>
      </a>
    </div>

                {/* Search */}
                {/* Search */}
{/* <div className="flex lg:ml-6">
  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
    <span className="sr-only">Search</span>
    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
  </a>
</div> */}


                {/* Cart */}
               
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
