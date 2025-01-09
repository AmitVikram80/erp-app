import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [searchType, setSearchType] = useState('empId');
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchAllPayrolls();
  }, []);

  const fetchAllPayrolls = () => {
    axiosInstance.get('/payroll/all')
      .then(response => {
        setPayrolls(response.data);
      })
      .catch(error => {
        console.error('Error fetching payrolls:', error);
      });
  };

  const handleSearch = () => {
    if (searchId.trim() === '') {
      fetchAllPayrolls();
    } else {
      let url = `/payroll/${searchType}/${searchId}`;
      axiosInstance.get(url)
        .then(response => {
          if (searchType === 'empId') {
            setPayrolls(response.data);
          } else if (searchType === 'payrollId') {
            setPayrolls([response.data]);
          }
        })
        .catch(error => {
          console.error('Error fetching payroll:', error);
          alert('Failed to fetch payroll. Please check the ID and try again.');
        });
    }
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Payroll List</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Enter ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="empId">Employee ID</option>
            <option value="payrollId">Payroll ID</option>
          </select>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead className='table-success'>
          <tr>
            <th>Payroll ID</th>
            <th>Employee ID</th>
            <th>Salary Date</th>
            <th>Base Salary</th>
            <th>Allowances</th>
            <th>Medical Expenses</th>
            <th>Gross Salary</th>
            <th>Tax</th>
            <th>Provident Fund</th>
            <th>Deductions</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map(payroll => (
            <tr key={payroll.payrollId}>
              <td>{payroll.payrollId}</td>
              <td>{payroll.employeeId}</td>
              <td>{payroll.salaryDate}</td>
              <td>{payroll.baseSalary}</td>
              <td>{payroll.allowances}</td>
              <td>{payroll.medicalExpenses}</td>
              <td>{payroll.grossSalary}</td>
              <td>{payroll.tax}</td>
              <td>{payroll.providentFund}</td>
              <td>{payroll.deductions}</td>
              <td>{payroll.netSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;