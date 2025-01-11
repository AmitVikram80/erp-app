import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const LeaveApplication = () => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Employee Details
  const fetchEmployeeDetails = async () => {
    try {
      const response = await axiosInstance.get(`user/employee/profile`);
      setEmployeeDetails(response.data);
      await fetchLeaves(); // Ensure leaves are fetched after employee details
    } catch (error) {
      console.error("Error fetching employee details", error);
      setError("Failed to fetch employee details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Employee Leaves
  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get(`/user/getLeaves`);
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching leaves", error);
      setError("Failed to fetch leave data.");
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
    const { leaveRequestId } = leave;
    const { employeeId, firstName, lastName, empDesignation } = employeeDetails;
    navigate(`/user-dashboard/modify-leave`, {
      state: {
        leaveRequestId,
        empId: employeeId,
        empName: `${firstName} ${lastName}`,
        empDesignation,
      },
    });
  };

  // Navigate to the Apply Leave Page
  const handleApplyLeave = () => {
    navigate("/user-dashboard/apply-leave");
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5 col-8">
      <h2 className="text-center mb-4">Leave Management</h2>

      {/* Employee Details */}
      {employeeDetails && (
        <div className="mb-3">
          <h4>
            {`${employeeDetails.firstName} ${employeeDetails.lastName}`} -{" "}
            {employeeDetails.empDesignation}
          </h4>
        </div>
      )}

      {/* Display Leaves */}
      {leaves.length > 0 ? (
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
      ) : (
        <p>No leaves applied yet.</p>
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