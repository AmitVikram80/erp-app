import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const DisplayRelievings = () => {
  const [relievings, setRelievings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRelievings, setFilteredRelievings] = useState([]);
  const navigate = useNavigate();

  // Fetch relievings from the server
  async function showRelieving() {
    const response = await axiosInstance.get("/admin/rreports");
    const listRelievings = response.data;
    setRelievings(listRelievings);
    setFilteredRelievings(listRelievings); // Show all relievings by default
  }

  useEffect(() => {
    showRelieving();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter relievings when the search button is clicked
  const handleSearchClick = () => {
    if (searchTerm.trim() === "") {
      setFilteredRelievings(relievings); // If search term is empty, show all relievings
    } else {
      const filtered = relievings.filter((relieving) =>
        relieving.relievingId.toString().includes(searchTerm)
      );
      setFilteredRelievings(filtered);
    }
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
              placeholder="Search by Relieving ID"
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
                    {filteredRelievings.map((relieving) => (
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
                        <td>{relieving.status ? relieving.status : 'Pending'}</td>
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
                            onClick={() =>
                              removeRelieving(relieving.relievingId)
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

export default DisplayRelievings;
