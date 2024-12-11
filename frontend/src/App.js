import './App.css';
import React, { useState } from 'react'; // Import useState
import Login from './login_page/login.js';
import Admin from './admin_page/admin.js';
import Chatbot from './chatbot_page/chatbot.js';
import VirtualTour from './virtual_tour/virtual_tour.js';
import Landing from './landing_page/landing.js';
import CSPrereq from './courses_page/cs/cs_prereq.js';
import EMCPrereq from './courses_page/emc/emc_prereq.js';
import ITPrereq from './courses_page/it/it_prereq.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

function App() {
  // Define state to manage authentication
  // eslint-disable-next-line
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  // eslint-disable-next-line
  const handleLogout = () => {
    setIsAuthenticated(false); // Reset authentication state
  };
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} />} // Pass setIsAuthenticated
        />
        <Route 
          path="/admin" 
          element={<Admin handleLogout={handleLogout} />} // Pass handleLogout
        />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/virtual-tour" element={<VirtualTour />} />
        <Route path="/cs-courses" element={<CSPrereq />} />
        <Route path="/emc-courses" element={<EMCPrereq />} />
        <Route path="/it-courses" element={<ITPrereq />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
