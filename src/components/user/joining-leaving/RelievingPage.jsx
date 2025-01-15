import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../api/axiosInstance";

const RelievingPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [relievingDate, setRelievingDate] = useState("");
  const [relievingEmployee, setRelievingEmployee] = useState({ empId: "" });
  const [reladminId, setReladminId] = useState({ empId: "" });
  const [relJoiningId, setRelJoiningId] = useState({ joiningId: "" });

  //to give the dropdown of existing ids
  const [employees, setEmployees] = useState([]);
  const [joinings, setJoinings] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const handleDesignation = (e) => setDesignation(e.target.value);
  const handleReason = (e) => setReason(e.target.value);
  const handleRelievingDate = (e) => setRelievingDate(e.target.value);

  const handleRelievingEmployees = (e) => {
    const empId = e.target.value;
    setRelievingEmployee({ empId });

    if (empId) {
      axiosInstance
        .get(`/admin/getJoiningReportByEmpId/${empId}`)
        .then((response) => {
          const joiningReport = response.data[0];
          if (joiningReport) {
            const joiningId = joiningReport.joiningId;
            setRelJoiningId({ joiningId });
            setFirstName(joiningReport.firstName || "");
            setLastName(joiningReport.lastName || "");
            setDesignation(joiningReport.designation || "");
          }
        })
        .catch((error) => {
          console.error("Error fetching joining report by empId:", error);
        });
    }
  };

  const handleReladminId = (e) => setReladminId({ empId: e.target.value });

  // Navigate back to the home page
  const navigateHome = () => navigate("/user-dashboard/relieving-list");

  //Apis
  const createRelieving = (relieving) => {
    return axiosInstance.post(`/admin/addRelievingReport`, relieving);
  };
  const getRelieving = (relievingId) => {
    return axiosInstance.get(`/admin/getRelievingReportById/${relievingId}`);
  };

  const getAllEmployees = () => {
    return axiosInstance.get(`/admin/employee/all`);
  };

  const getEmployee = (employeeId) => {
    return axiosInstance.get(`/admin/employee` + "/" + employeeId);
  };

  const getJoining = (joiningId) => {
    return axiosInstance.get(`/admin/getJoiningReportById/${joiningId}`);
  };

  const getAllJoinReports = () => {
    return axiosInstance.get("/admin/reports");
  };
  //End of APIs

  // Save or update joining data
  const saveRelieving = (e) => {
    e.preventDefault();
    const relieving = {
      firstName,
      lastName,
      designation,
      status,
      reason,
      relievingDate,
      relievingEmployee, // Already an object with empId
      reladminId,
      relJoiningId,
    };

    if (id) {
      modifyRelieving(id, relieving)
        .then(() => {
          navigate("/user-dashboard/relieving-list");
          resetForm();
        })
        .catch((error) => console.error(error));
    } else {
      createRelieving(relieving)
        .then(() => {
          navigate("/user-dashboard/relieving-list");
          resetForm();
        })
        .catch((error) => console.error(error));
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDesignation("");
    setStatus("");
    setReason("");
    setRelievingDate("");
    setRelievingEmployee({});
    setReladminId("");
    setRelJoiningId("");
  };

  // Fetch joining data for editing
  useEffect(() => {
    if (id) {
      getRelieving(id)
        .then((response) => {
          const data = response.data;
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setDesignation(data.designation || "");
          setStatus(data.status || "");
          setReason(data.reason || "");
          setRelievingDate(data.relievingDate || "");
          setRelievingEmployee({ empId: data.relievingEmployee?.empId || "" });
          setReladminId({ empId: data.reladminId?.empId || "" });
          setRelJoiningId({ joiningId: data.relJoiningId?.joiningId || "" });

          // Fetch employee name using the empId of joiningEmployee
          if (data.relievingEmployee?.empId) {
            getEmployee(data.relievingEmployee.empId)
              .then((empResponse) => {
                setFirstName(empResponse.data.firstName || ""); // Set empName from Employee data
                setLastName(empResponse.data.lastName || "");
              })
              .catch((error) => {
                console.error("Error fetching employee details:", error);
              });
          }
          if (data.reladminId?.empId) {
            getEmployee(data.reladminId.empId).catch((error) => {
              console.error("Error fetching employee details:", error);
            });
          }

          if (data.relJoiningId?.joiningId) {
            getJoining(data.relJoiningId.joiningId).catch((error) => {
              console.error("Error fetching employee details:", error);
            });
          }
        })
        .catch((error) =>
          console.error("Error fetching relieving details:", error)
        );
    }
  }, [id]);

  useEffect(() => {
    fetchEmployees(); // Fetch the list of employees for the dropdown
    fetchJoinReports();
  }, []);
  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees(); // Assuming this API gets the list of all employees
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchJoinReports = async () => {
    try {
      const response = await getAllJoinReports(); // Assuming this API gets the list of all employees
      setJoinings(response.data);
    } catch (error) {
      console.error("Error fetching join reports:", error);
    }
  };

  // Change heading based on whether we're editing or adding
  const changeHeading = () => (
    <h3 className="text-center">{id ? "Edit relieving" : "Add Relieving"}</h3>
  );

  return (
    <div>
      <div className="container-fluid">
        <br/>
        <div className="row justify-content-evenly">
          {changeHeading()}
          <div className="card col-md-6 mt-4">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label className="form-label">Employee ID:</label>
                  <select
                    className="form-control"
                    name="joiningEmployee"
                    value={relievingEmployee.empId || ""}
                    onChange={handleRelievingEmployees}
                  >
                    <option value="">Select Employee Id</option>
                    {employees.map((emp) => (
                      <option key={emp.employeeId} value={emp.employeeId}>
                        {emp.employeeId}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="FirstName"
                    value={firstName}
                    readOnly
                    placeholder="First Name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Last Name"
                    value={lastName}
                    readOnly
                    placeholder="Last Name"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Joining ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="relJoiningId"
                    value={relJoiningId.joiningId || ""}
                    readOnly
                    placeholder="Joining ID"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Designation:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Designation"
                    name="designation"
                    value={designation}
                    readOnly
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Reason:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Reason"
                    name="reason"
                    value={reason}
                    onChange={handleReason}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Verified By Admin ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="reladminId"
                    value={reladminId.empId || ""}
                    onChange={handleReladminId}
                    placeholder="Enter Admin ID"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Relieving Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Relieving Date"
                    name="relievingDate"
                    value={relievingDate}
                    onChange={handleRelievingDate}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button className="btn btn-success" onClick={saveRelieving}>
                    Save
                  </button>
                  <button className="btn btn-danger" onClick={navigateHome}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelievingPage;
