import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const EditMedicalEntry = () => {
    const [dependantId, setDependantId] = useState("");
    const [requestAmount, setRequestAmount] = useState(0);
    const [medicalFiles, setMedicalFiles] = useState(null);
    const [dependants, setDependants] = useState([]);
    const navigate = useNavigate();
    const { medicalEntryId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const billResponse = await axiosInstance.get(`/medical-entry/medicalentryid/${medicalEntryId}`);
                const { dependantId, requestAmount } = billResponse.data;
                setDependantId(dependantId);
                setRequestAmount(requestAmount);

                const dependantsResponse = await axiosInstance.get(`/dependant/dependant/${dependantId}`);
                setDependants(dependantsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [medicalEntryId,dependantId]);

    const updateMedicalBill = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("dependantId", dependantId);
        formData.append("requestAmount", requestAmount);
        if (medicalFiles) formData.append("medicalFiles", medicalFiles);
        formData.append("medicalEntryId", medicalEntryId);

        try {
            const response = await axiosInstance.put("/medical-entry/update", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert("Medical bill updated successfully.");
                navigate(`/medical-entry-list`);
            } else {
                alert("Failed to update medical bill.");
            }
        } catch (error) {
            console.error("Error updating medical bill:", error);
            alert("Failed to update medical bill.");
        }
    };

    return (
        <div className="container mt-4 custom-container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header custom-header">
                            <h3 className="text-center">Edit Medical Bill</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateMedicalBill}>
                                <div className="form-group mb-3">
                                    <label htmlFor="dependantId">Dependant Id</label>
                                    <select
                                        className="form-select"
                                        id="dependantId"
                                        value={dependantId}
                                        onChange={(e) => setDependantId(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Dependant</option>
                                        {dependants.map(dep => (
                                            <option key={dep.dependantId} value={dep.dependantId}>
                                                {dep.dependantName} ({dep.relationship})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="requestAmount">Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="requestAmount"
                                        placeholder="Enter amount"
                                        value={requestAmount}
                                        onChange={(e) => setRequestAmount(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="medicalFiles">Upload File</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="medicalFiles"
                                        onChange={(e) => setMedicalFiles(e.target.files[0])}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-custom">Update</button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate(`/medical-entry-list`)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMedicalEntry;