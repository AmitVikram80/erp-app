import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const DisplayPrintJoinings = () => {
  const [printJoinings, setPrintJoinings] = useState([]); // Renamed state
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch print joinings from the server using the appropriate API
  async function showPrintJoining() {
    setLoading(true);
    setError("");
    try {
      const endpoint = searchTerm.trim()
        ? `/admin/getPrintJoiningReportByEmpId/${searchTerm}` // Adjusted API path if needed
        : "/admin/prints"; // Adjusted API path if needed
      const response = await axiosInstance.get(endpoint);
      const listPrintJoinings = response.data;
      setPrintJoinings(listPrintJoinings); // Store printJoinings in the state
    } catch (error) {
      console.error("Error fetching print joinings:", error);
      setError("Failed to fetch print joinings. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    showPrintJoining();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter print joinings when the search button is clicked
  const handleSearchClick = () => {
    showPrintJoining(); // Fetch data based on search term
  };

  // Delete print joining
  const deletePrintJoining = (printId) => {
    return axiosInstance.delete(`/admin/delPrintJoiningReport/${printId}`);
  };

  // Remove print joining from the list
  const removePrintJoining = (id) => {
    let status = confirm("Do you want to Delete the Print Joining?");
    if (status && id) {
      deletePrintJoining(id).then(() => showPrintJoining());
    }
  };

  // Navigate to edit print joining page
  const editPrintJoining = (id) => {
    navigate(`/admin-dashboard/editprintjoining/${id}`);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h3 className="text-center mt-4">Print Joining List</h3>
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
                      <th>Print Joining ID</th>
                      <th>Status</th>
                      <th>Verified By Admin ID</th>
                      <th>Print Date</th>
                      <th colSpan="2">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {printJoinings.map((printJoining) => ( // Use printJoinings
                      <tr key={printJoining.printId}>
                        <td>{printJoining.printId}</td>
                        <td>
                          {printJoining.firstName} {printJoining.lastName}
                        </td>
                        <td>
                          {printJoining.printempId
                            ? printJoining.printempId.empId
                            : "N/A"}
                        </td>
                        <td>
                          {printJoining.printJoiningId
                            ? printJoining.printJoiningId.joiningId
                            : "N/A"}
                        </td>
                        <td>{printJoining.status}</td>
                        <td>
                          {printJoining.printadminId
                            ? printJoining.printadminId.empId
                            : "N/A"}
                        </td>
                        <td>{printJoining.printDate}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => editPrintJoining(printJoining.printId)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removePrintJoining(printJoining.printId)}
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

export default DisplayPrintJoinings;
