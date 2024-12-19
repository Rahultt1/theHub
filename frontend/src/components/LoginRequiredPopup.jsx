import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginRequiredPopup = ({ onClose }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
    onClose(); // Close the popup
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} // Slower fade-in animation
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg h-96" // Increased height
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }} // Fade-in effect
      >
        <h2 className="text-lg font-bold mb-4 text-green-500">Login Required</h2>
        <p className="mb-4 text-black">You need to be logged in to access this discussion.</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Close
          </button>
          <button
            onClick={handleLoginClick} // Add login button functionality
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginRequiredPopup;
