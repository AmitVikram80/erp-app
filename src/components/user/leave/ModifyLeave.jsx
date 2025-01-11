import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../../css/ModifyLeave.module.css"; // Import the CSS module
import axiosInstance from "../../../api/axiosInstance";

const ModifyLeave = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [leaveRequestId, setLeaveRequestId] = useState("");
  const [compensatoryLeaveId, setCompensatoryLeaveId] = useState(" ");
  const [isCompensatoryLeave, setIsCompensatoryLeave] = useState(false);
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [empDesignation, setEmpDesignation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeOfLeave, setTypeOfLeave] = useState("");
  const [reason, setReason] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [compensatoryReason, setCompensatoryReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state) {
      const {
        compensatoryLeaveId,
        leaveRequestId,
        empId,
        empName,
        empDesignation,
        startDate,
        endDate,
        typeOfLeave,
        reason,
        leaveDate,
        compensatoryReason,
      } = location.state;

      if (compensatoryLeaveId) {
        setCompensatoryLeaveId(compensatoryLeaveId);
        setIsCompensatoryLeave(true);
        setLeaveDate(leaveDate || "");
        setCompensatoryReason(compensatoryReason || "");
      } else {
        setLeaveRequestId(leaveRequestId);
        setIsCompensatoryLeave(false);
      }

      setEmpId(empId);
      setEmpName(empName);
      setEmpDesignation(empDesignation);
      setStartDate(startDate || "");
      setEndDate(endDate || "");
      setTypeOfLeave(typeOfLeave || "");
      setReason(reason || "");
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const modifyLeaveData = {
      startDate,
      endDate,
      reason,
      empName,
      typeOfLeave,
      empId,
    };

    const modifyCompensatoryLeaveData = {
      leaveDate,
      compensatoryReason,
      startDate,
      endDate,
      empId,
    };

    const apiUrl = isCompensatoryLeave
      ? `http://localhost:9091/v1/api/updateCompensatoryLeave?id=${compensatoryLeaveId}`
      : `http://localhost:9091/v1/api/updateLeaves?id=${leaveRequestId}`;

    axiosInstance
      .put(
        apiUrl,
        isCompensatoryLeave ? modifyCompensatoryLeaveData : modifyLeaveData
      )
      .then(() => {
        setMessage("Leave application modified successfully.");
        setTimeout(() => {
          navigate(
            isCompensatoryLeave
              ? "/user-dashboard/compensatory-leave"
              : `/user-dashboard/leave-data`,
            {
              state: { refresh: true },
            }
          );
        }, 2000);
      })
      .catch((error) => {
        console.error("Error modifying leave:", error);
        setMessage("Error modifying leave application.");
      });
  };

  const handleCancel = () => {
    navigate(
      isCompensatoryLeave ? "/compensatory-leave" : `/leave-data/${empId}`
    );
  };

  return (
    <div className={styles.modifyLeaveContainer}>
      <h2>
        Modify {isCompensatoryLeave ? "Compensatory" : "Leave"} Application
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Common fields */}
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

        <div className={styles.formGroup}>
          <label htmlFor="leaveRequestId" className={styles.formLabel}>
            {isCompensatoryLeave
              ? "Compensatory Leave ID"
              : "Leave Application ID"}
          </label>
          <input
            type="text"
            className={styles.formControl}
            id="leaveRequestId"
            value={isCompensatoryLeave ? compensatoryLeaveId : leaveRequestId}
            readOnly
          />
        </div>

        {/* Specific fields for compensatory leave */}
        {isCompensatoryLeave && (
          <>
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
              <textarea
                className={styles.formControl}
                id="compensatoryReason"
                value={compensatoryReason}
                onChange={(e) => setCompensatoryReason(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {/* Start Date */}
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

        {/* End Date */}
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

        {/* Leave Type */}
        {!isCompensatoryLeave && (
          <div className={styles.formGroup}>
            <label htmlFor="typeOfLeave" className={styles.formLabel}>
              Leave Type
            </label>
            <input
              type="text"
              className={styles.formControl}
              id="typeOfLeave"
              value={typeOfLeave}
              onChange={(e) => setTypeOfLeave(e.target.value)}
              required
            />
          </div>
        )}

        {/* Reason */}
        {!isCompensatoryLeave && (
          <div className={styles.formGroup}>
            <label htmlFor="reason" className={styles.formLabel}>
              Reason
            </label>
            <textarea
              className={styles.formControl}
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
        )}

        {/* Submit and Cancel */}
        <div className={styles.formActions}>
          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
          >
            Modify Leave
          </button>
          <button
            type="button"
            className={`btn btn-danger ${styles.cancelBtn} my-3`}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default ModifyLeave;
