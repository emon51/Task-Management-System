import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import './TaskDetails.css';

function TaskDetails() {
  const { isDarkMode } = useTheme();
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single task from API
  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Task Not Found');
        }
        return response.json();
      })
      .then(data => {
        setTask(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Toggle task completion status
  const toggleTaskStatus = () => {
    setTask(prevTask => ({
      ...prevTask,
      completed: !prevTask.completed
    }));
  };

  // Show loader while fetching
  if (loading) {
    return <Loader />;
  }

  // Show error if fetch failed
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className={`task-details-container ${isDarkMode ? 'dark' : 'light'}`}>
      <Link to="/tasks" className="back-button">← Back to Tasks</Link>
      
      <div className="task-details-card">
        <div className="task-header">
          <h1>Task Details</h1>
          <span 
            className={`task-badge ${task.completed ? 'completed' : 'pending'}`}
            onClick={toggleTaskStatus}
          >
            {task.completed ? '✓ Completed' : '○ Pending'}
          </span>
        </div>

        <div className="task-info">
          <div className="info-row">
            <span className="info-label">Task ID:</span>
            <span className="info-value">#{task.id}</span>
          </div>

          <div className="info-row">
            <span className="info-label">User ID:</span>
            <span className="info-value">#{task.userId}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Title:</span>
            <span className="info-value">{task.title}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Status:</span>
            <span className="info-value">
              {task.completed ? 'Task is completed ✓' : 'Task is pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;