import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './NotFound.css';

function NotFound() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`notfound-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">Go Back Home</Link>
    </div>
  );
}

export default NotFound;