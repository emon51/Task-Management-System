import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Home.css';

function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`home-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Welcome to Task Manager</h1>
      <p className="home-description">
        A simple and efficient task management application built with React.
      </p>
      <div className="home-features">
        <h2>Features:</h2>
        <ul>
          <li>📋 View all your tasks</li>
          <li>🔍 Search and filter tasks</li>
          <li>✅ Track completed tasks</li>
          <li>🌓 Light/Dark mode support</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;