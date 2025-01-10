import React, { useState, useEffect } from "react";
import styles from "../../../css/Admin.module.css";
import axiosInstance from "../../../api/axiosInstance";

const LeaveAdmin = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [compensatoryLeaves, setCompensatoryLeaves] = useState([]);
  const [loadingLeave, setLoadingLeave] = useState(true);
  const [loadingCompensatory, setLoadingCompensatory] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch leave application data
  const fetchLeaveApplications = async () => {
    try {
      const response = await axiosInstance.get(`/getAllLeaves`);
      const leavesWithSavedStatus = response.data.map((leave) => {
        // Check if there's a saved status in localStorage
        const savedStatus = localStorage.getItem(
          `leaveStatus-${leave.leaveRequestId}`
        );
        return {
          ...leave,
          applicationStatus: savedStatus || leave.applicationStatus, // Use saved status if available
        };
      });
      setLeaveApplications(leavesWithSavedStatus);
      setLoadingLeave(false);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      setLoadingLeave(false);
    }
  };

  // Fetch compensatory leave data
  const fetchCompensatoryLeaves = async () => {
    try {
      const response = await axiosInstance.get(`/getAllCompensatoryLeave`);
      const compensatoryLeavesWithSavedStatus = response.data.map((leave) => {
        // Check if there's a saved status in localStorage
        const savedStatus = localStorage.getItem(
          `compensatoryLeaveStatus-${leave.compensatoryLeaveId}`
        );
        return {
          ...leave,
          applicationStatus: savedStatus || leave.applicationStatus, // Use saved status if available
        };
      });
      setCompensatoryLeaves(compensatoryLeavesWithSavedStatus);
      setLoadingCompensatory(false);
    } catch (error) {
      console.error("Error fetching compensatory leaves:", error);
      setLoadingCompensatory(false);
    }
  };

  // Approve or reject leave
  const handleAction = async (leaveId, status, type) => {
    try {
      const sanctionData = {
        applicationStatus: status,
        adminId: 1, // Assuming a fixed admin ID for demonstration
      };

      if (type === "LEAVE") {
        sanctionData.leaveRequestId = leaveId; // For normal leave requests
      } else if (type === "COMPENSATORY") {
        sanctionData.compensatoryLeaveId = leaveId; // For compensatory leaves
      }

      // Make API call to add sanction
      await axiosInstance.post(`/addSanctionLeave`, sanctionData);
      console.log(
        `${type} leave application ${leaveId} ${status.toLowerCase()}`
      );

      // Show success message
      setMessage(
        `Leave application ${leaveId} has been ${status.toLowerCase()}`
      );

      // Save status in localStorage
      localStorage.setItem(
        `${
          type === "LEAVE" ? "leaveStatus" : "compensatoryLeaveStatus"
        }-${leaveId}`,
        status
      );

      // Update the status in the state
      if (type === "LEAVE") {
        setLeaveApplications((prevState) =>
          prevState.map((leave) =>
            leave.leaveRequestId === leaveId
              ? { ...leave, applicationStatus: status }
              : leave
          )
        );
      } else if (type === "COMPENSATORY") {
        setCompensatoryLeaves((prevState) =>
          prevState.map((leave) =>
            leave.compensatoryLeaveId === leaveId
              ? { ...leave, applicationStatus: status }
              : leave
          )
        );
      }
    } catch (error) {
      console.error(
        `Error ${status.toLowerCase()}ing ${type} leave application ${leaveId}:`,
        error
      );
      setMessage(`Error ${status.toLowerCase()}ing the leave application.`);
    }
  };

  useEffect(() => {
    fetchLeaveApplications();
    fetchCompensatoryLeaves();
  }, []);

  return (
    <div className={styles.adminContainer}>
      <h1>Leave Applications</h1>
      {message && <div className={styles.message}>{message}</div>}
      {loadingLeave ? (
        <p className={styles.loader}>Loading leave applications...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr>
              <th>Leave ID</th>
              <th>Employee Name</th>
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
                <td>{leave.empName}</td>
                <td>{leave.typeOfLeave}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.reason}</td>
                <td className={styles.tableActions}>
                  {leave.applicationStatus === "APPROVED" ||
                  leave.applicationStatus === "REJECTED" ? (
                    <span>{leave.applicationStatus}</span>
                  ) : (
                    <>
                      <button
                        className={`${styles.btnApprove} btn-sm`}
                        onClick={() =>
                          handleAction(
                            leave.leaveRequestId,
                            "APPROVED",
                            "LEAVE"
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className={`${styles.btnReject} btn-sm`}
                        onClick={() =>
                          handleAction(
                            leave.leaveRequestId,
                            "REJECTED",
                            "LEAVE"
                          )
                        }
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
      )}

      <h1 className="mt-5">Compensatory Leaves</h1>
      {loadingCompensatory ? (
        <p className={styles.loader}>Loading compensatory leaves...</p>
      ) : (
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
                  {leave.applicationStatus === "APPROVED" ||
                  leave.applicationStatus === "REJECTED" ? (
                    <span>{leave.applicationStatus}</span>
                  ) : (
                    <>
                      <button
                        className={`${styles.btnApprove} btn-sm`}
                        onClick={() =>
                          handleAction(
                            leave.compensatoryLeaveId,
                            "APPROVED",
                            "COMPENSATORY"
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className={`${styles.btnReject} btn-sm`}
                        onClick={() =>
                          handleAction(
                            leave.compensatoryLeaveId,
                            "REJECTED",
                            "COMPENSATORY"
                          )
                        }
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
      )}
    </div>
  );
};

export default LeaveAdmin;
