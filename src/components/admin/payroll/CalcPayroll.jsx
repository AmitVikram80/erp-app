import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

const CalcPayroll = () => {
  const [form, setForm] = useState({
    employeeId: '',
    salaryDate: '',
  });

  const navigate = useNavigate(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post(`/payroll/calculate?employeeId=${form.employeeId}&salaryDate=${form.salaryDate}`)
      .then((response) => {
        alert(`Payroll calculated: ${response.data.netSalary}`);
        navigate('/admin-dashboard/payrolls'); 
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">Calculate Payroll</h2>
      <div className="mb-3">
        <label htmlFor="employeeId" className="form-label">Employee ID</label>
        <input
          type="number"
          className="form-control"
          id="employeeId"
          name="employeeId"
          placeholder="Employee ID"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="salaryDate" className="form-label">Salary Date</label>
        <input
          type="date"
          className="form-control"
          id="salaryDate"
          name="salaryDate"
          placeholder="Salary Date"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Calculate Payroll</button>
    </form>
  );
};

export default CalcPayroll;