import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = "Welcome to SMIT Automatic Certificate Generation and Distribution Portal";

  useEffect(() => {
    const interval = setInterval(() => {
      // Display full heading first
      if (currentIndex < text.length) {
        setTypedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        // After a delay, make it static
        setTimeout(() => {
          // No replacement sentences needed
        }, 100);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, text]);

  return (
    <div className="container mx-auto p-6" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <div className="text-4xl font-bold mb-8 mt-16" style={{ color: 'black' }}>
        {typedText &&
          <>
            {typedText.includes("SMIT") ? (
              <>
                {typedText.split("SMIT")[0]}
                <span style={{ color: 'rgb(140, 193, 63)' }}>SMIT</span>
                {typedText.split("SMIT").slice(1).join("SMIT")}
              </>
            ) : (
              typedText
            )}
          </>
        }
      </div>
      <div className="flex flex-wrap md:flex-nowrap bg-white shadow-lg rounded-lg mb-10">
        <div className="w-full md:w-1/2 p-6">
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
            Engaging with the digital world has never been easier with our automated certificate generation and distribution system. At Saylani Welfare, we understand that manpower and time are extremely valuable resources. Our platform allows students to obtain their certificates with just one click, ensuring efficiency and convenience for both the organization and its students.
          </p>
          <div className="flex justify-start space-x-4">
          <Link to="/generate-certificate" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Generate Certificate
            </Link>
            <Link to="/verify-certificate" >
            <button className="bg-white text-green-500 py-2 px-4 border border-green-500 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Verify Certificate
            </button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <motion.img
            src="https://imgs.search.brave.com/CrzmWUaqb2-mw6LpOVQ4TVnJbf2OvvLFytscEGb-DO0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzQ4LzI4LzY2/LzM2MF9GXzI0ODI4/NjY1OF9hTEplNzdj/WjRTeDVKY1U5Wmtu/MUlFUWw5dzBKMXhJ/Ui5qcGc"
            alt="Sample Certificate"
            className="max-w-full h-auto border-4 border-green-500"
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
