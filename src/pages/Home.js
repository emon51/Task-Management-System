import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Home.css';
import taskImage from '../assets/taskmanager-logo.jpg';

function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`home-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Welcome to your task world. Manage your tasks with ease.</h1>
      <p className="home-description">
        A simple and efficient task management application built with React.
      </p>
      <div className="home-image-container">
        <img 
          src={taskImage} 
          alt="Task Management" 
          className="home-image"
        />
      </div>
    </div>
  );
}

export default Home;