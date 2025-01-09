import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeHeader = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-primary">
    <div className="container-fluid">
      <span className="navbar-brand">Employee Dashboard</span>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/employee-dashboard/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employee-dashboard/tasks">Tasks</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default EmployeeHeader;