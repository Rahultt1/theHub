import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MySidebar from "../components/MySidebar";
import AddQuestionPopup from "../components/AddQuestionPopup";

const discussions = [
  {
    id: 1,
    question: "What are the latest trends in AI?",
    subtopic: "AI",
    author: "John Smith",
    date: "2023-10-01",
    likes: 45,
    replyCount: 12,
    lastUpdate: "2023-10-05",
    comments: [
      { id: 1, user: "Alice", text: "AI is rapidly advancing in areas like generative AI and edge computing." },
    ],
    uploads: [{ name: "AI_Trends.jpg", type: "image", preview: "https://via.placeholder.com/150" }],
  },
  {
    id: 2,
    question: "How can machine learning improve business?",
    subtopic: "AI",
    author: "Emily Johnson",
    date: "2023-09-25",
    likes: 30,
    replyCount: 8,
    lastUpdate: "2023-09-28",
    comments: [
      { id: 1, user: "Bob", text: "It can improve operations and decision-making through better data insights." },
    ],
    uploads: [],
  },
];

const Content = () => {
  const mainTopic = "Technology";
  const [filteredDiscussions, setFilteredDiscussions] = useState(discussions);
  const [searchTerm, setSearchTerm] = useState(""); // Real-time search term state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles the addition of a new discussion from the popup.
   */
  const handleQuestionSubmit = (formData) => {
    const newDiscussion = {
      id: filteredDiscussions.length + 1,
      question: formData.question,
      subtopic: formData.subtopic || "General",
      author: "You",
      date: new Date().toLocaleDateString(),
      likes: 0,
      replyCount: 0,
      lastUpdate: new Date().toLocaleDateString(),
      comments: [],
      uploads: formData.uploads || [],
    };
    setFilteredDiscussions([newDiscussion, ...filteredDiscussions]);
  };

  /**
   * Filters discussions in real-time as the user types in the search bar.
   */
  const handleSearchInput = (searchValue) => {
    setSearchTerm(searchValue); // Update search term
    const filtered = discussions.filter(
      (discussion) =>
        discussion.question.toLowerCase().includes(searchValue.toLowerCase()) ||
        discussion.subtopic.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredDiscussions(filtered);
  };

  return (
    <div className="flex">
      <MySidebar />
      <div className="flex-1 p-5 mt-4 relative">
        {/* Main Topic Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-green-600">{mainTopic}</h2>

          {/* Search Bar */}
          <div className="flex items-center mt-3 justify-center mb-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchInput(e.target.value)} // Filter while typing
              placeholder="   Search discussions..."
              className="bg-gray-100 p-2 rounded-full mt-8 w-2/6 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 transform focus:scale-110"
            />
          </div>
        </div>

        {/* Discussions List */}
        <div className="flex justify-center">
          <div className="w-2/4 space-y-4">
            {filteredDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                onClick={() => navigate(`/discussion/${discussion.id}`, { state: discussion })}
                className="relative bg-white border-2 border-green-200 p-4 rounded shadow hover:shadow-lg transition duration-200 cursor-pointer"
              >
                {/* Card Content */}
                <p className="font-bold text-lg mb-0 text-black">{discussion.question}</p>
                <p className="text-gray-500 font-medium text-xs mb-2">
                  Subtopic: <span className="font-semibold text-green-500">{discussion.subtopic}</span>
                </p>
                <div className="mt-2 text-gray-500 text-xs flex flex-col space-y-1">
                  <div>
                    <span>
                      By: <span className="text-black font-medium">{discussion.author}</span>
                    </span>
                    <span className="ml-2">| Published: {discussion.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-500">Replies: {discussion.replyCount}</span>
                    <span className="text-gray-500">Last Update: {discussion.lastUpdate}</span>
                    <span className="text-red-500">Likes: {discussion.likes}</span>
                  </div>
                </div>

                {/* "Open Discussion" overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 hover:bg-opacity-100 text-green-600 font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Open Discussion
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Question Button */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          Add Question
        </button>

        {/* Popup for Adding Questions */}
        {isPopupOpen && <AddQuestionPopup onClose={() => setIsPopupOpen(false)} onSubmit={handleQuestionSubmit} />}
      </div>
    </div>
  );
};

export default Content;