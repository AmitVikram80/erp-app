import React from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../useLogout';

const AdminHeader = () => {
    const logout = useLogout();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/admin-dashboard/overview">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="employeeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Employee
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="employeeDropdown">
                                    <li><Link className="dropdown-item" to="/admin-dashboard/employees">Employee List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-employee">Add Employee</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/edit-employee">Edit Employee</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/delete-employee">Delete Employee</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="payrollDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Payroll
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="payrollDropdown">
                                    <li><Link className="dropdown-item" to="/admin-dashboard/payrolls">Payroll List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/calc-payroll">Calculate Payroll</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/delete-payroll">Delete Payroll</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="medicalDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Medical
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="medicalDropdown">
                                    <li><Link className="dropdown-item" to="/admin-dashboard/medical-approvals">Approved Medical Claim List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/approve-medical-entry">Approve Medical Entry</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-dependant">Add Dependant</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/medical-entry-list">Medical Entry List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-medical-entry">Add Medical Entry</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="leaveDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Leave
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="leaveDropdown">
                                    <li><Link className="dropdown-item" to="/admin-dashboard/sanctioned-leaves">Sanctioned Leaves</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/admin-leave-data">Admin Leave Data</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="joiningDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Joining & Leaving
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="joiningDropdown">
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-joining">Add Employee Joining</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/joining-list">Employee Joining List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-printjoining">Add Print Joining</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/printjoining-list">Print Joining List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-relieving">Add Employee Relieving</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/relieving-list">Employee Relieving List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-printrelieving">Add Print Relieving</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/printrelieving-list">Print Relieving List</Link></li>
                                    
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

export default AdminHeader;