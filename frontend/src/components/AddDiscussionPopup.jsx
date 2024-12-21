import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AddDiscussionPopup = ({ onClose, onSubmit, topicId }) => {
  const [discussionText, setDiscussionText] = useState(""); // State for discussion text
  const [isVisible, setIsVisible] = useState(false); // State to control animation visibility

  // Play animation on mount
  useEffect(() => {
    setIsVisible(true); // Start the slide-in effect
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      topicId,
      text: discussionText,
    };

    onSubmit(formData); // Pass form data to parent component

    // Smoothly close the popup
    setIsVisible(false);
    setTimeout(() => onClose(), 500); // Delay to allow closing animation
  };

  const handleClose = () => {
    setIsVisible(false); // Trigger slide-out effect
    setTimeout(() => onClose(), 500); // Allow animation to finish before unmounting
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-center pointer-events-none">
      {/* Transparent Background */}
      <div
        className="bg-black bg-opacity-50 fixed inset-0 pointer-events-auto"
        onClick={handleClose}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      ></div>

      {/* Animated Pane with Margin-Left */}
      <div
        className={`bg-white rounded-l-lg shadow-xl w-full sm:w-2/3 lg:w-1/2 h-full overflow-auto transform transition-transform duration-500 pointer-events-auto ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ marginLeft: "70px" }} // Leave 70px space on the left
      >
        {/* Modal Form Header */}
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h2 className="text-2xl font-bold text-center">Add a Discussion</h2>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Discussion Text Input */}
          <div>
            <label htmlFor="discussionText" className="block text-sm font-bold text-gray-700 mb-2">
              Discussion Text
            </label>
            <textarea
              id="discussionText"
              value={discussionText}
              onChange={(e) => setDiscussionText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your discussion..."
              rows="4"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop validation
AddDiscussionPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  topicId: PropTypes.string.isRequired,
};

export default AddDiscussionPopup;
