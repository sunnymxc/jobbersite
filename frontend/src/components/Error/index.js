import React from 'react';

const Error = ({ error, isNotFound }) => {
  let title, message, details;

  if (isNotFound) {
    title = '404 - Page Not Found';
    message = "The page you're looking for doesn't exist.";
    details = null; // No details for 404
  } else {
    title = 'Oops! An Error Occurred';
    message = 'Something went wrong. Please try again later.';
    details = error && (error.message || String(error));
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{title}</h1>
      <p>{message}</p>
      {details && <p>Error details: {details}</p>}
      <a href="/">Go to Home</a>
    </div>
  );
};

export default Error;