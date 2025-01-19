import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';


const AddEmployee = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    baseSalary: '',
    allowances: '',
    dateOfJoining: '',
    empDesignation: '',
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('/admin/employee/', form)
      .then(() => {
        alert('Employee added successfully');
        navigate('/admin-dashboard/employees');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-4 mb-4 custom-container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-header custom-header">
              <h3 className="text-center">Add Employee</h3>
            </div>
            <div className="card-body"></div>
            <form onSubmit={handleSubmit} className="container">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" placeholder="First Name" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Last Name" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="baseSalary" className="form-label">Base Salary</label>
                <input type="number" className="form-control" id="baseSalary" name="baseSalary" placeholder="Base Salary" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="allowances" className="form-label">Allowances</label>
                <input type="number" className="form-control" id="allowances" name="allowances" placeholder="Allowances" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfJoining" className="form-label">Date of Joining</label>
                <input type="date" className="form-control" id="dateOfJoining" name="dateOfJoining" onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="empDesignation" className="form-label">Designation</label>
                <input type="text" className="form-control" id="empDesignation" name="empDesignation" placeholder="Designation" onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary mb-2">Add Employee</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;