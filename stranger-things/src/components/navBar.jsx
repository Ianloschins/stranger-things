import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  // Function to log out
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect the user to the home page
    navigate('/login');
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/user">User</Link>
      <Link to="/message">Message's</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default NavBar;
