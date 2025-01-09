import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';

const MedicalApprovalList = () => {
  const [approvedClaims, setApprovedClaims] = useState([]);
  const [searchType, setSearchType] = useState('empId');
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchAllClaims();
  }, []);

  const fetchAllClaims = () => {
    axiosInstance.get('/medical-approval/all')
      .then(response => { setApprovedClaims(response.data); })
      .catch(error => {
        console.error('Error fetching approved medical claims:', error);
      });
  };

  const handleSearch = () => {
    if (searchId.trim() === '') {
      fetchAllClaims();
    } else {
      let url = `/medical-approval/${searchType}/${searchId}`;
      if (searchType === 'empId') {
        axiosInstance.get(url)
          .then(response => {
            setApprovedClaims(response.data);
          })
          .catch(error => {
            console.error('Error fetching approved medical claims:', error);
            alert('Failed to fetch claims. Please check the ID and try again.');
          });
      } else if (searchType === 'claimId') {
        axiosInstance.get(url)
          .then(response => {
            setApprovedClaims([response.data]);
          })
          .catch(error => {
            console.error('Error fetching approved medical claim:', error);
            alert('Failed to fetch claim. Please check the ID and try again.');
          });
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Approved Medical Claims</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Enter ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="empId">Employee ID</option>
            <option value="claimId">Claim ID</option>
          </select>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead className='table-success'>
          <tr>
            <th>Claim ID</th>
            <th>Medical Entry ID</th>
            <th>Approved Amount</th>
            <th>Approval Date</th>
          </tr>
        </thead>
        <tbody>
          {approvedClaims.map(claim => (
            <tr key={claim.claimId}>
              <td>{claim.claimId}</td>
              <td>{claim.medicalEntryId}</td>
              <td>{claim.approvedAmount}</td>
              <td>{claim.approvalDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalApprovalList;