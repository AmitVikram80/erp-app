import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';


const DeleteEmployee = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleIdSubmit = (e) => {
    e.preventDefault();
    axiosInstance.get(`/admin/employee/${employeeId}`)
      .then(response => {
        setEmployee(response.data);
        setError('');
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
        setError('Failed to fetch employee data. Please check the ID and try again.');
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      axiosInstance.delete(`/admin/employee/${employeeId}`)
        .then(response => {
          alert('Employee deleted successfully');
          navigate('/employees'); // Redirect to Employee List page
        })
        .catch(error => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee');
        });
    }
  };
  const handleBack = () => {
    setEmployee(null);
    setEmployeeId('');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Delete Employee</h2>
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
        <div>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control"
              value={employee.employeeId}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={employee.firstName}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={employee.lastName}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={employee.email}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={employee.phoneNumber}
              readOnly
            />
          </div>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Employee</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={handleBack}>Back</button>
        </div>
      )}
    </div>
  );
};

export default DeleteEmployee;