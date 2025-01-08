import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const CompensatoryLeave = () => {
  const [compensatoryLeaves, setCompensatoryLeaves] = useState([]);
  const navigate = useNavigate();

  // Fetch compensatory leave records
  useEffect(() => {
    const fetchCompensatoryLeaves = async () => {
      try {
        const response = await axiosInstance.get(`/getAllCompensatoryLeave`); // Await the response
        // For each compensatory leave, fetch the employee data
        const leavesWithEmployeeDetails = await Promise.all(
          response.data.map(async (leave) => {
            const empResponse = await axiosInstance.get(
              `/employee/${leave.empId}`
            ); // Await the response
            return {
              ...leave,
              empName: empResponse.data.empName,
              empDesignation: empResponse.data.empDesignation,
            };
          })
        );

        setCompensatoryLeaves(leavesWithEmployeeDetails);
      } catch (error) {
        console.error("Error fetching compensatory leave records", error);
      }
    };

    fetchCompensatoryLeaves();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(
        `/deleteCompensatoryLeaveById?id=${id}`
      ); // Await the delete operation
      setCompensatoryLeaves(
        compensatoryLeaves.filter((leave) => leave.compensatoryLeaveId !== id)
      );
      alert("Leave deleted successfully!");
    } catch (error) {
      console.error("Error deleting compensatory leave record", error);
    }
  };

  // Handle modify action - navigate to ModifyLeave component with selected leave data
  const handleModify = (leave) => {
    navigate(`/modify-leave`, {
      state: {
        compensatoryLeaveId: leave.compensatoryLeaveId,
        leaveDate: leave.leaveDate,
        compensatoryReason: leave.compensatoryReason,
        startDate: leave.startDate,
        endDate: leave.endDate,
        empId: leave.empId,
        empName: leave.empName,
        empDesignation: leave.empDesignation,
      },
    });
  };

  // Navigate to ApplyCompensatoryLeave component
  const handleApplyLeave = () => {
    navigate("/apply-compensatory-leave");
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Compensatory Leave</h1>
      <button className="btn btn-primary mb-3" onClick={handleApplyLeave}>
        Apply New Compensatory Leave
      </button>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Leave ID</th>
            <th>Leave Date</th>
            <th>Reason</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Employee Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {compensatoryLeaves.map((leave) => (
            <tr key={leave.compensatoryLeaveId}>
              <td>{leave.compensatoryLeaveId}</td>
              <td>{leave.leaveDate}</td>
              <td>{leave.compensatoryReason}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.empId}</td>
              <td>{leave.empName}</td>
              <td>{leave.empDesignation}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleModify(leave)}
                >
                  Modify
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(leave.compensatoryLeaveId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompensatoryLeave;