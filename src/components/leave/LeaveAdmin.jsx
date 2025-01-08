import React, { useState, useEffect } from "react";
import styles from "../../css/Admin.module.css"; 
import axiosInstance from "../../api/axiosInstance";

const LeaveAdmin = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [compensatoryLeaves, setCompensatoryLeaves] = useState([]);
  const [loadingLeave, setLoadingLeave] = useState(true);
  const [loadingCompensatory, setLoadingCompensatory] = useState(true);

  // Fetch leave application data
  const fetchLeaveApplications = async () => {
    try {
      const response = await axiosInstance.get(
        `/getAllLeaveDetails`
      );
      setLeaveApplications(response.data);
      setLoadingLeave(false);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      setLoadingLeave(false);
    }
  };

  // Fetch compensatory leave data
  const fetchCompensatoryLeaves = async () => {
    try {
      const response = await axiosInstance.get(
        `/getAllCompensatoryLeave`
      );
      setCompensatoryLeaves(response.data);
      setLoadingCompensatory(false);
    } catch (error) {
      console.error("Error fetching compensatory leaves:", error);
      setLoadingCompensatory(false);
    }
  };

  // Approve or reject leave
  const handleAction = async (leaveId, status) => {
    try {
      const sanctionData = {
        applicationStatus: status,
        leaveRequestId: leaveId,
        adminId: 1,
      };

      await axiosInstance.post(
        `/addSanctionLeave`,
        sanctionData
      );
      console.log(`Leave application ${leaveId} ${status.toLowerCase()}`);

      // Refresh leave applications after action
      fetchLeaveApplications();
      fetchCompensatoryLeaves();
    } catch (error) {
      console.error(
        `Error ${status.toLowerCase()}ing leave application ${leaveId}:`,
        error
      );
    }
  };

  useEffect(() => {
    fetchLeaveApplications();
    fetchCompensatoryLeaves();
  }, []);

  return (
    <div className={styles.adminContainer}>
      <h1>Leave Applications</h1>
      {loadingLeave ? (
        <p className={styles.loader}>Loading leave applications...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr>
              <th>Leave ID</th>
              <th>Employee Name</th>
              <th>Leave Date</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {leaveApplications.map((leave) => (
              <tr key={leave[0]}>
                <td>{leave[0]}</td>
                <td>{leave[1]}</td>
                <td>{leave[2]}</td>
                <td>{leave[3]}</td>
                <td>{leave[4]}</td>
                <td>{leave[5]}</td>
                <td>{leave[6]}</td>
                <td className={styles.tableActions}>
                  <button
                    className={`${styles.btnApprove} btn-sm`}
                    onClick={() => handleAction(leave[0], "APPROVED")}
                  >
                    Approve
                  </button>
                  <button
                    className={`${styles.btnReject} btn-sm`}
                    onClick={() => handleAction(leave[0], "REJECTED")}
                  >
                    Reject
                  </button>
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
                  <button
                    className={`${styles.btnApprove} btn-sm`}
                    onClick={() =>
                      handleAction(leave.compensatoryLeaveId, "APPROVED")
                    }
                  >
                    Approve
                  </button>
                  <button
                    className={`${styles.btnReject} btn-sm`}
                    onClick={() =>
                      handleAction(leave.compensatoryLeaveId, "REJECTED")
                    }
                  >
                    Reject
                  </button>
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
