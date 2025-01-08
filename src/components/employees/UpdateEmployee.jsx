import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const UpdateEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleIdSubmit = (e) => {
    e.preventDefault();
    axiosInstance.get(`/employee/${employeeId}`)
      .then(response => {
        setEmployee(response.data);
        setError('');
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
        setError('Failed to fetch employee data. Please check the ID and try again.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put(`/employee/${employeeId}`, employee)
      .then(response => {
        alert('Employee updated successfully');
        navigate('/employees'); 
      })
      .catch(error => {
        console.error('Error updating employee:', error);
        alert('Failed to update employee');
      });
  };

  const handleBack = () => {
    setEmployee(null); 
    setEmployeeId(''); 
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Employee</h2>
      {!employee ? (
        <form onSubmit={handleIdSubmit}>
          <div className="mb-3">
            <label htmlFor="employeeId" className="form-label">Employee ID</label>
            <input
              type="number"
              className="form-control"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Fetch Employee Details</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      ) : (
        <form onSubmit={handleUpdateSubmit}>
          <div className="mb-3">
            <label htmlFor="employeeId" className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control"
              id="employeeId"
              value={employee.employeeId}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={employee.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="baseSalary" className="form-label">Base Salary</label>
            <input
              type="number"
              className="form-control"
              id="baseSalary"
              name="baseSalary"
              value={employee.baseSalary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="allowances" className="form-label">Allowances</label>
            <input
              type="number"
              className="form-control"
              id="allowances"
              name="allowances"
              value={employee.allowances}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfJoining" className="form-label">Date of Joining</label>
            <input
              type="date"
              className="form-control"
              id="dateOfJoining"
              name="dateOfJoining"
              value={employee.dateOfJoining}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="empDesignation" className="form-label">Designation</label>
            <input
              type="text"
              className="form-control"
              id="empDesignation"
              name="empDesignation"
              value={employee.empDesignation}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Employee</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={handleBack}>Back</button>
        </form>
      )}
    </div>
  );
};
export default UpdateEmployee;