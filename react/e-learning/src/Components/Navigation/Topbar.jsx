import React from 'react';
import Swal from 'sweetalert2';
import './Dashboard.css';

const Topbar = () => {
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = async () => {
  try {
    await fetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      credentials: 'include', // IMPORTANT: ensures the session cookie is sent
    });

    // Clear local storage if needed
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    Swal.fire({
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      icon: 'success',
    }).then(() => {
      window.location.href = '/login'; // Redirect if you want
    });

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Logout failed. ${error}`,
      icon: 'error',
    });
  }
};

  return (
    <div className="topbar">
      <span className="topbar-title">Dashboard</span>
      <div className="topbar-user">
        👤 {username}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
