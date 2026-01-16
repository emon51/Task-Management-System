import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`error-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="error-box">
        <h3>⚠️ Error</h3>
        <p>{message || 'Something went wrong. Please try again.'}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;