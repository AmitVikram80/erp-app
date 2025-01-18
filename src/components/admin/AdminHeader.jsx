import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../useLogout';
import axiosInstance from '../../api/axiosInstance';

const AdminHeader = () => {
    const logout = useLogout();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        axiosInstance.get('/user/employee/profile')
            .then(({ data }) => setEmployee(data))
            .catch(error => console.error('Error fetching logged-in employee:', error));
    }, []);

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
                                    Joinings
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="joiningDropdown">
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-joining">Add Joinings</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/joining-list">Joining List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-printjoining">Add Prints</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/printjoining-list">Printed List</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="joiningDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Relievings
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="joiningDropdown">
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-relieving">Add Relievings</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/relieving-list">Relieving List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/add-printrelieving">Print Relievings</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/printrelieving-list">Printed List</Link></li>

                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="joiningDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Attendance
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="joiningDropdown">
                                    <li><Link className="dropdown-item" to="/admin-dashboard/attendance-data">Attendance Data</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-dashboard/bioattendance-data">Biometric Attendance Data</Link></li>
                                </ul>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto align-items-center">
                            {employee && (
                                <li className="nav-item me-3 navbar-text">
                                    ( {employee.firstName} {employee.lastName} : {employee.employeeId} )
                                </li>
                            )}
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AdminHeader;