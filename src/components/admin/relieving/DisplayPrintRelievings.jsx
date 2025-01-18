import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const DisplayPrintRelievings = () => {
  const [printRelievings, setPrintRelievings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch print relievings from the server using the appropriate API
  async function showPrintRelieving() {
    setLoading(true);
    setError("");
    try {
      const endpoint = searchTerm.trim()
        ? `/admin/getPrintRelievingReportByEmpId/${searchTerm}` // Adjusted API path if needed
        : "/admin/rprints"; // Adjusted API path if needed
      const response = await axiosInstance.get(endpoint);
      const listPrintRelievings = response.data;
      setPrintRelievings(listPrintRelievings); // Store printRelievings in the state
    } catch (error) {
      console.error("Error fetching print relievings:", error);
      setError("Failed to fetch print relievings. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    showPrintRelieving();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter print relievings when the search button is clicked
  const handleSearchClick = () => {
    showPrintRelieving(); // Fetch data based on search term
  };

  // Delete print relieving
  const deletePrintRelieving = (printId) => {
    return axiosInstance.delete(`/admin/delPrintRelievingReport/${printId}`);
  };

  // Remove print relieving from the list
  const removePrintRelieving = (id) => {
    let status = confirm("Do you want to Delete the Relieving?");
    if (status && id) {
      deletePrintRelieving(id).then(() => showPrintRelieving());
    }
  };

  // Navigate to edit print relieving page
  const editPrintRelieving = (id) => {
    navigate(`/admin-dashboard/editprintrelieving/${id}`);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h3 className="text-center mt-4">Print Relieving List</h3>
          <div><br /></div>
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
                      <th>Relieving ID</th>
                      <th>Status</th>
                      <th>Verified By Admin ID</th>
                      <th>Print Date</th>
                      <th colSpan="2">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {printRelievings.map((printRelieving) => (
                      <tr key={printRelieving.printId}>
                        <td>{printRelieving.printId}</td>
                        <td>
                          {printRelieving.firstName} {printRelieving.lastName}
                        </td>
                        <td>
                          {printRelieving.printempId
                            ? printRelieving.printempId.empId
                            : "N/A"}
                        </td>
                        <td>
                          {printRelieving.printJoiningId
                            ? printRelieving.printJoiningId.joiningId
                            : "N/A"}
                        </td>
                        <td>
                          {printRelieving.printRelievingId
                            ? printRelieving.printRelievingId.relievingId
                            : "N/A"}
                        </td>
                        <td>{printRelieving.status}</td>
                        <td>
                          {printRelieving.printadminId
                            ? printRelieving.printadminId.empId
                            : "N/A"}
                        </td>
                        <td>{printRelieving.printDate}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => editPrintRelieving(printRelieving.printId)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removePrintRelieving(printRelieving.printId)}
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

export default DisplayPrintRelievings;
