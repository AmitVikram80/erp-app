import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const DisplayPrintRelievings = () => {
  const [printRelievings, setPrintRelievings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrintRelievings, setFilteredPrintRelievings] = useState([]);
  const navigate = useNavigate();

  // Fetch print relievings from API
  async function showPrintRelieving() {
    const response = await axiosInstance.get("/admin/rprints");
    const listPrintRelievings = response.data;
    setPrintRelievings(listPrintRelievings);
    setFilteredPrintRelievings(listPrintRelievings); // Initialize with all records
  }

  useEffect(() => {
    showPrintRelieving();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter print relievings based on search term
  const handleSearch = () => {
    if (searchTerm) {
      const result = printRelievings.filter((printRelieving) =>
        printRelieving.printId.toString().includes(searchTerm)
      );
      setFilteredPrintRelievings(result);
    } else {
      setFilteredPrintRelievings(printRelievings); // Reset to all records if search term is empty
    }
  };

  const deletePrintRelieving = (printId) => {
    return axiosInstance.delete(`admin/delPrintRelievingReport/${printId}`);
  };

  const removePrintRelieving = (id) => {
    let status = confirm("Do you want to Delete the Relieving?");
    if (status) {
      if (id) {
        deletePrintRelieving(id).then(() => {
          showPrintRelieving();
        });
      }
    }
  };

  const editPrintRelieving = (id) => {
    navigate(`/admin-dashboard/editprintrelieving/${id}`);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h3 className="text-center mt-3">Print Relieving List</h3>
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
                      <th>Joining ID</th>
                      <th>Relieving ID</th>
                      <th>Status</th>
                      <th>Verified By Admin ID</th>
                      <th>Print Date</th>
                      <th colSpan="2">Operations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrintRelievings.map((printRelieving) => (
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
                            onClick={() =>
                              editPrintRelieving(printRelieving.printId)
                            }
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              removePrintRelieving(printRelieving.printId)
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

export default DisplayPrintRelievings;
