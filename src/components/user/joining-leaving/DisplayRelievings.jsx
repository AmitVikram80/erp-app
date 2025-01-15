import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const DisplayRelievings = () => {
  const [relievings, setRelievings] = useState([]);
  const [error, setError] = useState(null);

  // Fetch relieving records for the logged-in employee
  const fetchRelievings = async () => {
    try {
      const response = await axiosInstance.get(`/user/getRelievingReport`);
      const filteredRelievings = response.data;
      setRelievings(filteredRelievings);
    } catch (error) {
      console.error("Error fetching relieving records", error);
      setError("Failed to fetch relieving data.");
    }
  };

  // Fetch data on component load
  useEffect(() => {
    fetchRelievings();
  }, []);


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
        <h3 className="text-center mt-4">
  {relievings.length > 0 && ` Relieving Report - ${relievings[0].firstName} ${relievings[0].lastName}`}
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
                      <th>Employee ID</th>
                      <th>Joining ID</th>
                      <th>Status</th>
                      <th>Verified By Admin ID</th>
                      <th>Validation Date</th>
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
                        <td>{relieving.status ? relieving.status : 'Pending'}</td>


                        <td>
                          {relieving.reladminId
                            ? relieving.reladminId.empId
                            : "N/A"}
                        </td>
                        <td>{relieving.relievingDate}</td>
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
