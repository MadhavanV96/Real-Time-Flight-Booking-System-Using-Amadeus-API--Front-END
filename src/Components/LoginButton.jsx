import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginButton = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate=useNavigate();
  const location = useLocation();


  // Function to check login status
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/check-login", {
        withCredentials: true, // Include cookies in the request
      });
      if (response.data.loggedIn) {
        setIsLoggedIn(true);
        setUserName(response.data.user.name);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking login status:", error.message);
      setIsLoggedIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3001/api/v1/signout', { withCredentials: true })
      setIsLoggedIn(false);
      setUserName("");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // Navigate to login page
  const handleLoginRedirect = () => {
    navigate('/login', { state: { from: location.pathname } }); // Replace with your login route
  };

  // Check login status on component mount
  useEffect(() => {
    checkLoginStatus();
  }, [navigate]);

  return (
    <div>
      {isLoggedIn ? (
        <div className='flex justify-between'>
          <h2 className='px-2'>Welcome, {userName}!</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLoginRedirect}>Log In</button>
        </div>
      )}
    </div>
  );
}

export default LoginButton