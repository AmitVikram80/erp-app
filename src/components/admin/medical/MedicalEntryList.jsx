import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../api/axiosInstance';

const MedicalEntryList = () => {
    const [medicalEntries, setMedicalEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicalEntries = async () => {
            try {
                const response = await axiosInstance.get('/medical-entry');
                setMedicalEntries(response.data);
            } catch (err) {
                console.error("Error fetching medical entries:", err);
                setError("Failed to load medical entries. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMedicalEntries();
    }, []);

    const handleDelete = async (medicalEntryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this medical entry?");
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/medical-entry/${medicalEntryId}`);
            setMedicalEntries(medicalEntries.filter(entry => entry.medicalEntryId !== medicalEntryId));
            alert("Medical entry deleted successfully.");
        } catch (error) {
            console.error("Error deleting medical entry:", error);
            alert("Failed to delete medical entry.");
        }
    };

    if (loading) {
        return <div className="spinner-border m-5" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Medical Entry List</h2>
            {medicalEntries.length === 0 ? (
                <div>No medical entries found.</div>
            ) : (
                <table className="table table-striped">
                    <thead className='table-success'>
                        <tr>
                            <th>ID</th>
                            <th>Dependant ID</th>
                            <th>Request Amount</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>File</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalEntries.map(entry => (
                            <tr key={entry.medicalEntryId}>
                                <td>{entry.medicalEntryId}</td>
                                <td>{entry.dependantId}</td>
                                <td>{entry.requestAmount}</td>
                                <td>{entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : "N/A"}</td>
                                <td>{entry.updatedAt ? new Date(entry.updatedAt).toLocaleDateString() : "N/A"}</td>
                                <td>
                                    <a href={`/${entry.medicalEntryId}/file`} target="_blank" rel="noopener noreferrer"> View </a>
                                </td>
                                <td>{entry.status || "Pending"}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => navigate(`/edit-medical-entry/${entry.medicalEntryId}/${entry.dependantId}`)}
                                        disabled={entry.status === "REJECTED" || entry.status === "APPROVED"} 
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => handleDelete(entry.medicalEntryId)} 
                                        disabled={entry.status === "REJECTED" || entry.status === "APPROVED"}
                                        >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MedicalEntryList;