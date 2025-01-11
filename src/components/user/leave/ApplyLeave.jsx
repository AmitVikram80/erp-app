import React, { useState, useEffect } from "react";
import styles from "../../../css/ApplyLeave.module.css";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const ApplyLeave = () => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    typeOfLeave: "",
    empName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axiosInstance.get(`user/employee/profile`);
        setEmployeeDetails(response.data);

        setFormData((prevFormData) => ({
          ...prevFormData,
          empName: response.data.firstName + " " + response.data.lastName,
        }));
      } catch (error) {
        console.error("Error fetching employee details", error);
        alert("Failed to fetch employee details.");
      }
    };

    fetchEmployeeDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        typeOfLeave: formData.typeOfLeave,
      };

      const response = await axiosInstance.post("user/addLeave", payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Leave Application Submitted Successfully!");
      navigate(`/user-dashboard/leave-data`);
    } catch (error) {
      console.error("Error submitting leave application", error);
      alert("Failed to submit leave application.");
    }
  };

  return (
    <div className={styles.applyLeaveContainer}>
      <h2 className={styles.applyLeaveTitle}>Apply for Leave</h2>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Employee Name:</label>
        <input
          type="text"
          className={styles.formControl}
          value={formData.empName}
          readOnly
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Type of Leave:</label>
          <select
            className={styles.formSelect}
            value={formData.typeOfLeave}
            onChange={(e) =>
              setFormData({ ...formData, typeOfLeave: e.target.value })
            }
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>From Date:</label>
          <input
            type="date"
            className={styles.formControl}
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>To Date:</label>
          <input
            type="date"
            className={styles.formControl}
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Reason:</label>
          <textarea
            className={styles.formControl}
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit Leave Application
        </button>
      </form>
    </div>
  );
};

export default ApplyLeave;