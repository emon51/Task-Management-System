import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Loader.css';

function Loader() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`loader-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;