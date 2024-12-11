import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login"; // Ensure Login component is correctly imported
import Register from "./pages/Register";
import Footer from "./components/Footer";
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavigationBar from "./components/NavigationBar";
import PreferedTopic from "./pages/PreferedTopic";
import Home from "./pages/Home";
import ProfilePicturePage from "./pages/ProfilePicturePage";

import Dashboard from "./pages/Dashboard";
import DiscussionBoard from "./pages/DiscussionBoard";
import DiscussionDetails from "./components/DiscussionDetails";


import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <NavigationBar />
      <Router>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preferedTopic" element={<PreferedTopic />} />
          <Route path="/" element={<Home />} />
          <Route path="/addprofile" element={<ProfilePicturePage />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/discussion" element={<DiscussionBoard />} />
          <Route path="/discussion/:id" element={<DiscussionDetails />} />
          
          
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
