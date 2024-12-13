import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests

const AddQuestionPopup = ({ onClose, fetchDiscussions }) => {
  const [topics, setTopics] = useState([]); // State to store topics fetched from the backend
  const [topicId, setTopicId] = useState(""); // State to store the selected topic ID
  const [subtopic, setSubtopic] = useState(""); // State for subtopic
  const [question, setQuestion] = useState(""); // State for the question
  const [link, setLink] = useState(""); // State for any optional link
  const [uploads, setUploads] = useState([]); // State for file uploads
  const [isVisible, setIsVisible] = useState(false); // State for popup visibility (animations)

  // Play animation on mount
  useEffect(() => {
    setIsVisible(true);
    fetchTopics(); // Fetch topics when the component mounts
  }, []);

  // Function to fetch topics from the backend
  const fetchTopics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/topics"); // Endpoint for fetching topics
      setTopics(response.data.data); // Assuming the response contains topics in `data.data`
    } catch (error) {
      console.error("Error fetching topics:", error.message);
      alert("Failed to load topics. Please try again.");
    }
  };

  // Handles file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadedFiles = files.map((file) => ({
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "file",
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));
    setUploads((prevUploads) => [...prevUploads, ...uploadedFiles]);
  };

  // Remove file
  const removeFile = (indexToRemove) => {
    setUploads((prevUploads) => prevUploads.filter((_, index) => index !== indexToRemove));
  };

  // Handle form submission to add a discussion
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!topicId || !question) {
      alert("Please select a topic and add a question before submitting.");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    // Use FormData for file uploads
    const formData = new FormData();
    formData.append("topicId", topicId);
    formData.append("subtopic", subtopic);
    formData.append("question", question);
    formData.append("link", link);
  
    // Append files to the FormData
    uploads.forEach((file, i) => formData.append(`uploads[${i}]`, file));
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/discussions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Discussion added successfully:", response.data);
  
      // Refresh discussions and close popup
      fetchDiscussions();
      setIsVisible(false);
      setTimeout(() => onClose(), 500);
    } catch (error) {
      console.error("Error Response Details:", error.response?.data || error.message);
      alert("Failed to add discussion: " + (error.response?.data?.message || "Unknown error."));
    }
  };

  // Close the popup
  const handleClose = () => {
    setIsVisible(false); // Trigger slide-out animation
    setTimeout(() => onClose(), 500); // Delay to allow animation
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-center">
      <div
        className="bg-black bg-opacity-50 fixed inset-0"
        onClick={handleClose}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      ></div>

      <div
        className={`bg-white rounded-l-lg shadow-xl w-full sm:w-2/3 lg:w-1/2 h-full overflow-auto transform transition-transform duration-500 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-green-500 text-white p-4 rounded-t-lg">
          <h2 className="text-2xl font-bold text-center">Ask a Question</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Topic Dropdown */}
          <div>
            <label htmlFor="topic" className="block text-sm font-bold text-gray-700 mb-2">
              Select Topic
            </label>
            <select
              id="topic"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              <option value="" disabled>
                Select a topic
              </option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
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
          </div>

          {/* File Uploads */}
          <div>
            <label htmlFor="uploads" className="block text-sm font-bold text-gray-700 mb-2">
              Upload Files or Images
            </label>
            <div className="flex items-center">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
                Choose Files
                <input type="file" id="uploads" multiple onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

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