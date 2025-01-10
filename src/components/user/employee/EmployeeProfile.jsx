import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      try {
        const response = await axiosInstance.get('user/employee/profile');
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee profile:', error);
        setError('Failed to load employee profile');
        setLoading(false);
      }
    };

    fetchEmployeeProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Profile</h2>
      {employee && (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Employee ID:</strong> {employee.employeeId || 'N/A'}</p>
                <p><strong>First Name:</strong> {employee.firstName || 'N/A'}</p>
                <p><strong>Last Name:</strong> {employee.lastName || 'N/A'}</p>
                <p><strong>Email:</strong> {employee.email || 'N/A'}</p>
                <p><strong>Phone Number:</strong> {employee.phoneNumber || 'N/A'}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Base Salary:</strong> ${employee.baseSalary ? employee.baseSalary.toFixed(2) : 'N/A'}</p>
                <p><strong>Allowances:</strong> ${employee.allowances ? employee.allowances.toFixed(2) : 'N/A'}</p>
                <p><strong>Date of Joining:</strong> {employee.dateOfJoining ? new Date(employee.dateOfJoining).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Designation:</strong> {employee.empDesignation || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;