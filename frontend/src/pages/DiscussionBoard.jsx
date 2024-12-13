import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MySidebar from "../components/MySidebar";
import AddQuestionPopup from "../components/AddQuestionPopup";

const Content = () => {
  const location = useLocation();
  const selectedTopic = location.state?.selectedTopic || "General";
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = discussions.filter((discussion) =>
        selectedTopic === "General"
            ? true
            : discussion.subtopic.toLowerCase() === selectedTopic.toLowerCase()
    );
    setFilteredDiscussions(filtered);
  }, [selectedTopic]);

  const handleAddQuestion = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add a discussion.");
      navigate("/login"); // Redirect to login if token is missing
      return;
    }
    setIsPopupOpen(true); // Open the popup if logged in
  };

  const handleSearchInput = (searchValue) => {
    setSearchTerm(searchValue);
    const filtered = discussions.filter(
        (discussion) =>
            (discussion.question.toLowerCase().includes(searchValue.toLowerCase()) ||
                discussion.subtopic.toLowerCase().includes(searchValue.toLowerCase())) &&
            (selectedTopic === "General" ||
                discussion.subtopic.toLowerCase().includes(selectedTopic.toLowerCase()))
    );
    setFilteredDiscussions(filtered);
  };

  return (
      <div className="flex">
        <MySidebar />
        <div className="flex-1 p-5 mt-4">
          <div>
            <button
                onClick={handleAddQuestion}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Question
            </button>
          </div>
          {isPopupOpen && (
              <AddQuestionPopup
                  onClose={() => setIsPopupOpen(false)}
                  fetchDiscussions={() => {
                    /* Logic to refresh discussions */
                  }}
              />
          )}
        </div>
      </div>
  );
};

export default Content;