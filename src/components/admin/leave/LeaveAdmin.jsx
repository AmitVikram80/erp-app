import React, { useState, useEffect } from "react";
import styles from "../../../css/Admin.module.css";
import axiosInstance from "../../../api/axiosInstance";

const LeaveManager = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [compensatoryLeaves, setCompensatoryLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // Fetch leave application data
  const fetchLeaveApplications = async () => {
    try {
      const response = await axiosInstance.get(`/getAllLeaves`);
      const leavesWithSavedStatus = response.data.map((leave) => {
        const savedStatus = localStorage.getItem(`leaveStatus-${leave.leaveRequestId}`);
        return {
          ...leave,
          applicationStatus: savedStatus || leave.applicationStatus,
        };
      });
      setLeaveApplications(leavesWithSavedStatus);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      setError("Failed to fetch leave applications.");
    }
  };

  // Fetch compensatory leave data
  const fetchCompensatoryLeaves = async () => {
    try {
      const response = await axiosInstance.get(`/admin/getAllCompensatoryLeave`);
      const compensatoryLeavesWithSavedStatus = response.data.map((leave) => {
        const savedStatus = localStorage.getItem(`compensatoryLeaveStatus-${leave.compensatoryLeaveId}`);
        return {
          ...leave,
          applicationStatus: savedStatus || leave.applicationStatus,
        };
      });
      setCompensatoryLeaves(compensatoryLeavesWithSavedStatus);
    } catch (error) {
      console.error("Error fetching compensatory leaves:", error);
      setError("Failed to fetch compensatory leaves.");
    }
  };

  // Approve or reject leave
  const handleAction = async (leaveId, status, type) => {
    try {
      const sanctionData = {
        applicationStatus: status,
        ...(type === "LEAVE" ? { leaveRequestId: leaveId } : { compensatoryLeaveId: leaveId }),
      };

      await axiosInstance.post(`/admin/addSanctionLeave`, sanctionData);
      setMessage(`Leave application ${leaveId} has been ${status.toLowerCase()}`);

      localStorage.setItem(
        `${type === "LEAVE" ? "leaveStatus" : "compensatoryLeaveStatus"}-${leaveId}`,
        status
      );

      if (type === "LEAVE") {
        setLeaveApplications((prevState) =>
          prevState.map((leave) =>
            leave.leaveRequestId === leaveId ? { ...leave, applicationStatus: status } : leave
          )
        );
      } else {
        setCompensatoryLeaves((prevState) =>
          prevState.map((leave) =>
            leave.compensatoryLeaveId === leaveId ? { ...leave, applicationStatus: status } : leave
          )
        );
      }
    } catch (error) {
      console.error(`Error ${status.toLowerCase()}ing ${type} leave application ${leaveId}:`, error);
      setMessage(`Error ${status.toLowerCase()}ing the leave application.`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLeaveApplications();
      await fetchCompensatoryLeaves();
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
      {leaveApplications.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr>
              <th>Leave ID</th>
              <th>Employee Id</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
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
                <td className={styles.tableActions}>
                  {leave.applicationStatus === "APPROVED" || leave.applicationStatus === "REJECTED" ? (
                    <span>{leave.applicationStatus}</span>
                  ) : (
                    <>
                      <button
                        className={`${styles.btnApprove} btn-sm`}
                        onClick={() => handleAction(leave.leaveRequestId, "APPROVED", "LEAVE")}
                      >
                        Approve
                      </button>
                      <button
                        className={`${styles.btnReject} btn-sm`}
                        onClick={() => handleAction(leave.leaveRequestId, "REJECTED", "LEAVE")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leave applications found.</p>
      )}

      <h1 className="mt-5">Compensatory Leaves</h1>
      {compensatoryLeaves.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr>
              <th>Compensatory Leave ID</th>
              <th>Leave Date</th>
              <th>Reason</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {compensatoryLeaves.map((leave) => (
              <tr key={leave.compensatoryLeaveId}>
                <td>{leave.compensatoryLeaveId}</td>
                <td>{leave.leaveDate}</td>
                <td>{leave.compensatoryReason}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td className={styles.tableActions}>
                  {leave.applicationStatus === "APPROVED" || leave.applicationStatus === "REJECTED" ? (
                    <span>{leave.applicationStatus}</span>
                  ) : (
                    <>
                      <button
                        className={`${styles.btnApprove} btn-sm`}
                        onClick={() => handleAction(leave.compensatoryLeaveId, "APPROVED", "COMPENSATORY")}
                      >
                        Approve
                      </button>
                      <button
                        className={`${styles.btnReject} btn-sm`}
                        onClick={() => handleAction(leave.compensatoryLeaveId, "REJECTED", "COMPENSATORY")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No compensatory leaves found.</p>
      )}
    </div>
  );
};

export default LeaveManager;