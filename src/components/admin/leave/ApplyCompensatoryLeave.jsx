import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/ApplyCompensatoryLeave.module.css"; 
import axiosInstance from "../../../api/axiosInstance";

const ApplyCompensatoryLeave = () => {
  const [leaveDate, setLeaveDate] = useState("");
  const [compensatoryReason, setCompensatoryReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [empId, setEmpId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCompensatoryLeave = {
      leaveDate,
      compensatoryReason,
      startDate,
      endDate,
      empId,
    };

    try {
      axiosInstance.post("/addCompensatoryLeave", newCompensatoryLeave);
      setMessage("Compensatory Leave applied successfully!");
      setTimeout(() => navigate(`/compensatory-leave`), 2000); // Redirect to compensatory leave page
    } catch (error) {
      console.error("Error applying compensatory leave", error);
      setMessage("Error applying compensatory leave.");
    }
  };

  return (
    <div className={styles.applyLeaveContainer}>
      <h1>Apply Compensatory Leave</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="leaveDate" className={styles.formLabel}>
            Leave Date
          </label>
          <input
            type="date"
            className={styles.formControl}
            id="leaveDate"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="compensatoryReason" className={styles.formLabel}>
            Compensatory Reason
          </label>
          <input
            type="text"
            className={styles.formControl}
            id="compensatoryReason"
            value={compensatoryReason}
            onChange={(e) => setCompensatoryReason(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startDate" className={styles.formLabel}>
            Start Date
          </label>
          <input
            type="date"
            className={styles.formControl}
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="endDate" className={styles.formLabel}>
            End Date
          </label>
          <input
            type="date"
            className={styles.formControl}
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="empId" className={styles.formLabel}>
            Employee ID
          </label>
          <input
            type="number"
            className={styles.formControl}
            id="empId"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            required
          />
        </div>
        <div className="d-flex gap-3">
          <button type="submit" className={styles.submitBtn}>
            Apply Leave
          </button>
        </div>
      </form>

      {message && (
        <div
          className={
            message.includes("Error")
              ? styles.errorMessage
              : styles.successMessage
          }
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ApplyCompensatoryLeave;
