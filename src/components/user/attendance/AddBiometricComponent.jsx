import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance'; // Importing axiosInstance

const AddBiometricComponent = () => {
  const [form, setForm] = useState({
    attendanceDate: '',
    timeIn: '',
    timeOut: '',
    totalHoursWorked: '',
    dutyType: '',
    empId: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState(null);

  
  // Fetch logged-in employee details
  const fetchEmployeeDetails = async () => {
    try {
      const response = await axiosInstance.get('/user/employee/profile');
      const employee = response.data;
      setEmployeeDetails(employee);

      // Prefill empId with logged-in employee's ID
      setForm((prevForm) => ({
        ...prevForm,
        empId: employee.employeeId,
      }));
    } catch (error) {
      console.error('Error fetching employee details:', error);
      alert('Failed to fetch employee details. Please try again later.');
    }
  };



    // Fetch biometric attendance details if editing
  useEffect(() => {
    const fetchBiometricAttendance = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/bioattendances/${id}`);
          const { attendanceDate, timeIn,timeOut,totalHoursWorked,dutyType, employee } = response.data;
          setForm({
            attendanceDate: response.data.attendanceDate,
            timeIn: response.data.timeIn,
            timeOut: response.data.timeOut,
            totalHoursWorked: response.data.totalHoursWorked,
            dutyType: response.data.dutyType,
            empId: response.data.employee.empId,
          });
        } catch (error) {
          console.error('Error fetching biometric attendance:', error);
        }
      }
    };
    fetchEmployeeDetails();
    fetchBiometricAttendance();
  }, [id]);


  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  // Save biometric attendance
  const saveBiometricAttendance = async (e) => {
    e.preventDefault();
    const biometricAttendance = {
      ...form,
      employee: { empId: form.empId },
    };

    try {
      if (id) {
        await axiosInstance.put(`/modBioAttendance/${id}`, biometricAttendance);
      } else {
        await axiosInstance.post(`/bioattendance`, biometricAttendance);
      }
      alert(`Biometric attendance ${id ? 'updated' : 'added'} successfully.`);
      navigate('/user-dashboard/bioattendances');
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'adding'} biometric attendance:`, error);
      alert(`Failed to ${id ? 'update' : 'add'} biometric attendance.`);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">{id ? 'Edit Biometric Attendance' : 'Add Biometric Attendance'}</h3>
      <form onSubmit={saveBiometricAttendance}>
        <div className="mb-3">
          <label htmlFor="attendanceDate" className="form-label">
            Attendance Date
          </label>
          <input
            type="date"
            className="form-control"
            id="attendanceDate"
            name="attendanceDate"
            value={form.attendanceDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeIn" className="form-label">
            Punch In
          </label>
          <input
            type="time"
            className="form-control"
            id="timeIn"
            name="timeIn"
            value={form.timeIn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeOut" className="form-label">
            Punch Out
          </label>
          <input
            type="time"
            className="form-control"
            id="timeOut"
            name="timeOut"
            value={form.timeOut}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalHoursWorked" className="form-label">
            Hours Worked
          </label>
          <input
            type="number"
            className="form-control"
            id="totalHoursWorked"
            name="totalHoursWorked"
            value={form.totalHoursWorked}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dutyType" className="form-label">
            Duty Type
          </label>
          <input
            type="text"
            className="form-control"
            id="dutyType"
            name="dutyType"
            value={form.dutyType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="empId" className="form-label">Employee ID</label>
          <input
            type="number"
            className="form-control"
            id="empId"
            name="empId"
            value={form.empId}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/user-dashboard/bioattendances')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBiometricComponent;
