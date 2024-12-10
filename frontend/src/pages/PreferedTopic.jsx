import React, { useState, useEffect } from "react";
import BackgroundImage from "../images/117.svg"; // Correctly import the image

const topics = [
  { name: "Technology", image: "/images/technology.jpg" },
  { name: "Science", image: "/images/science.jpg" },
  { name: "Travel", image: "/images/travel.jpg" },
  { name: "Health", image: "/images/health.jpg" },
  { name: "Education", image: "/images/education.jpg" },
  { name: "Food", image: "/images/food.jpg" },
  { name: "Art", image: "/images/art.jpg" },
  { name: "Music", image: "/images/music.jpg" },
  { name: "Sports", image: "/images/sports.jpg" },
  { name: "History", image: "/images/history.jpg" },
  { name: "Gaming", image: "/images/gaming.jpg" },
  { name: "Nature", image: "/images/nature.jpg" },
  { name: "Photography", image: "/images/photography.jpg" },
  { name: "Business", image: "/images/business.jpg" },
  { name: "Movies", image: "/images/movies.jpg" },
  { name: "Fashion", image: "/images/fashion.jpg" },
];

const PreferedTopic = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectTopic = (topic) => {
    setSelectedTopics((prevSelected) =>
      prevSelected.includes(topic)
        ? prevSelected.filter((t) => t !== topic)
        : [...prevSelected, topic]
    );
  };

  const handleSaveChanges = () => {
    if (selectedTopics.length < 4) {
      setError("You must select at least 4 topics.");
      return;
    }

    setError("");
    console.log("Selected Topics:", selectedTopics);
  };

  return (
    <div className="relative h-screen -mt-20 flex items-center justify-center">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          filter: "blur(4px)", // Apply blur here
          zIndex: "-1", // Send the background behind content
        }}
      ></div>

      {/* Main Content */}
      <div
        className={`relative w-[520px] h-[520px] bg-transparent  bg-opacity-70 rounded-xl p-4 transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Title Section */}
        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Select At Least 4 Topics
          </h2>
          <p className="text-sm text-gray-500">
            You can select topics that interest you the most.
          </p>
        </div>

        {/* Topic Grid */}
        <div className="grid grid-cols-4 gap-2">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`relative w-[115px] h-[115px] rounded-full overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-110 cursor-pointer ${
                selectedTopics.includes(topic) ? "border-4 border-green-500" : ""
              }`}
              style={{
                backgroundImage: `url(${topic.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleSelectTopic(topic)}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xs font-semibold text-center px-1">
                  {topic.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="mt-6 block mx-auto px-8 py-2 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition duration-200"
        >
          Save
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-500 font-semibold text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreferedTopic;
