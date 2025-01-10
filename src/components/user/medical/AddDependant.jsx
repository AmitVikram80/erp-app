import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';

const AddDependant = () => {
    const [form, setForm] = useState({
        dependantName: '',
        dependantAge: '',
        relationship: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const saveDependant = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/user/dependant', form);
            alert('Dependant added successfully.');
            navigate(`/user-dashboard/medical-data`);
        } catch (error) {
            console.error(error);
            alert('Failed to add dependant.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Add Dependant</h2>
            <form onSubmit={saveDependant}>
                <div className="mb-3">
                    <label htmlFor="dependantName" className="form-label">Dependant Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dependantName"
                        name="dependantName"
                        placeholder="Enter dependant name"
                        value={form.dependantName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dependantAge" className="form-label">Dependant Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="dependantAge"
                        name="dependantAge"
                        placeholder="Enter dependant age"
                        value={form.dependantAge}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="relationship" className="form-label">Relationship</label>
                    <select
                        className="form-select"
                        id="relationship"
                        name="relationship"
                        value={form.relationship}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Relationship</option>
                        <option value="SPOUSE">Spouse</option>
                        <option value="CHILD">Child</option>
                        <option value="PARENT">Parent</option>
                    </select>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(`/user-dashboard/medical-data`)} > Cancel </button>
                </div>
            </form>
        </div>
    );
};

export default AddDependant;