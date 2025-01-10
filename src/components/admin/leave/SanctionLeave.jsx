import React, { useState, useEffect } from "react";
import styles from "../../../css/SanctionLeave.module.css";
import axiosInstance from "../../../api/axiosInstance";

const SanctionLeave = () => {
  const [sanctionLeaves, setSanctionLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sanction leave data
  const fetchSanctionLeaves = async () => {
    try {
      const response = await axiosInstance.get(`/getAllSanctionedLeaves`);
      setSanctionLeaves(response.data || []); // Ensure it's an array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sanction leaves:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSanctionLeaves();
  }, []);

  return (
    <div className={styles.sanctionContainer}>
      <h1>Sanctioned Leaves</h1>
      {loading ? (
        <p className={styles.loader}>Loading sanctioned leaves...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className={styles.tableHeader}>
            <tr>
              <th>Sanction ID</th>
              <th>Leave ID</th>
              <th>Status</th>
              <th>Sanction Date</th>
              <th>Admin ID</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {sanctionLeaves.map((leave) => (
              <tr key={leave.sanctionId}>
                <td>{leave.sanctionId}</td>
                <td>
                  {leave.leaveRequestId
                    ? leave.leaveRequestId // Display leaveRequestId for normal leaves
                    : leave.compensatoryLeaveId}{" "}
                  {/* Display compensatoryLeaveId for compensatory leaves */}
                </td>
                <td>{leave.applicationStatus}</td>
                <td>{new Date(leave.sanctionDate).toLocaleString()}</td>
                <td>{leave.adminId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SanctionLeave;
