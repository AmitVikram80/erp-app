import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const DeletePayroll = () => {
  const [payrollId, setPayrollId] = useState('');
  const [payroll, setPayroll] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleIdSubmit = (e) => {
    e.preventDefault();
    axiosInstance.get(`/payroll/payrollId/${payrollId}`)
      .then(response => {
        setPayroll(response.data);
        setError('');
      })
      .catch(error => {
        console.error('Error fetching payroll data:', error);
        setError('Failed to fetch payroll data. Please check the ID and try again.');
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this payroll record?');
    if (confirmDelete) {
      axiosInstance.delete(`/payroll/${payrollId}`)
        .then(response => {
          alert('Payroll record deleted successfully');
          navigate('/payrolls'); // Redirect to Payroll List page
        })
        .catch(error => {
          console.error('Error deleting payroll:', error);
          alert('Failed to delete payroll');
        });
    }
  };

  const handleBack = () => {
    setPayroll(null);
    setPayrollId('');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Delete Payroll</h2>
      {!payroll ? (
        <form onSubmit={handleIdSubmit}>
          <div className="mb-3">
            <label htmlFor="payrollId" className="form-label">Payroll ID</label>
            <input
              type="number"
              className="form-control"
              id="payrollId"
              value={payrollId}
              onChange={(e) => setPayrollId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Fetch Payroll Details</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      ) : (
        <div>
          <div className="mb-3">
            <label className="form-label">Payroll ID</label>
            <input
              type="text"
              className="form-control"
              value={payroll.payrollId}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control"
              value={payroll.employeeId}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Salary Date</label>
            <input
              type="text"
              className="form-control"
              value={payroll.salaryDate}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Base Salary</label>
            <input
              type="text"
              className="form-control"
              value={payroll.baseSalary}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Allowances</label>
            <input
              type="text"
              className="form-control"
              value={payroll.allowances}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Medical Expenses</label>
            <input
              type="text"
              className="form-control"
              value={payroll.medicalExpenses}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gross Salary</label>
            <input
              type="text"
              className="form-control"
              value={payroll.grossSalary}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tax</label>
            <input
              type="text"
              className="form-control"
              value={payroll.tax}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Provident Fund</label>
            <input
              type="text"
              className="form-control"
              value={payroll.providentFund}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Deductions</label>
            <input
              type="text"
              className="form-control"
              value={payroll.deductions}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Net Salary</label>
            <input
              type="text"
              className="form-control"
              value={payroll.netSalary}
              readOnly
            />
          </div>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Payroll</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={handleBack}>Back</button>
        </div>
      )}
    </div>
  );
};

export default DeletePayroll;