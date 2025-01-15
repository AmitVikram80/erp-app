import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';

const MedicalApprovalForm = () => {
  const [medicalEntries, setMedicalEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [dependantName, setDependantName] = useState('');
  const[employeeName, setEmployeeName]=useState('')
  const [form, setForm] = useState({
    medicalEntryId: '',
    approvedAmount: '',
    dependant: '',
    employee:'',
    requestAmount: '',
    status: '',
  });

  useEffect(() => {
    axiosInstance
      .get('/medical-entry/status?status=submitted')
      .then((response) => setMedicalEntries(response.data))
      .catch((error) => console.error('Error fetching entries:', error));
  }, []);

  const fetchDependantName = async (dependantId) => {
    try {
      const dependantResponse = await axiosInstance.get(`/dependant/${dependantId}`);
      const dependantData = dependantResponse.data;
  
      setDependantName(dependantData.dependantName+" "+'( '+dependantData.relationship+' )');
      const employeeId = dependantData.employeeId;

      const employeeResponse = await axiosInstance.get(`/admin/employee/${employeeId}`);
      const employeeData = employeeResponse.data;
  
      setEmployeeName(employeeData.firstName+" "+employeeData.lastName);
    } catch (error) {
      console.error('Error fetching dependant or employee details:', error);
    }
  };

  

  const handleSelectChange = (e) => {
    const entryId = e.target.value;
    const entry = medicalEntries.find((entry) => entry.medicalEntryId.toString() === entryId);

    if (entry) {
      fetchDependantName(entry.dependantId);
      setSelectedEntry(entry);
      setForm({
        ...form,
        medicalEntryId: entry.medicalEntryId,
        dependant: dependantName,
        employee:employeeName,
        requestAmount: entry.requestAmount,
        status: entry.status,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/medical-approval/',null, {
        params: {
          medicalEntryId: form.medicalEntryId,
          approvedAmount: form.approvedAmount,
        },
      })
      .then((response) => {
        alert(`Medical entry approved: Claim ID ${response.data.claimId}`);
        setForm({ medicalEntryId: '', approvedAmount: '',employee:'', dependant: '', requestAmount: '', status: '' });
        setSelectedEntry(null);
        setDependantName('');
        setEmployeeName('');
      })
      .catch((error) => {
        console.error('Error approving medical entry:', error);
        alert('Failed to approve medical entry. Please try again.');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Approve Medical Entry</h2>
      <div className="mb-3">
        <label htmlFor="medicalEntries" className="form-label">
          Select Medical Entry
        </label>
        <select
          id="medicalEntries"
          className="form-select"
          value={form.medicalEntryId}
          onChange={handleSelectChange}
        >
          <option value="">-- Select an Entry --</option>
          {medicalEntries.map((entry) => (
            <option key={entry.medicalEntryId} value={entry.medicalEntryId}>
              {`${entry.medicalEntryId}`}
            </option>
          ))}
        </select>
      </div>
      {selectedEntry && (
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="dependant" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              className="form-control"
              id="employee"
              name="employee"
              value={employeeName}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dependant" className="form-label">
              Dependant Name
            </label>
            <input
              type="text"
              className="form-control"
              id="dependant"
              name="dependant"
              value={dependantName}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="requestAmount" className="form-label">
              Request Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="requestAmount"
              name="requestAmount"
              value={form.requestAmount}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <input
              type="text"
              className="form-control"
              id="status"
              name="status"
              value={form.status}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="approvedAmount" className="form-label">
              Approved Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="approvedAmount"
              name="approvedAmount"
              value={form.approvedAmount}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Approve
          </button>
        </form>
      )}
    </div>
  );
};

export default MedicalApprovalForm;
