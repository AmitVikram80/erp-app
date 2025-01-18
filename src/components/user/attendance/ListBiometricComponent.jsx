import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const ListBiometricComponent = () => {
  const [bioAttendances, setBioAttendances] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch Employee Details and Biometric Attendances
  const fetchEmployeeDetails = async () => {
    try {
      // Fetch the logged-in employee details
      const response = await axiosInstance.get("/user/employee/profile");
      const employee = response.data;
      setEmployeeDetails(employee);

      // Fetch all biometric attendance records
      const attendanceResponse = await axiosInstance.get("/user/bioattendances");
      const allBioAttendances = attendanceResponse.data;

      // Filter biometric attendances based on the logged-in employee's ID
      const filteredBioAttendances = allBioAttendances.filter(
        (attendance) => attendance.employee.empId === employee.employeeId
      );

      setBioAttendances(filteredBioAttendances);
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

  // Filtered biometric attendance records based on search input
  const filteredBioAttendances = bioAttendances.filter((attendance) => {
    const fullName = `${attendance.employee.firstName} ${attendance.employee.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      attendance.employee.empId.toString().includes(search)
    );
  });


  // Delete Biometric Attendance Record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this biometric attendance?")) {
      try {
        await axiosInstance.delete(`/delbioattendance/${id}`);
        alert("Biometric attendance deleted successfully.");
        fetchEmployeeDetails(); // Refresh after deletion
      } catch (error) {
        console.error("Error deleting biometric attendance:", error);
        alert("Failed to delete biometric attendance.");
      }
    }
  };


  // Navigate to Add Biometric Attendance page
  const navigateToAdd = () => navigate("/createbioattendance");

  
  // Navigate to Edit Attendance Page
  const handleEdit = (id) => {
    navigate(`/user-dashboard/editbioattendances/${id}`);
  };


  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  return (
    <div className="container mt-5 col-9">
      <h2 className="text-center mb-4">Biometric Attendance Management</h2>

      {/* Display Employee Details */}
      {employeeDetails && (
        <div className="mb-3">
          <h4>
            {employeeDetails.firstName} {employeeDetails.lastName} - {employeeDetails.empDesignation}
          </h4>
        </div>
      )}

      {/* Display Biometric Attendance Records */}
      {filteredBioAttendances.length > 0 ? (
        <div>
          <h5>Biometric Attendance Records</h5>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Attendance Id</th>
                <th>Name</th>
                <th>Date</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Hours Worked</th>
                <th>Duty Type</th>
                <th>Employee ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBioAttendances.map((attendance, index) => (
                <tr key={attendance.biometricId}>
                  <td>{index + 1}</td>
                  <td>{attendance.employee.firstName} {attendance.employee.lastName}</td>
                  <td>{attendance.attendanceDate}</td>
                  <td>{attendance.timeIn}</td>
                  <td>{attendance.timeOut}</td>
                  <td>{attendance.totalHoursWorked}</td>
                  <td>{attendance.dutyType}</td>
                  <td>{attendance.employee.empId}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(attendance.biometricId)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(attendance.biometricId)}
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
        <p>No biometric attendance records found.</p>
      )}
    </div>
  );
};

export default ListBiometricComponent;
