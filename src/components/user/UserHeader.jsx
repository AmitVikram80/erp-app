import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../useLogout';

const UserHeader = () => {
  const logout = useLogout();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/user-dashboard/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="employeeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Employees
                </a>
                <ul className="dropdown-menu" aria-labelledby="employeeDropdown">
                  <li><Link className="dropdown-item" to="/user-dashboard/profile">Employee profile</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="employeeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Medical
                </a>
                <ul className="dropdown-menu" aria-labelledby="employeeDropdown">
                  <li><Link className="dropdown-item" to="/user-dashboard/add-dependant">Add Dependant</Link></li>
                  <li><Link className="dropdown-item" to="/user-dashboard/medical-data">Medical Data</Link></li>
                  <li><Link className="dropdown-item" to="/user-dashboard/add-medical-entry">Add Medical Entry</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="employeeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Leave
                </a>
                <ul className="dropdown-menu" aria-labelledby="employeeDropdown">
                  <li><Link className="dropdown-item" to="/user-dashboard/leave-data">Leave Data</Link></li>
                  <li><Link className="dropdown-item" to="/user-dashboard/apply-leave">Apply Leave</Link></li>
                  <li><Link className="dropdown-item" to="/user-dashboard/apply-compensatory-leave">Apply Compensatory Leave</Link></li>
                  <li><Link className="dropdown-item" to="/user-dashboard/compensatory-leave">Compensatory Leave</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="employeeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Joining-Leaving
                </a>
                <ul className="dropdown-menu" aria-labelledby="employeeDropdown">
                  <li><Link className="dropdown-item" to="/user-dashboard/joining-list">Joining Data</Link></li>
                  <li><Link className="dropdown-item" to="/user-dashboard/relieving-list">Relieving Data</Link></li>
                  <li><Link className="dropdown-item" to="/user-dashboard/add-relieving">Relieving Page</Link></li>
                </ul>
              </li>

            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item"> <button className="btn btn-link nav-link" onClick={logout}>Logout</button> </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserHeader;