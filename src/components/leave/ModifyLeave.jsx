import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../css/ModifyLeave.module.css"; // Import the CSS module
import axiosInstance from "../../api/axiosInstance";

const ModifyLeave = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [leaveApplicationId, setLeaveApplicationId] = useState("");
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [empDesignation, setEmpDesignation] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newLeaveType, setNewLeaveType] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [newReason, setNewReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state) {
      const { leaveApplicationId, empId, empName, empDesignation } =
        location.state;
      setLeaveApplicationId(leaveApplicationId);
      setEmpId(empId);
      setEmpName(empName);
      setEmpDesignation(empDesignation);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const modifyLeaveData = {
      empName,
      modifiedDate,
      newStartDate,
      newEndDate,
      newLeaveType,
      empId,
      leaveRequestId: leaveApplicationId,
      newReason,
    };

    axiosInstance.post("/modifyLeave", modifyLeaveData)
      .then(() => {
        setMessage("Leave application modified successfully.");
        setTimeout(() => navigate(`/leave-data/${empId}`), 2000);
      })
      .catch((error) => {
        console.error("Error submitting modify leave:", error);
        setMessage("Error modifying leave application.");
      });
  };

  const handleCancel = () => {
    navigate(`/leave-data/${empId}`);
  };

  return (
    <div className={styles.modifyLeaveContainer}>
      <h2>Modify Leave Application</h2>
      <form onSubmit={handleSubmit}>
        {/* Employee ID */}
        <div className={styles.formGroup}>
          <label htmlFor="empId" className={styles.formLabel}>
            Employee ID
          </label>
          <input
            type="number"
            className={styles.formControl}
            id="empId"
            value={empId}
            readOnly
          />
        </div>

        {/* Employee Name */}
        <div className={styles.formGroup}>
          <label htmlFor="empName" className={styles.formLabel}>
            Employee Name
          </label>
          <input
            type="text"
            className={styles.formControl}
            id="empName"
            value={empName}
            readOnly
          />
        </div>

        {/* Employee Designation */}
        <div className={styles.formGroup}>
          <label htmlFor="empDesignation" className={styles.formLabel}>
            Employee Designation
          </label>
          <input
            type="text"
            className={styles.formControl}
            id="empDesignation"
            value={empDesignation}
            readOnly
          />
        </div>

        {/* Leave Application ID */}
        <div className={styles.formGroup}>
          <label htmlFor="leaveApplicationId" className={styles.formLabel}>
            Leave Application ID
          </label>
          <input
            type="text"
            className={styles.formControl}
            id="leaveApplicationId"
            value={leaveApplicationId}
            readOnly
          />
        </div>

        {/* Modification Date */}
        <div className={styles.formGroup}>
          <label htmlFor="modifiedDate" className={styles.formLabel}>
            Modification Date
          </label>
          <input
            type="date"
            className={styles.formControl}
            id="modifiedDate"
            value={modifiedDate}
            onChange={(e) => setModifiedDate(e.target.value)}
            required
          />
        </div>

        {/* New Start Date */}
        <div className={styles.formGroup}>
          <label htmlFor="newStartDate" className={styles.formLabel}>
            New Start Date
          </label>
          <input
            type="date"
            className={styles.formControl}
            id="newStartDate"
            value={newStartDate}
            onChange={(e) => setNewStartDate(e.target.value)}
            required
          />
        </div>

        {/* New End Date */}
        <div className={styles.formGroup}>
          <label htmlFor="newEndDate" className={styles.formLabel}>
            New End Date
          </label>
          <input
            type="date"
            className={styles.formControl}
            id="newEndDate"
            value={newEndDate}
            onChange={(e) => setNewEndDate(e.target.value)}
            required
          />
        </div>

        {/* New Leave Type */}
        <div className={styles.formGroup}>
          <label htmlFor="newLeaveType" className={styles.formLabel}>
            New Leave Type
          </label>
          <input
            type="text"
            className={styles.formControl}
            id="newLeaveType"
            value={newLeaveType}
            onChange={(e) => setNewLeaveType(e.target.value)}
            required
          />
        </div>

        {/* Reason for Modification */}
        <div className={styles.formGroup}>
          <label htmlFor="reasonForModification" className={styles.formLabel}>
            Reason for Modification
          </label>
          <textarea
            className={styles.formControl}
            id="reasonForModification"
            rows="3"
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitBtn}>
            Submit Modification
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Success/Failure Message */}
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default ModifyLeave;
