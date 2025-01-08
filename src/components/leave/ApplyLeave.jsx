import React, { useState } from "react";
import styles from "../../css/ApplyLeave.module.css";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
  const [empId, setEmpId] = useState(""); 
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    typeOfLeave: "",
  });
  const navigate = useNavigate();

  // Fetch Employee Details based on empId
  const fetchEmployeeDetails = async () => {
    try {
      const response = axiosInstance.get(`/employee/${empId}`
      );
      setEmployeeDetails(response.data);
    } catch (error) {
      console.error("Error fetching employee details", error);
      alert("Employee not found");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        empName: employeeDetails?.empName,
        typeOfLeave: formData.typeOfLeave,
        empId: empId,
      };

      const response = axiosInstance.post("/addLeave",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Leave Application Submitted Successfully!");
      navigate(`/leave-data/${empId}`);
      
    } catch (error) {
      console.error("Error submitting leave application", error);
      alert("Failed to submit leave application.");
    }
  };

  return (
    <div className={styles.applyLeaveContainer}>
      <h2 className={styles.applyLeaveTitle}>Apply for Leave</h2>

      {/* Employee ID Field */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Employee ID:</label>
        <input
          type="text"
          className={styles.formControl}
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          onBlur={fetchEmployeeDetails} // Fetch employee details when field loses focus
          required
        />
      </div>

      {/* Employee Name and Designation */}
      {employeeDetails && (
        <div className={styles.formGroup}>
          <h4>
            {employeeDetails.empName} - {employeeDetails.empDesignation}
          </h4>
        </div>
      )}

      {/* Leave Application Form */}
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
