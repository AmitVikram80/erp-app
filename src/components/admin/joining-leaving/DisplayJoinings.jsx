import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const DisplayJoinings = () => {
  const [joinings, setJoinings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJoinings, setFilteredJoinings] = useState([]);
  const navigate = useNavigate();

  // Fetch joinings from the server
  async function showJoining() {
    const response = await axiosInstance.get(`/admin/reports`);
    const listjoinings = response.data;
    setJoinings(listjoinings);
    setFilteredJoinings(listjoinings); // Show all joinings by default
  }

  useEffect(() => {
    showJoining();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter joinings when the search button is clicked
  const handleSearchClick = () => {
    if (searchTerm.trim() === "") {
      setFilteredJoinings(joinings); // If search term is empty, show all joinings
    } else {
      const filtered = joinings.filter((joining) =>
        joining.joiningId.toString().includes(searchTerm)
      );
      setFilteredJoinings(filtered);
    }
  };

  // Delete joining
  const deleteJoining = (joiningId) => {
    return axiosInstance.delete(`/admin/delJoiningReport/${joiningId}`);
  };

  // Remove joining from the list
  const removeJoining = (id) => {
    let status = confirm("Do you want to Delete the Joining?");
    if (status && id) {
      deleteJoining(id).then(() => showJoining());
    }
  };

  // Navigate to edit joining page
  const editJoining = (id) => {
    navigate(`/admin-dashboard/editjoining/${id}`);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h3 className="text-center mt-4">Joining List</h3>
          <div><br/></div>
          {/* Search Bar */}
          <div className="d-flex mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Joining ID"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "300px" }}
            />
            <button
              className="btn btn-primary ms-2"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>

          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Employee Name</th>
                      <th>Joining Employee</th>
                      <th>Designation</th>
                      <th>Reporting Manager</th>
                      <th>Status</th>
                      <th>Verified By Admin ID</th>
                      <th>Joining Date</th>
                      <th colSpan="2">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJoinings.map((joining) => (
                      <tr key={joining.joiningId}>
                        <td>{joining.joiningId}</td>
                        <td>
                          {joining.firstName} {joining.lastName}
                        </td>
                        <td>
                          {joining.joiningEmployee
                            ? joining.joiningEmployee.empId
                            : "N/A"}
                        </td>
                        <td>{joining.designation}</td>
                        <td>
                          {joining.reportingManager
                            ? joining.reportingManager.empId
                            : "N/A"}
                        </td>
                        <td>{joining.status}</td>
                        <td>
                          {joining.joinadminId
                            ? joining.joinadminId.empId
                            : "N/A"}
                        </td>
                        <td>{joining.dateOfJoining}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => editJoining(joining.joiningId)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeJoining(joining.joiningId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//ORIGINAL
export default DisplayJoinings;
