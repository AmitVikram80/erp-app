import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ListBiometricComponent = () => {
  const [bioAttendances, setBioAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch all biometric attendance records
  const fetchBioAttendances = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/admin/bioattendances');
      setBioAttendances(response.data);
    } catch (error) {
      console.error('Error fetching biometric attendance:', error);
      setError('Failed to fetch biometric attendance records. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filtered biometric attendance records based on search input
  const filteredBioAttendances = bioAttendances.filter((attendance) =>{
    const fullName =
      `${attendance.employee.firstName} ${attendance.employee.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      attendance.employee.empId.toString().includes(search)
    );
  });

  useEffect(() => {
    fetchBioAttendances();
  }, []);

  const deleteBiometricAttendance = async (id) => {
    if (window.confirm('Do you want to delete this biometric attendance?')) {
      try {
        await axiosInstance.delete(`/delbioattendance/${id}`);
        fetchBioAttendances();
      } catch (error) {
        console.error('Error deleting biometric attendance:', error);
      }
    }
  };

  const navigateToAdd = () => navigate('/createbioattendance');
  const navigateToEdit = (id) => navigate(`/editbioattendance/${id}`);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Biometric Attendance Details</h2>
      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Employee Name or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Date</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Hours Worked</th>
              <th>Duty Type</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredBioAttendances.length > 0 ? (
              filteredBioAttendances.map((attendance) => (
                <tr key={attendance.biometricId}>
                  <td>{attendance.biometricId}</td>
                  <td>
                    {attendance.employee.firstName} {attendance.employee.lastName}
                  </td>
                  <td>{attendance.attendanceDate}</td>
                  <td>{attendance.timeIn}</td>
                  <td>{attendance.timeOut}</td>
                  <td>{attendance.totalHoursWorked}</td>
                  <td>{attendance.dutyType}</td>
                  <td>{attendance.employee.empId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No biometric attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListBiometricComponent;
