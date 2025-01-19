import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const MedicalEntryForm = ({ isEdit }) => {
  const [employeeDetails, setEmployeeDetails] = useState({ name: "", email: "" });
  const [dependants, setDependants] = useState([]);
  const [form, setForm] = useState({ dependantId: "", requestAmount: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { medicalEntryId } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [{ data: employeeData }, { data: dependantsData }] = await Promise.all([
          axiosInstance.get(`user/employee/profile`),
          axiosInstance.get(`user/dependant/employee`)
        ]);
        setEmployeeDetails({
          name: `${employeeData?.firstName || "Unknown"} ${employeeData?.lastName || "Employee"}`,
          email: employeeData?.email || "N/A",
        });
        setDependants(dependantsData || []);

        if (isEdit) {
          const { data } = await axiosInstance.get(`/medical-entry/medicalentryid/${medicalEntryId}`);
          setForm({ dependantId: data.dependantId, requestAmount: data.requestAmount });
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        alert("Error fetching details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [isEdit, medicalEntryId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size < 2 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      alert("File size must be less than 2 MB");
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.dependantId || !file || !form.requestAmount) {
      alert("Please fill all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('dependantId', form.dependantId);
    formData.append('medicalFiles', file);
    formData.append('requestAmount', form.requestAmount);
    if(medicalEntryId) { formData.append('medicalEntryId', medicalEntryId); }

    try {
      setLoading(true);
      const response = isEdit
        ? await axiosInstance.put(`/medical-entry/update`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await axiosInstance.post(`/medical-entry/add`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (response.status === 200) {
        alert(`Medical entry ${isEdit ? "updated" : "added"} successfully`);
        navigate(`/user-dashboard/medical-data`);
      }
    } catch (error) {
      console.error(`Error ${isEdit ? "updating" : "adding"} medical entry:`, error);
      alert(`Error ${isEdit ? "updating" : "adding"} medical entry. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">{isEdit ? "Edit" : "Add"} Medical Entry</h2>
      <div className="mb-3">
        <label htmlFor="empName" className="form-label">Employee Name</label>
        <input type="text" className="form-control" id="empName" value={employeeDetails.name} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="emailId" className="form-label">Email ID</label>
        <input type="email" className="form-control" id="emailId" value={employeeDetails.email} readOnly />
      </div>
      <div className="mb-3">
        <label htmlFor="dependantName" className="form-label">Dependant Name</label>
        <select className="form-select" id="dependantName" name="dependantId" value={form.dependantId} onChange={handleChange} required>
          <option value="">Select Dependant</option>
          {dependants.map((dependant) => (
            <option key={dependant.dependantId} value={dependant.dependantId}>
              {dependant.dependantName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="uploadBills" className="form-label">Upload Bills</label>
        <input type="file" className="form-control" id="uploadBills" onChange={handleFileChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="requestAmount" className="form-label">Request Amount</label>
        <input type="number" className="form-control" id="requestAmount" name="requestAmount" value={form.requestAmount} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(`/user-dashboard/medical-data`)} disabled={loading}>
        Cancel
      </button>
    </form>
  );
};

export default MedicalEntryForm;