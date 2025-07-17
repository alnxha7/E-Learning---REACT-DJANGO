import React from 'react';
import Sidebar from '../Navigation/Sidebar';
import Topbar from '../Navigation/Topbar';
import './Dashboard.css';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="dashboard-content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
