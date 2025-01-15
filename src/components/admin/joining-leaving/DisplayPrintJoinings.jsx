import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const DisplayPrintJoinings = () => {
  const [printJoinings, setPrintJoinings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrintJoinings, setFilteredPrintJoinings] = useState([]);
  const navigate = useNavigate();

  // Fetch print joinings from API
  async function showPrintJoining() {
    const response = await axiosInstance.get(`/admin/prints`);
    const listPrintJoinings = response.data;
    setPrintJoinings(listPrintJoinings);
    setFilteredPrintJoinings(listPrintJoinings); // Initialize with all records
  }

  useEffect(() => {
    showPrintJoining();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter print joinings based on search term
  const handleSearch = () => {
    if (searchTerm) {
      const result = printJoinings.filter((printJoining) =>
        printJoining.printId.toString().includes(searchTerm)
      );
      setFilteredPrintJoinings(result);
    } else {
      setFilteredPrintJoinings(printJoinings); // Reset to all records if search term is empty
    }
  };

  // Delete print joining
  const deletePrintJoining = (printId) => {
    return axiosInstance.delete(`/admin/delPrintJoiningReport/${printId}`);
  };

  // Remove print joining from the list
  const removePrintJoining = (id) => {
    let status = confirm("Do you want to Delete the Print Joining?");
    if (status) {
      deletePrintJoining(id).then(() => {
        showPrintJoining();
      });
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
              placeholder="Search by Print ID"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "300px", marginRight: "10px" }}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
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
                      <th>Employee ID</th>
                      <th>Print Joining ID</th>
                      <th>Status</th>
                      <th>Verified By Admin ID</th>
                      <th>Print Date</th>
                      <th colSpan="2">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrintJoinings.map((printJoining) => (
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
                            onClick={() =>
                              editPrintJoining(printJoining.printId)
                            }
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              removePrintJoining(printJoining.printId)
                            }
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
