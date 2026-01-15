import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <div className="error-box">
        <h3>⚠️ Error</h3>
        <p>{message || 'Something went wrong. Please try again.'}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;