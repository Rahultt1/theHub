import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation added to receive the state
import MySidebar from "../components/MySidebar";


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Content = () => {
  const location = useLocation();
  const selectedTopic = location.state?.selectedTopic || "General"; // Retrieve the selected topic, default to "General"
  const discussions = location.state?.discussions || []; // Get discussions from state
  // const author = location.state?.author || "Anonymous"; // Get author from state
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredDiscussions(discussions); // Set discussions to state
  }, [discussions]);

  const handleSearchInput = (searchValue) => {
    setSearchTerm(searchValue);
    const filtered = discussions.filter(
      (discussion) =>
        (discussion.text.toLowerCase().includes(searchValue.toLowerCase()) || // Updated to use discussion.text
          discussion.topic.title.toLowerCase().includes(searchValue.toLowerCase())) && // Assuming topic has a title
        (selectedTopic === "General" ||
          discussion.topic.title.toLowerCase().includes(selectedTopic.toLowerCase()))
    );
    setFilteredDiscussions(filtered);
  };

  


  return (
    <div className="flex">
      <MySidebar />
      <div className="flex-1 p-5 mt-4 relative">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-green-600">{selectedTopic}</h2>
          <div className="flex items-center mt-3 justify-center mb-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchInput(e.target.value)} // Filter dynamically
              placeholder="   Search discussions..."
              className="bg-gray-100 p-2 rounded-full mt-8 w-2/6 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 transform focus:scale-110"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-2/4 space-y-4">
            {filteredDiscussions.map((discussion) => (
              <div
                key={discussion._id} // Updated to use discussion._id
                onClick={() => navigate(`/discussion/${discussion._id}`, { state: discussion })}
                className="relative bg-white border-2 border-green-200 p-4 rounded shadow hover:shadow-lg transition duration-200 cursor-pointer"
              >
                <p className="font-bold text-lg mb-0 text-black">{discussion.text}</p> {/* Updated to use discussion.text */}
                <p className="text-gray-500 font-medium text-xs mb-0">
                </p>
                <p className="text-gray-500 font-medium text-xs mb-0">
                  Subtopic: <span className="font-semibold text-green-500">{discussion.subtopic || 'N/A'}</span> {/* Display subtopic */}
                </p>
                <div className="mt-2 text-gray-500 text-xs flex flex-col space-y-1">
                  <div>
                    <span>
                      By: <span className="text-black font-medium">{discussion.author}</span> {/* Display author */}
                    </span>
                    <span className="ml-2">| Published: {formatDate(discussion.createdAt)}</span> {/* Format the date */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-500">Replies: {discussion.comments.length}</span> {/* Assuming comments is an array */}
                    <span className="text-gray-500">Last Update: {formatDate(discussion.updatedAt)}</span> {/* Format the date */}
                    <span className="text-red-500">Likes: {discussion.likes || 0}</span> {/* Assuming likes is available */}
                  </div>
                </div>
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 hover:bg-opacity-100 text-green-600 font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Open Discussion
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        >
          Add Question
        </button>
        {isPopupOpen}
      </div>
    </div>
  );
};

export default Content;
