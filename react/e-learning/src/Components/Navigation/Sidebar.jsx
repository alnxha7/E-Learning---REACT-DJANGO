import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">E-Learning</div>
      <ul className="sidebar-links">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/dashboard/courses/">Courses</a></li>
        <li><a href="#">My Courses</a></li>
        <li><a href="/dashboard/profile/">Profile</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
