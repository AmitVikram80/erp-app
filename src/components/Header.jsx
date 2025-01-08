import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import useLogout from './useLogout';

const Header = () => {
    const logout = useLogout();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
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
                                    <li><Link className="dropdown-item" to="/employees">Employee List</Link></li>
                                    <li><Link className="dropdown-item" to="/add-employee">Add Employee</Link></li>
                                    <li><Link className="dropdown-item" to="/edit-employee">Edit Employee</Link></li>
                                    <li><Link className="dropdown-item" to="/delete-employee">Delete Employee</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="payrollDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Payroll
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="payrollDropdown">
                                    <li><Link className="dropdown-item" to="/payrolls">Payroll List</Link></li>
                                    <li><Link className="dropdown-item" to="/calc-payroll">Calculate Payroll</Link></li>
                                    <li><Link className="dropdown-item" to="/delete-payroll">Delete Payroll</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="medicallDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Medical
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="medicalDropdown">
                                    <li><Link className="dropdown-item" to="/medical-approvals">Approved Medical Claim List</Link></li>
                                    <li><Link className="dropdown-item" to="/approve-medical-entry">Approve Medical Entry</Link></li>
                                    <li><Link className="dropdown-item" to="/add-dependant">Add Dependant</Link></li>
                                    <li><Link className="dropdown-item" to="/medical-entry-list">Medical Entry List</Link></li>
                                    <li><Link className="dropdown-item" to="/add-medical-entry">Add Medical Entry</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="leavelDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Leave
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="leaveDropdown">
                                    <li><Link className="dropdown-item" to="/apply-leave">Apply Leave</Link></li>
                                    <li><Link className="dropdown-item" to="/apply-compensatory-leave">Apply Compensatory Leave</Link></li>
                                    <li><Link className="dropdown-item" to="/compensatory-leave">Compensatory Leave</Link></li>
                                    <li><Link className="dropdown-item" to="/sanctioned-leaves">Sanctioned Leaves</Link></li>
                                    <li><Link className="dropdown-item" to="/admin-leave-data">Admin Leave Data</Link></li>
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
    )
}

export default Header