import React, { useState, useEffect } from "react";
import styles from "../../../css/Admin.module.css";
import axiosInstance from "../../../api/axiosInstance";

const LeaveAdmin = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [compensatoryLeave, setCompensatoryLeave] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // Fetch leave applications
  const fetchLeaveApplications = async () => {
    try {
      const response = await axiosInstance.get(`/getAllLeaves`);
      const fetchedLeaves = response.data.map((leave) => ({
        ...leave,
      }));
      setLeaveApplications(fetchedLeaves);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      setError("Failed to fetch leave applications.");
    }
  };

  // Fetch compensatory leave applications
  const fetchCompensatoryLeaveApplication = async () => {
    try {
      const response = await axiosInstance.get("/user/getAllCompensatoryLeave");
      const fetchedCompensatoryLeaves = response.data.map(
        (compensatoryLeave) => ({
          ...compensatoryLeave,
        })
      );
      setCompensatoryLeave(fetchedCompensatoryLeaves);
    } catch (error) {
      console.log("Error fetching compensatory leave applications:", error);
      setError("Failed to fetch compensatory leave applications.");
    }
  };

  // Approve or Reject leave (for both regular and compensatory leaves)
  const handleAction = async (
    leaveId,
    compensatoryLeaveId,
    leaveDate,
    startDate,
    endDate,
    reason,
    typeOfLeave,
    status,
    empId
  ) => {
    try {
      const leaveDto = {
        startDate,
        endDate,
        reason,
        typeOfLeave,
        status,
        empId,
      };

      const compensatoryLeaveDto = {
        leaveDate,
        reason,
        startDate,
        endDate,
        status,
        empId,
      };

      // Determine if it's a regular leave or compensatory leave
      if (compensatoryLeaveId) {
        console.log(compensatoryLeaveDto);
        // Handle compensatory leave
        await axiosInstance.put(
          `/updateCompensatoryLeave?id=${compensatoryLeaveId}`,
          compensatoryLeaveDto
        );
      } else {
        // Handle regular leave
        await axiosInstance.put(`/updateLeaves?id=${leaveId}`, leaveDto);
      }

      const sanctionData = {
        applicationStatus: status,
        adminId: 2, // Set the admin ID dynamically if needed
        leaveRequestId: compensatoryLeaveId ? null : leaveId, // Use either leaveRequestId or
        compensatoryLeaveId: leaveId ? null : compensatoryLeaveId,
      };

      await axiosInstance.post(`/admin/addSanctionLeave`, sanctionData);

      // Update the leave status in state
      setLeaveApplications((prevState) =>
        prevState.map((leave) =>
          leave.leaveRequestId === leaveId ? { ...leave, status } : leave
        )
      );

      setCompensatoryLeave((prevState) =>
        prevState.map((compLeave) =>
          compLeave.compensatoryLeaveId === compensatoryLeaveId
            ? { ...compLeave, status }
            : compLeave
        )
      );

      setMessage(`Leave application has been ${status.toLowerCase()}.`);
    } catch (error) {
      console.error(
        `Error ${status.toLowerCase()}ing leave application:`,
        error
      );
      setMessage(`Error ${status.toLowerCase()}ing the leave application.`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchLeaveApplications();
      await fetchCompensatoryLeaveApplication();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.managerContainer}>
      <h1>Leave Applications</h1>
      {message && <div className={styles.message}>{message}</div>}

      {/* Regular Leave Applications Table */}
      {leaveApplications.length > 0 ? (
        <table className="table table-bordered table-hover mb-5">
          <thead className={styles.tableHeader}>
            <tr>
              <th>Leave ID</th>
              <th>Employee ID</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {leaveApplications.map((leave) => (
              <tr key={leave.leaveRequestId}>
                <td>{leave.leaveRequestId}</td>
                <td>{leave.empId}</td>
                <td>{leave.typeOfLeave}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.reason}</td>
                <td>
                  {leave.status === "APPROVED" ? (
                    <span className={styles.approvedText}>Approved</span>
                  ) : leave.status === "REJECTED" ? (
                    <span className={styles.rejectedText}>Rejected</span>
                  ) : (
                    <span className={styles.pendingText}>Pending</span>
                  )}
                </td>
                <td>
                  {leave.status === null ? (
                    <>
                      <button
                        className="btn btn-success btn-sm mx-2"
                        onClick={() =>
                          handleAction(
                            leave.leaveRequestId,
                            null,
                            null,
                            leave.startDate,
                            leave.endDate,
                            leave.reason,
                            leave.typeOfLeave,
                            "APPROVED",
                            leave.empId
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleAction(
                            leave.leaveRequestId,
                            null,
                            null,
                            leave.startDate,
                            leave.endDate,
                            leave.reason,
                            leave.typeOfLeave,
                            "REJECTED",
                            leave.empId
                          )
                        }
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leave applications found.</p>
      )}

      {/* Compensatory Leave Applications Table */}

      <h2 style={{ textAlign: "center" }}>Compensatory Leave</h2>

      {compensatoryLeave.length > 0 ? (
        <table className="table table-bordered table-hover mb-5">
          <thead className={styles.tableHeader}>
            <tr>
              <th>Compensatory Leave ID</th>
              <th>Employee ID</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {compensatoryLeave.map((compLeave) => (
              <tr key={compLeave.compensatoryLeaveId}>
                <td>{compLeave.compensatoryLeaveId}</td>
                <td>{compLeave.empId}</td>
                <td>{"compensatory"}</td>
                <td>{compLeave.startDate}</td>
                <td>{compLeave.endDate}</td>
                <td>{compLeave.compensatoryReason}</td>
                <td>
                  {compLeave.status === "APPROVED" ? (
                    <span className={styles.approvedText}>Approved</span>
                  ) : compLeave.status === "REJECTED" ? (
                    <span className={styles.rejectedText}>Rejected</span>
                  ) : (
                    <span className={styles.pendingText}>Pending</span>
                  )}
                </td>
                <td>
                  {compLeave.status === null ? (
                    <>
                      <button
                        className="btn btn-success btn-sm mx-2"
                        onClick={() =>
                          handleAction(
                            null,
                            compLeave.compensatoryLeaveId,
                            compLeave.leaveDate,
                            compLeave.startDate,
                            compLeave.endDate,
                            compLeave.compensatoryReason,
                            compLeave.typeOfLeave,
                            "APPROVED",
                            compLeave.empId
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleAction(
                            null,
                            compLeave.compensatoryLeaveId,
                            compLeave.leaveDate,
                            compLeave.startDate,
                            compLeave.endDate,
                            compLeave.compensatoryReason,
                            compLeave.typeOfLeave,
                            "REJECTED",
                            compLeave.empId
                          )
                        }
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No compensatory leave applications found.</p>
      )}
    </div>
  );
};

export default LeaveAdmin;
