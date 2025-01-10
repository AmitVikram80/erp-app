import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const MedicalData = () => {
    const [bills, setBills] = useState([]);
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [dependants, setDependants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const employeeResponse = await axiosInstance.get(`user/employee/profile`);
                setEmployeeDetails(employeeResponse.data);

                const dependantsResponse = await axiosInstance.get(`user/dependant/employee`);
                setDependants(dependantsResponse.data);

                const billsResponse = await axiosInstance.get(`/user/medical-entry/employee`);
                setBills(billsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData();
    }, []);

    const edit = (medicalEntryId, dependantId) => {
        navigate(`/edit-medical-entry/${medicalEntryId}/${dependantId}`);
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4 primary-text">Employee Medical Claim Dashboard</h2>
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-header primary-bg">
                            Employee Details
                        </div>
                        <div className="card-body">
                            <p><strong>Name:</strong> {employeeDetails?.firstName || "N/A"} {employeeDetails?.lastName || "N/A"}</p>
                            <p><strong>Email:</strong> {employeeDetails?.email || "N/A"}</p>
                            <p><strong>Employee ID:</strong> {employeeDetails?.employeeId || "N/A"}</p>
                            <p><strong>Designation:</strong> {employeeDetails?.empDesignation || "N/A"}</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-header secondary-bg">
                            Dependants
                            <button className="btn btn-outline-light btn-sm float-end" onClick={() => navigate(`/add/${empId}`)}>Add Dependant +</button>
                        </div>
                        <div className="card-body">
                            {dependants.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {dependants.map((dependant) => (
                                        <li key={dependant.dependantId} className="list-group-item">
                                            <p><strong>Id,</strong> {dependant.dependantId} : {dependant.dependantName} (Relationship: {dependant.relationship})</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No dependants found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <table className="table table-bordered shadow-sm">
                    <thead className="primary-bg text-white">
                        <tr>
                            <th>Medical Entry Id</th>
                            <th>Dependant Id</th>
                            <th>Date Created</th>
                            <th>Amount Requested</th>
                            <th>Medical Files</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.length > 0 ? (
                            bills.map((bill) => (
                                <tr key={bill.medicalEntryId}>
                                    <td>{bill.medicalEntryId}</td>
                                    <td>{bill.dependantId || "N/A"}</td>
                                    <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
                                    <td>{bill.requestAmount}</td>
                                    <td>
                                        {bill.medicalFiles ? (
                                            <a
                                                href={`data:application/pdf;base64,${bill.medicalFiles}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-link secondary-text"
                                            >
                                                View File
                                            </a>
                                        ) : (
                                            "No file available"
                                        )}
                                    </td>
                                    <td>{bill.status || "Pending"}</td>
                                    <td>
                                        {bill.isApproved ? (
                                            <span className="badge bg-success">Approved</span>
                                        ) : (
                                            <button className="btn btn-outline-warning" onClick={() => edit(bill.medicalEntryId, bill.dependant?.dependantId)}
                                            disabled={bill.status === "REJECTED" || bill.status === "APPROVED"} 
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicalData;