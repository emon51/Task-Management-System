import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import './TaskList.css';

function TaskList() {
  const { isDarkMode } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Show loader while fetching
  if (loading) {
    return <Loader />;
  }

  // Show error if fetch failed
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className={`task-list-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Task List</h1>
      <div className="tasks-grid">
        {tasks.map(task => (
          <Link to={`/tasks/${task.id}`} key={task.id} className="task-card">
            <div className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
              {task.completed ? '✓ Done' : '○ Pending'}
            </div>
            <h3>{task.title}</h3>
            <p className="task-id">Task #{task.id}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TaskList;