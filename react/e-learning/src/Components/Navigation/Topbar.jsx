import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './Dashboard.css';

const Topbar = () => {
  const username = localStorage.getItem('username') || 'User';

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        credentials: 'include',
      });

      localStorage.removeItem('username');
      localStorage.removeItem('email');

      Swal.fire({
        title: 'Logged Out',
        text: 'You have been logged out successfully.',
        icon: 'success',
      }).then(() => {
        window.location.href = '/login';
      });

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `Logout failed. ${error}`,
        icon: 'error',
      });
    }
  };

  // Format the time
  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = `${currentTime.getDate().toString().padStart(2, '0')}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getFullYear()}`;

  return (
    <div className="topbar">
      <span className="topbar-title">Dashboard</span>
      <div className="topbar-time">
        📅 {formattedDate} ⏰ {formattedTime}
      </div>
      <div className="topbar-user">
        👤 {username}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
