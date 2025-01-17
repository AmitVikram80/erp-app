import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const ListAttendanceComponent = () => {
  const [attendances, setAttendances] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Employee Details and Filtered Attendances
  const fetchEmployeeDetails = async () => {
    try {
      const response = await axiosInstance.get("/user/employee/profile");
      const employee = response.data;
      setEmployeeDetails(employee);

      // Fetch and filter attendance records based on employee ID
      const attendanceResponse = await axiosInstance.get("/attendances");
      const allAttendances = attendanceResponse.data;
      const filteredAttendances = allAttendances.filter(
        (attendance) => attendance.employee.empId === employee.employeeId
      );

      setAttendances(filteredAttendances);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  // Delete Attendance
  const handleDelete = async (attendanceId) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      try {
        await axiosInstance.delete(`/delattendance/${attendanceId}`);
        alert("Attendance record deleted successfully!");
        fetchEmployeeDetails(); // Refresh attendance records after deletion
      } catch (error) {
        console.error("Error deleting attendance record:", error);
        alert("Failed to delete attendance record.");
      }
    }
  };

  // Navigate to Edit Attendance Page
  const handleEdit = (attendanceId) => {
    navigate(`/user-dashboard/editattendance/${attendanceId}`);
  };

  // Navigate to Add Attendance Page
  const handleAddAttendance = () => {
    navigate("/createattendance");
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  return (
    <div className="container mt-5 col-8">
      <h2 className="text-center mb-4">Attendance Management</h2>

      {/* Display Employee Details */}
      {employeeDetails && (
        <div className="mb-3">
          <h4>
            {employeeDetails.firstName} {employeeDetails.lastName} -{" "}
            {employeeDetails.empDesignation}
          </h4>
        </div>
      )}

      {/* Display Attendance Records */}
      {attendances.length > 0 ? (
        <div>
          <h5>Attendance Records</h5>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Attendance Id</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance, index) => (
                <tr key={attendance.attendanceId}>
                  <td>{index + 1}</td>
                  <td>{new Date(attendance.attendanceDate).toLocaleDateString()}</td>
                  <td>{attendance.attendanceStatus}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(attendance.attendanceId)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(attendance.attendanceId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No attendance records found.</p>
      )}

    </div>
  );
};

export default ListAttendanceComponent;
