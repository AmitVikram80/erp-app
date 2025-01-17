import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

const AddAttendanceComponent = () => {
  const [form, setForm] = useState({
    attendanceDate: '',
    attendanceStatus: '',
    empId: '',
  });

  const [employeeDetails, setEmployeeDetails] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  // Fetch attendance details if editing
  useEffect(() => {
    const fetchAttendance = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/attendances/${id}`);
          const { attendanceDate, attendanceStatus, employee } = response.data;
          setForm({
            attendanceDate,
            attendanceStatus,
            empId: employee.empId,
          });
        } catch (error) {
          console.error('Error fetching attendance:', error);
        }
      }
    };

    fetchEmployeeDetails();
    fetchAttendance();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Save attendance
  const saveAttendance = async (e) => {
    e.preventDefault();
    const attendance = {
      ...form,
      employee: { empId: form.empId },
    };

    try {
      if (id) {
        await axiosInstance.put(`/modattendance/${id}`, attendance);
      } else {
        await axiosInstance.post('/attendance', attendance);
      }
      alert(`Attendance ${id ? 'updated' : 'added'} successfully.`);
      navigate('/user-dashboard/attendances');
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'adding'} attendance:`, error);
      alert(`Failed to ${id ? 'update' : 'add'} attendance.`);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{id ? 'Edit Attendance' : 'Add Attendance'}</h2>
      <form onSubmit={saveAttendance}>
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
          <label htmlFor="attendanceStatus" className="form-label">
            Attendance Status
          </label>
          <select
            className="form-control"
            id="attendanceStatus"
            name="attendanceStatus"
            value={form.attendanceStatus}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="Work from Home">Work from Home</option>
            <option value="Work from Office">Work from Office</option>
            
            <option value="Leave">Leave</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="empId" className="form-label">Employee ID</label>
          <input
            type="number"
            className="form-control"
            id="empId"
            name="empId"
            value={form.empId}
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
            onClick={() => navigate('/user-dashboard/attendances')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAttendanceComponent;
