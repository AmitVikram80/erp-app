import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get('/employee/all');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const fetchAllEmployees = () => {
    axiosInstance.get('/employee/all')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  };

  const handleSearch = () => {
    if (searchId.trim() === '') {
      fetchAllEmployees();
    } else {
      axiosInstance.get(`/employee/${searchId}`)
        .then(response => {
          setEmployees([response.data]);
        })
        .catch(error => {
          console.error('Error fetching employee:', error);
          alert('Failed to fetch employee. Please check the ID and try again.');
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee List</h2>
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Employee ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead className='table-success'>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Base Salary</th>
            <th>Allowances</th>
            <th>Date of Joining</th>
            <th>Designation</th>
            <th>Medical Data</th>
            <th>Leave Data</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.baseSalary}</td>
              <td>{employee.allowances}</td>
              <td>{employee.dateOfJoining}</td>
              <td>{employee.empDesignation}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/emp-medical-data/${employee.employeeId}`)}
                >
                  View
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/leave-data/${employee.employeeId}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;