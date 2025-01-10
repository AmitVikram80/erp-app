import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const LeaveApplication = () => {
  const { empId } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  // Fetch Employee Details
  const fetchEmployeeDetails = async () => {
    try {
      const response = await axiosInstance.get(`employee/${empId}`);
      setEmployeeDetails(response.data);
      fetchLeaves();
    } catch (error) {
      console.error("Error fetching employee details", error);
      alert("Employee not found");
    }
  };

  // Fetch Employee Leaves
  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get(
        `getLeavesByEmployeeId?id=${empId}`
      );
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching leaves", error);
      alert("Error fetching leave data");
    }
  };

  // Delete Leave
  const handleDelete = async (leaveId) => {
    try {
      await axiosInstance.delete(`deleteLeaveById?id=${leaveId}`);
      alert("Leave deleted successfully!");
      fetchLeaves();
    } catch (error) {
      console.error("Error deleting leave", error);
      alert("Failed to delete leave.");
    }
  };

  // Navigate to Modify Leave Page
  const handleModify = (leave) => {
    navigate(`/modify-leave`, {
      state: {
        leaveRequestId: leave.leaveRequestId,
        empId: employeeDetails.employeeId,
        empName: employeeDetails.firstName + " " + employeeDetails.lastName,
        empDesignation: employeeDetails.empDesignation,
      },
    });
  };

  // Navigate to the Apply Leave Page
  const handleApplyLeave = () => {
    navigate("/apply-leave");
  };

  useEffect(() => {
    if (empId) {
      fetchEmployeeDetails();
    }
  }, [empId]);

  return (
    <div className="container mt-5 col-8">
      <h2 className="text-center mb-4">Leave Management</h2>

      {/* Employee Details */}
      {employeeDetails && (
        <div className="mb-3">
          <h4>
            {employeeDetails.firstName + " " + employeeDetails.lastName} -{" "}
            {employeeDetails.empDesignation}
          </h4>
        </div>
      )}

      {/* Display Leaves */}
      {leaves.length > 0 && (
        <div>
          <h5>Applied Leaves</h5>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>No</th>
                <th>Type of Leave</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr key={leave.leaveRequestId}>
                  <td>{index + 1}</td>
                  <td>{leave.typeOfLeave}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(leave.leaveRequestId)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleModify(leave)}
                    >
                      Modify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Apply New Leave Button */}
      <button
        className="btn btn-success mb-4 text-center"
        onClick={handleApplyLeave}
      >
        Apply New Leave
      </button>
    </div>
  );
};

export default LeaveApplication;
