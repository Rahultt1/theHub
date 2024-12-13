import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import NavigationBar from "./components/NavigationBar";
import PreferedTopic from "./pages/PreferedTopic";
import Home from "./pages/Home";
import ProfilePicturePage from "./pages/ProfilePicturePage";
import Dashboard from "./pages/Dashboard";
import DiscussionBoard from "./pages/DiscussionBoard";
import DiscussionDetails from "./components/DiscussionDetails";

import "./App.css";
import "./index.css";

function App() {
  const [count, setCount] = useState(0); // Currently unused

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <NavigationBar />
      
      {/* Router Setup */}
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Onboarding and Profile */}
          <Route path="/preferedTopic" element={<PreferedTopic />} />
          <Route path="/addprofile" element={<ProfilePicturePage />} />

          {/* Core App */}
          <Route path="/" element={<Home />} />
          
          <Route path="/discussion" element={<DiscussionBoard />} />
          <Route path="/discussion/:id" element={<DiscussionDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;