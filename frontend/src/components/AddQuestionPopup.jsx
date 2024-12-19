import React, { useState, useEffect } from "react";

const AddQuestionPopup = ({ onClose, onSubmit }) => {
  const topics = [  
     
    "Technology", "AI", "Healthcare", "Education", "Environment",
    "Sports", "Finance", "Automotive", "Gaming", "Lifestyle",
    "Travel", "Science", "Food", "History", "Art",
  ]; // 15 predefined topics

  const [topic, setTopic] = useState("");         // State for topic
  const [subtopic, setSubtopic] = useState("");   // State for subtopic
  const [question, setQuestion] = useState("");   // State for question
  const [link, setLink] = useState("");           // State for added link
  const [uploads, setUploads] = useState([]);     // State to store uploaded files/images
  const [isVisible, setIsVisible] = useState(false); // State to control animation visibility

  // Play animation on mount
  useEffect(() => {
    setIsVisible(true); // Start the slide-in effect
  }, []);

  // Handles input file/image upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadedFiles = files.map((file) => ({
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "file",
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));
    setUploads((prevUploads) => [...prevUploads, ...uploadedFiles]);
  };

  // Handle file removal
  const removeFile = (indexToRemove) => {
    setUploads((prevUploads) => prevUploads.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      topic,
      subtopic,
      question,
      link,
      uploads,
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
        <div className="bg-green-500 text-white p-4 rounded-t-lg">
          <h2 className="text-2xl font-bold text-center">Ask a Question</h2>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Topic Dropdown */}
          <div>
            <label htmlFor="topic" className="block text-sm font-bold text-gray-700 mb-2">
              Select Topic
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              <option value="" disabled>Select a topic</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {/* Subtopic Input */}
          <div>
            <label htmlFor="subtopic" className="block text-sm font-bold text-gray-700 mb-2">
              Subtopic
            </label>
            <input
              type="text"
              id="subtopic"
              value={subtopic}
              onChange={(e) => setSubtopic(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter a subtopic"
              required
            />
          </div>

          {/* Question Input */}
          <div>
            <label htmlFor="question" className="block text-sm font-bold text-gray-700 mb-2">
              Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Ask your question..."
              rows="4"
              required
            ></textarea>
          </div>

          {/* Link Input */}
          <div>
            <label htmlFor="link" className="block text-sm font-bold text-gray-700 mb-2">
              Add a Link (Optional)
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="https://example.com"
            />
            {link && <span className="text-green-600 mt-1 block">Link will be highlighted after submission.</span>}
          </div>

          
          {/* File Uploads */}
<div>
  <label htmlFor="uploads" className="block text-sm font-bold text-gray-700 mb-2">
    Upload Files or Images
  </label>
  <div className="flex items-center">
    {/* Custom file upload button */}
    <label
      htmlFor="uploads"
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 16l6-6m0 0l6 6m-6-6v12m10-8h-4m4 0h-4m0 0H9m0 0H5"
        />
      </svg>
      <span>Choose Files</span>
    </label>
    
    {/* Hidden file input */}
    <input
      type="file"
      id="uploads"
      multiple
      onChange={handleFileUpload}
      className="hidden"
    />
  </div>

  {uploads.length > 0 && (
    <div className="mt-4 space-y-2">
      {uploads.map((upload, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-gray-100 p-2 rounded-md"
        >
          {/* Preview for images or file name */}
          {upload.type === "image" ? (
            <img
              src={upload.preview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded border"
            />
          ) : (
            <span className="text-gray-600">{upload.name}</span>
          )}
          {/* Remove button */}
          <button
            type="button"
            onClick={() => removeFile(index)}
            className="text-red-600 font-bold text-sm px-2 py-1 rounded hover:bg-red-200 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
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
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
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

export default AddQuestionPopup;