import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const DisplayJoinings = () => {
  const [joinings, setJoinings] = useState([]);
  const [filteredJoinings, setFilteredJoinings] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const navigate = useNavigate();

  // Fetch joinings and filter based on the logged-in employee
  const fetchJoinings = async (employeeId) => {
    try {
      const response = await axiosInstance.get(`/user/getJoiningReport`);
      const filtered = response.data;

      setJoinings(filtered);
      setFilteredJoinings(filtered);
    } catch (error) {
      console.error("Error fetching joinings", error);
    }
  };

  useEffect(() => {
    fetchJoinings();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
        <h3 className="text-center mt-4">
  {filteredJoinings.length > 0 && `Joining Report - ${filteredJoinings[0].firstName} ${filteredJoinings[0].lastName} `}
</h3>


          <div><br/></div>

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

export default DisplayJoinings;
