import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { PropagateLoader } from 'react-spinners';;

function Logins() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const [formAction, setFormAction] = useState('/api/v1/users/login');
  const [formMethod, setFormMethod] = useState('POST');
  const [formEncType, setFormEncType] = useState('');
  const [headere, setHeadere] = useState({ 'Content-Type': 'application/json' });

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setFormAction('/api/v1/users/login');
    setFormMethod('POST');
    setFormEncType('application/json');
    setHeadere({ 'Content-Type': 'application/json' });
    setShowAdditionalFields(false);
  };

  const handleRegisterClick = () => {
  
    setFormAction('/api/v1/users/register');
    setFormMethod('POST');
    setFormEncType('multipart/form-data');
    setHeadere({});
    setShowAdditionalFields(true);
  };

  const loginUser = async (loginData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      console.log("Login API Hitted");
      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
        if (data.isAdmin === true) {
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('isloggedin', 'true');
          setIsLoggedin(true);
          setIsAdmin(true);
        } else {
          localStorage.setItem('isAdmin', 'false');
          localStorage.setItem('isloggedin', 'true');
          setIsLoggedin(true);
          setIsAdmin(false);
        }
      } else {
        console.error('Login failed:', data.error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.error.message || 'An error occurred while logging in. Please try again.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const registerUser = async (formData) => {
    try {
      setIsLoading(true); // Set loading to true when the request starts
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        body: formData,
      });
      console.log("Register API Hitted");

      if (response.ok) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/login'); // Redirect to login after successful registration
      } else {
        // Parse the response body as JSON
        const data = await response.json();
        console.error('Registration failed:', data.error);

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.message || 'An error occurred while registering. Please try again.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred while registering. Please try again.',
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formAction === '/api/v1/users/login') {
      const loginData = Object.fromEntries(formData.entries());
      await loginUser(loginData);
    } else if (formAction === '/api/v1/users/register') {
      await registerUser(formData);
    }
  };

  return (
    <div>
      <section>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center">
              <img
                src="https://i.postimg.cc/vm5jPGLp/bg-removed.png"
                alt="Smart shoes logo picture"
                style={{
                  display: "block",
                  margin: "0 auto",
                  height: "15rem",
                  width: "15rem",
                }}
              />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              {showAdditionalFields ? "Sign in to your account" : "Login to your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {showAdditionalFields ? (
                <>
                  Already have an account?{" "}
                  <a
                    onClick={handleLoginClick}
                    href="#"
                    title=""
                    className="font-semibold text-black transition-all duration-200 hover:underline"
                  >
                    Login to your account
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <a
                    onClick={handleRegisterClick}
                    href="#"
                    title=""
                    className="font-semibold text-black transition-all duration-200 hover:underline"
                    style={{ color: 'rgb(79, 70, 229)' }}
                  >
                    Create a free account
                  </a>
                </>
              )}
            </p>

            <form
              action={formAction}
              method={formMethod}
              encType={formEncType}
              className="mt-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      name="email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      Password
                    </label>
                    <a
                      href="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                      style={{ color: 'rgb(79, 70, 229)' }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                    />
                  </div>
                </div>

                {showAdditionalFields && (
                  <>
                    <div>
                      <label htmlFor="" className="text-base font-medium text-gray-900">
                        User Name
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          name="username"
                          placeholder="User name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="" className="text-base font-medium text-gray-900">
                        Profile Picture
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="file"
                          name="avatar"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

<div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            style={{ backgroundColor: 'rgb(79, 70, 229)' }}
            onClick={showAdditionalFields ? handleRegisterClick : handleLoginClick}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="mr-2">Loading...</span>
                <PropagateLoader color="white" size={8} /> {/* Loader inside button text */}
              </span>
            ) : (
              <>
                {showAdditionalFields ? 'Register' : 'Login'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Logins;
