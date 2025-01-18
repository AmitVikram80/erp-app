import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const DisplayRelievings = () => {
  const [relievings, setRelievings] = useState([]); // State for storing all relievings
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Navigation hook

  // Fetch relievings from the server using the appropriate API
  async function showRelieving() {
    setLoading(true);
    setError(""); // Clear error message before fetching
    try {
      const endpoint = searchTerm.trim()
        ? `/admin/getRelievingReportByEmpId/${searchTerm}` // Fetch by search term if available
        : "/admin/rreports"; // Fetch all relievings if no search term
      const response = await axiosInstance.get(endpoint);
      setRelievings(response.data); // Store the response data (relievings) in state
    } catch (error) {
      console.error("Error fetching relievings:", error);
      setError("Failed to fetch relievings. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    showRelieving(); // Fetch data when the component mounts or searchTerm changes
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term
  };

  // Filter relievings when the search button is clicked
  const handleSearchClick = () => {
    showRelieving(); // Fetch data based on search term
  };

  // Delete relieving
  const deleteRelieving = (relievingId) => {
    return axiosInstance.delete(`/admin/delRelievingReport/${relievingId}`);
  };

  // Remove relieving from the list
  const removeRelieving = (id) => {
    let status = confirm("Do you want to Delete the Relieving?");
    if (status && id) {
      deleteRelieving(id).then(() => showRelieving());
    }
  };

  // Navigate to edit relieving page
  const editRelieving = (id) => {
    navigate(`/admin-dashboard/editrelieving/${id}`);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h3 className="text-center mt-4">Relieving List</h3>
          <div><br/></div>
          {/* Search Bar */}
          <div className="d-flex mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Employee ID"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "300px" }}
            />
            <button
              className="btn btn-primary ms-2"
              onClick={handleSearchClick}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Employee Name</th>
                      <th>Employee ID</th>
                      <th>Joining ID</th>
                      <th>Designation</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Verified By Admin ID</th>
                      <th>Relieving Date</th>
                      <th colSpan="2">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relievings.map((relieving) => (
                      <tr key={relieving.relievingId}>
                        <td>{relieving.relievingId}</td>
                        <td>
                          {relieving.firstName} {relieving.lastName}
                        </td>
                        <td>
                          {relieving.relievingEmployee
                            ? relieving.relievingEmployee.empId
                            : "N/A"}
                        </td>
                        <td>
                          {relieving.relJoiningId
                            ? relieving.relJoiningId.joiningId
                            : "N/A"}
                        </td>
                        <td>{relieving.designation}</td>
                        <td>{relieving.reason}</td>
                        <td>
                          {relieving.status ? relieving.status : "Pending"}
                        </td>
                        <td>
                          {relieving.reladminId
                            ? relieving.reladminId.empId
                            : "N/A"}
                        </td>
                        <td>{relieving.relievingDate}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => editRelieving(relieving.relievingId)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeRelieving(relieving.relievingId)}
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

export default DisplayRelievings;
