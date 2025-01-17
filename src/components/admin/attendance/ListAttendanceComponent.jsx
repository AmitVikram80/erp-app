import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

const ListAttendanceComponent = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch all attendance records
  const fetchAttendances = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/attendances');
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
      setError('Failed to fetch attendance records. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filtered attendance records based on search input
  const filteredAttendances = attendances.filter((attendance) => {
    const fullName =
      `${attendance.employee.firstName} ${attendance.employee.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      attendance.employee.empId.toString().includes(search)
    );
  });

  // Fetch attendances on component mount
  useEffect(() => {
    fetchAttendances();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Attendance Details</h2>

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
              <th>Employee Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendances.length > 0 ? (
              filteredAttendances.map((attendance) => (
                <tr key={attendance.attendanceId}>
                  <td>{attendance.attendanceId}</td>
                  <td>
                    {attendance.employee.firstName} {attendance.employee.lastName}
                  </td>
                  <td>{attendance.attendanceDate}</td>
                  <td>{attendance.attendanceStatus}</td>
                  <td>{attendance.employee.empId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListAttendanceComponent;