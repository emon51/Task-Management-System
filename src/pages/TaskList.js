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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 20;

  // Fetch tasks from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=200')
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

  // Toggle task completion status
  const toggleTaskStatus = (taskId, e) => {
    e.preventDefault(); // Prevent navigation to task details
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Task Count */}
      <p className="task-count">
        Showing {currentTasks.length} of {filteredTasks.length} tasks
      </p>

      {/* Tasks Grid */}
      {currentTasks.length === 0 ? (
        <p className="no-tasks">No tasks found matching your search.</p>
      ) : (
        <div className="tasks-grid">
          {currentTasks.map(task => (
            <Link to={`/tasks/${task.id}`} key={task.id} className="task-card">
              <div 
                className={`task-status ${task.completed ? 'completed' : 'pending'}`}
                onClick={(e) => toggleTaskStatus(task.id, e)}
              >
                {task.completed ? '✓ Done' : '○ Pending'}
              </div>
              <h3>{task.title}</h3>
              <p className="task-id">Task #{task.id}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskList;