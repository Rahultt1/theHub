import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MySidebar from "../components/MySidebar";

const GalleryWithSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const images = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
  ];

  // Card sizes (alternating height based on row and column index)
  const rowPatterns = [
    [
      { width: "w-180", height: "h-[220px]" }, // Row 1 pattern
      { width: "w-180", height: "h-[220px]" },
      { width: "w-180", height: "h-[220px]" },
      { width: "w-180", height: "h-[220px]" },
    ],
    [
      { width: "w-180", height: "h-[220px]" }, // Row 2 pattern
      { width: "w-180", height: "h-[220px]" },
      { width: "w-180", height: "h-[200px]" },
      { width: "w-180", height: "h-[220px]" },
    ],
  ];

  const posts = [123, 456, 789, 101, 112, 435, 876, 234, 390, 455, 600, 720];

  // Fetch topics from backend
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/topics");
        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await response.json();
        setTopics(data.data); // Assuming backend sends { data: [...] }
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // Generate cards row-wise with alternating layouts
  const generateCards = () => {
    const displayedTopics = showMore ? topics : topics.slice(0, 8); // Restrict to 8 topics unless "Show More" is clicked

    return displayedTopics.map((topic, index) => {
      const rowIndex = Math.floor(index / 4) % 2; // Determine row pattern (alternates between 0 and 1)
      const colIndex = index % 4; // Column within the current row
      const cardSize = rowPatterns[rowIndex][colIndex]; // Get size based on row and column
      const image = images[index % images.length]; // Cycle through images

      // Add extra top shift for 2nd and 4th cards
      const extraStyle =
        colIndex === 1 || colIndex === 3 // Check for 2nd and 4th cards
          ? { top: "-40px" } // Move upwards by 40px
          : {};

      return (
        <Card
          key={topic.id || index} // Use topic id or fallback to index
          backgroundImage={image}
          topic={topic.name}
          posts={topic.posts || posts[index % posts.length]}
          width={cardSize.width}
          height={cardSize.height}
          extraStyle={extraStyle} // Pass extra style dynamically
        />
      );
    });
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleDiscoverClick = (topic) => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate(`/discussion`, { state: { selectedTopic: topic } });
    } else {
      setShowLoginPrompt(true);
      setTimeout(() => setAnimateModal(true), 10);
    }
  };

  const handleCloseModal = () => {
    setAnimateModal(false);
    setTimeout(() => setShowLoginPrompt(false), 300);
  };

  const Card = ({ backgroundImage, topic, posts, width, height, extraStyle }) => (
    <div
      className={`relative ${width} ${height} bg-cover bg-center rounded-lg overflow-hidden shadow-lg transition-transform duration-200`}
      style={{ backgroundImage: `url(${backgroundImage})`, ...extraStyle }} // Apply additional styles
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end items-start text-white p-4">
        <h3 className="text-xl font-bold mb-1">{topic}</h3>
        <p className="text-sm">{posts} Posts</p>
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 hover:bg-black/90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        onClick={() => handleDiscoverClick(topic)}
      >
        <span className="text-green-400 text-lg font-semibold">Discover</span>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center text-green-600 font-semibold text-xl mt-10">
        Loading topics...
      </div>
    );
  }

  return (
    <div className="flex">
      <MySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-center mb-2 mt-4 text-green-600">
          Pick Your Topic
        </h1>
        <div className="flex items-center justify-center -mt-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="   Search discussions..."
            className="bg-gray-100 p-2 rounded-full mt-8 w-2/6 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 transform focus:scale-110"
          />
        </div>
        <div className="max-w-4xl mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-5">
            {generateCards()}
          </div>
          {topics.length > 8 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="bg-green-500 text-white p-2 rounded-lg transition-all duration-300 hover:bg-green-600"
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
        {showLoginPrompt && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div
              className={`bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative transform transition-all duration-300 ease-in-out ${
                animateModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Login Required
                </h2>
                <p className="text-gray-600 mb-6">
                  Please log in to continue exploring discussions!
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      handleCloseModal();
                      navigate("/login");
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-600"
                  >
                    Login Now
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryWithSearch;