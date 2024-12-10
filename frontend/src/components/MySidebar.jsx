import React, { useState } from "react";

const MySidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTopicsDropdownOpen, setIsTopicsDropdownOpen] = useState(false);

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

  return (
    <div className="flex max-h-screen antialiased text-black bg-gray-100 dark:bg-dark dark:text-light">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-30 flex w-80 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
        style={{ zIndex: 50 }} // Ensure the sidebar appears above modal background
      >
        {/* Curvy shape */}
        <svg
          className="absolute inset-0 w-full h-full text-white"
          style={{ filter: "drop-shadow(20px 0 10px #00000040)" }}
          preserveAspectRatio="none"
          viewBox="0 0 380 380"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
        </svg>

        {/* Sidebar content */}
        <div className="z-10 flex flex-col flex-1 mt-20">
          {/* Logo & Close button */}
          <div className="flex items-center justify-between flex-shrink-0 w-64 p-4">
            <span className="font-bold text-xl">My Sidebar</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-lg focus:outline-none focus:ring"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close sidebar</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col flex-1 w-64 p-4 -mt-2 space-y-4">
            <a href="#" className="flex items-center space-x-2">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Home</span>
            </a>

            {/* Topics Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsTopicsDropdownOpen(!isTopicsDropdownOpen)}
                className="flex items-center justify-between w-full text-left focus:outline-none"
              >
                <span className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5h14M5 10h14M5 15h14M5 20h14"
                    />
                  </svg>
                  <span>Topics</span>
                </span>
                <svg
                  className={`${
                    isTopicsDropdownOpen ? "rotate-180" : "rotate-0"
                  } transform transition-transform w-4 h-6`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isTopicsDropdownOpen && (
                <ul className="absolute z-50 w-full mt-2 bg-white rounded shadow-lg">
                  {topics.map((topic, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Add other nav items here */}
          </nav>
        </div>
      </div>

      {/* Open button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed z-40 p-2 text-black bg-white rounded-lg top-24 left-5"
        style={{ zIndex: 40 }}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span className="sr-only">Open sidebar</span>
      </button>
    </div>
  );
};

export default MySidebar;