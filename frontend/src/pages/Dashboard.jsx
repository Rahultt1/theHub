import React, { useState } from "react";
import MySidebar from "../components/MySidebar"; // Assuming MySidebar.js is in the same directory

const GalleryWithSearch = () => {
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search query

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

  const moreImagesGroup1 = ["https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"];
  const moreImagesGroup2 = ["https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"];
  const moreImagesGroup3 = ["https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"];
  const moreImagesGroup4 = ["https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"];

  // Topics for cards
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

  const posts = [123, 456, 789, 101, 112, 435, 876, 234, 390, 455, 600, 720, 400, 550, 180]; // Posts for new topics

  const cardSizes = [
    { width: "w-180", height: "h-[240px]" }, // 180x240
    { width: "w-180", height: "h-[180px]" }, // 180x180
    { width: "w-180", height: "h-[240px]" }, // 180x240
    { width: "w-180", height: "h-[180px]" }, // 180x180
    { width: "w-180", height: "h-[180px]" }, // 180x180
    { width: "w-180", height: "h-[240px]" }, // 180x240
    { width: "w-180", height: "h-[180px]" }, // 180x180
    { width: "w-180", height: "h-[240px]" }, // 180x240
  ];

  const assignTopicsToGroups = (imagesGroup, groupIndex) => {
    // Rotate topics and ensure they don't repeat unnecessarily
    const topicsForGroup = topics.slice(groupIndex * imagesGroup.length, groupIndex * imagesGroup.length + imagesGroup.length);

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

  const Card = ({ backgroundImage, topic, posts, width, height }) => (
    <div
      className={`relative ${width} ${height} bg-cover bg-center rounded-lg overflow-hidden shadow-lg transition-transform duration-200`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end items-start text-white p-4">
        <h3 className="text-xl font-bold mb-1">{topic}</h3>
        <p className="text-sm">{posts} Posts</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:bg-black/90 hover:opacity-100 transition-opacity duration-300">
        <span className="text-green-400 text-lg font-semibold">Discover</span>
      </div>
    </div>
  );

  return (
    <div className="flex">
      <MySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-center mb-2 mt-4 text-green-600">
          Pick Your Topic
        </h1>
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
                {showMore && (
                  group.map((card, index) => (
                    <Card
                      key={`more-${groupIndex}-${index}`}
                      backgroundImage={card.src}
                      topic={card.topic}
                      posts={card.posts}
                      width={card.width}
                      height={card.height}
                    />
                  ))
                )}
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
      </div>
    </div>
  );
};

export default GalleryWithSearch;