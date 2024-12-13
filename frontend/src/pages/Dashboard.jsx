import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import MySidebar from "../components/MySidebar"; // Assuming MySidebar.js is in the same directory

const GalleryWithSearch = () => {
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search query
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // State to manage login prompt
  const [animateModal, setAnimateModal] = useState(false); // State to control modal animation
  const navigate = useNavigate(); // For routing to Content component

  const imagesGroup1 = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
  ];

  const imagesGroup2 = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
  ];

  const imagesGroup3 = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
  ];

  const imagesGroup4 = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
  ];

  const topics = [
    "Technology",
    "Science",
    "Health",
    "Travel",
    "Sports",
    "Food",
    "Art",
    "Music",
    "Politics",
    "Finance",
    "Education",
    "Entertainment",
    "Nature",
    "Space",
    "History",
  ];

  const posts = [123, 456, 789, 101, 112, 435, 876, 234, 390, 455, 600, 720, 400, 550, 180];

  const cardSizes = [
    { width: "w-180", height: "h-[240px]" },
    { width: "w-180", height: "h-[180px]" },
    { width: "w-180", height: "h-[240px]" },
    { width: "w-180", height: "h-[180px]" },
    { width: "w-180", height: "h-[180px]" },
    { width: "w-180", height: "h-[240px]" },
  ];

  const assignTopicsToGroups = (imagesGroup, groupIndex) => {
    const topicsForGroup = topics.slice(
      groupIndex * imagesGroup.length,
      groupIndex * imagesGroup.length + imagesGroup.length
    );
    return imagesGroup.map((src, index) => {
      const topic = topicsForGroup[index % topicsForGroup.length] || topics[index % topics.length];
      const cardSize = cardSizes[(groupIndex * imagesGroup.length + index) % cardSizes.length];
      return {
        src,
        topic,
        posts: posts[index % posts.length],
        width: cardSize.width,
        height: cardSize.height,
      };
    });
  };

  const groupsWithTopics = [
    assignTopicsToGroups(imagesGroup1, 0),
    assignTopicsToGroups(imagesGroup2, 1),
    assignTopicsToGroups(imagesGroup3, 2),
    assignTopicsToGroups(imagesGroup4, 3),
  ];

  const filterCards = (cards) =>
    cards.map((card, index) => {
      if (card.topic.toLowerCase().includes(searchTerm.toLowerCase())) {
        return (
          <Card
            key={index}
            backgroundImage={card.src}
            topic={card.topic}
            posts={card.posts}
            width={card.width}
            height={card.height}
          />
        );
      }
      return null;
    });

  const handleDiscoverClick = (topic) => {
    const authToken = localStorage.getItem("authToken"); // Retrieve token
    if (authToken) {
      // If logged in, navigate to the relevant page
      navigate(`/discussion`, { state: { selectedTopic: topic } });
    } else {
      // If not logged in, show a login prompt
      setShowLoginPrompt(true);
      setTimeout(() => {
        setAnimateModal(true); // Start animation after a slight delay
      }, 10);
    }
  };

  const handleCloseModal = () => {
    setAnimateModal(false); // Reverse the animation first
    setTimeout(() => {
      setShowLoginPrompt(false); // Hide the modal entirely after animation ends
    }, 300); // Match the duration of the animation (300ms)
  };

  const Card = ({ backgroundImage, topic, posts, width, height }) => (
    <div
      className={`relative ${width} ${height} bg-cover bg-center rounded-lg overflow-hidden shadow-lg transition-transform duration-200`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
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

  return (
    <div className="flex">
      <MySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-center mb-2 mt-4 text-green-600">Pick Your Topic</h1>
        <div className="flex items-center justify-center mb-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            placeholder="   Search discussions..."
            className="bg-gray-100 p-2 rounded-full mt-8 w-2/6 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 transform focus:scale-110"
          />
        </div>
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-5">
            {groupsWithTopics.map((group, groupIndex) => (
              <div key={groupIndex} className="grid gap-y-2">
                {filterCards(group)}
                {showMore &&
                  group.map((card, index) => (
                    <Card
                      key={`more-${groupIndex}-${index}`}
                      backgroundImage={card.src}
                      topic={card.topic}
                      posts={card.posts}
                      width={card.width}
                      height={card.height}
                    />
                  ))}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowMore(!showMore)}
              className="bg-green-500 text-white p-2 rounded-lg transition-all duration-300 hover:bg-green-600"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div
              className={`bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative transform transition-all duration-300 ease-in-out ${
                animateModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
                <p className="text-gray-600 mb-6">
                  Please log in to continue exploring the discussions and topics!
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      handleCloseModal();
                      navigate("/login");
                    }}
                    className="px-6 py-2 bg-green-600 text-white font-medium text-sm rounded-md shadow-md hover:bg-green-600 transition"
                  >
                    Login Now
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-medium text-sm rounded-md shadow-md hover:bg-gray-300 transition"
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