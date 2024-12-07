import React, { useState, useEffect, useRef } from "react";
import "../../src/index.css";

const NavigationBar = () => {
  const [isSearchBoxOpen, setSearchBoxOpen] = useState(false);
  const searchBoxRef = useRef(null);

  const toggleSearchBox = () => {
    setSearchBoxOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setSearchBoxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="header top-0 sticky bg-white shadow-md flex items-center justify-between  mx-auto px-16 left-0 w-full b z-10">
        <div className="w-3/12">
          <h1 className="text-3xl font-bold text-green-500">
            <a href="/">Logo</a>
          </h1>
        </div>

        <nav className="nav font-semibold text-lg">
          <ul className="flex items-center">
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <a href="/">Home</a>
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <a href="/">Topic</a>
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <a href="/">Collections</a>
            </li>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <a href="/">Contact</a>
            </li>
          </ul>
        </nav>

        <div
          className="w-3/12 flex justify-end items-center relative"
          ref={searchBoxRef}
        >
          {/* Search input */}
          {isSearchBoxOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="ml-12 p-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500 w-48 transition-all duration-500 transform"
              style={{
                transform: isSearchBoxOpen ? "translateX(150px)" : "scale(0)",
                opacity: isSearchBoxOpen ? 1 : 0,
              }}
            />
          )}

          {/* Search button */}
          <button
            onClick={toggleSearchBox}
            className="mr-36 focus:outline-none transition-transform duration-500 transform"
            style={{
              transform: isSearchBoxOpen ? "translateX(100px)" : "translateX(0)",
            }}
          >
            <svg
              className="h-8 p-1 hover:text-green-500 duration-200"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-4">
  {/* Profile Picture */}
  <img 
    src="https://randomuser.me/api/portraits/men/1.jpg" 
    alt="Profile" 
    className="w-10 h-10 rounded-full object-cover"
  />

  {/* Notification Icon */}
  <svg 
    className="h-6 w-6 text-gray-700 hover:text-green-500" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M15 17h5l-1.405-1.405A2.981 2.981 0 0019 13V8a7 7 0 10-14 0v5a2.981 2.981 0 00-.595 2.595L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
</div>

        <div>
        
            <a className="text-sm font-semibold text-black" href="/">Sign Out</a>
        </div>
       
      </header>
    </>
  );
};

export default NavigationBar;
