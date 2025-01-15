import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const JoiningPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [joiningEmployee, setJoiningEmployee] = useState({ empId: "" });
  const [joinadminId, setJoinadminId] = useState({ empId: "" }); //all are page state vars
  const [reportingManager, setReportingManager] = useState({ empId: "" });
  const [employees, setEmployees] = useState([]); //To get Drop down

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDesignation = (e) => setDesignation(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const handleDateOfJoining = (e) => setDateOfJoining(e.target.value);

  const handleJoiningEmployees = async (e) => {
    const empId = e.target.value;
    setJoiningEmployee({ empId });

    if (empId) {
      try {
        const response = await axiosInstance.get(`/admin/employee/${empId}`);
        const { firstName, lastName,empDesignation } = response.data;
        setFirstName(firstName || "");
        setLastName(lastName || "");
        setDesignation(empDesignation || " ")

      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    } else {
      setFirstName("");
      setLastName("");
    }
  };
  const handleJoinadminId = (e) => setJoinadminId({ empId: e.target.value });
  const handleReportingManager = (e) => {
    const empId = e.target.value;
    setReportingManager({ empId });
  };

  const navigateHome = () => navigate("/admin-dashboard/joining-list");

  //APIs

  const createJoining = (joining) => {
    return axiosInstance.post(`/admin/addJoiningReport`, joining);
  };

  const getJoining = (joiningId) => {
    return axiosInstance.get(`/admin/getJoiningReportById/${joiningId}`);
  };

  const modifyJoining = (joiningId, joining) => {
    return axiosInstance.put(`/admin/modJoiningReport/${joiningId}`, joining);
  };

  const getAllEmployees = () => {
    return axiosInstance.get(`/admin/employee/all`);
  };

  const getEmployee = (employeeId) => {
    return axiosInstance.get(`/admin/employee` + "/" + employeeId);
  };
  //End of APIs

  const saveJoining = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    const joining = {
      firstName,
      lastName,
      designation,
      status,
      dateOfJoining,
      joiningEmployee,
      joinadminId,
      reportingManager,
    };

    if (id) {
      modifyJoining(id, joining)
        .then(() => {
          navigate("/admin-dashboard/joining-list");
          resetForm();
        })
        .catch((error) => console.error(error));
    } else {
      createJoining(joining)
        .then(() => {
          navigate("/admin-dashboard/joining-list");
        })
        .catch((error) => console.error(error));
    }
  };

  // Fetch joining data for editing
  useEffect(() => {
    if (id) {
      getJoining(id)
        .then((response) => {
          const data = response.data;
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setDesignation(data.designation || "");
          setStatus(data.status || "");
          setDateOfJoining(data.dateOfJoining || "");
          setJoiningEmployee({ empId: data.joiningEmployee?.empId || "" });
          setJoinadminId({ empId: data.joinadminId?.empId || "" });
          setReportingManager({ empId: data.reportingManager?.empId || "" });

          // Fetch employee name using the empId of joiningEmployee
          if (data.joiningEmployee?.empId) {
            getEmployee(data.joiningEmployee.empId)
              .then((empResponse) => {
                setFirstName(empResponse.data.firstName || ""); // Set empName from Employee data
                setLastName(empResponse.data.lastName || "");
              })
              .catch((error) => {
                console.error("Error fetching employee details:", error);
              });
          }

          // Fetch admin id for editing
          if (data.joinadminId?.empId) {
            getEmployee(data.joinadminId.empId).catch((error) => {
              console.error("Error fetching emp details:", error);
            });
          }
          if (data.reportingManager?.empId) {
            getEmployee(data.reportingManager.empId).catch((error) => {
              console.error("Error fetching employee details:", error);
            });
          }
        })
        .catch((error) =>
          console.error("Error fetching joining details:", error)
        );
    }
  }, [id]);

  // Fetch all employees for the dropdown
  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees(); // Assuming this API gets the list of all employees
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch joinings when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Change heading based on whether we're editing or adding
  const changeHeading = () => (
    <h3 className="text-center">{id ? "Edit Joining" : "Add Joining"}</h3>
  );

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-evenly">
        <div><br/></div>
          {changeHeading()}
          <div className="card col-md-6 mt-4">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label className="form-label">Employee ID:</label>
                  <select
                    className="form-control"
                    name="joiningEmployee"
                    value={joiningEmployee.empId || ""}
                    onChange={handleJoiningEmployees}
                  >
                    <option value="">Select Employee ID</option>
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
                    name="LastName"
                    value={lastName}
                    readOnly
                    placeholder="Last Name"
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
                  <label className="form-label">Reporting Manager ID:</label>
                  <select
                    className="form-control"
                    name="reportingManager"
                    value={reportingManager.empId || ""}
                    onChange={handleReportingManager}
                  >
                    <option value="">Select Manager</option>
                    {employees.map((emp) => (
                      <option key={emp.employeeId} value={emp.employeeId}>
                        {emp.employeeId}
                      </option>
                    ))}
                  </select>
                </div>

                

                <div className="form-group mb-3">
                  <label className="form-label">Status:</label>
                  <select
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={handleStatus}
                  >
                    <option value="">Select Status</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Verified By Admin ID:</label>
                  <select
                    className="form-control"
                    name="joinadminId"
                    value={joinadminId.empId || ""}
                    onChange={handleJoinadminId}
                  >
                    <option value="">Select Admin Id</option>
                    {employees.map((emp) => (
                      <option key={emp.employeeId} value={emp.employeeId}>
                        {emp.employeeId}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Joining Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Join Date"
                    name="joiningDate"
                    value={dateOfJoining}
                    onChange={handleDateOfJoining}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button className="btn btn-success" onClick={saveJoining}>
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

export default JoiningPage;
//ORIGINAL
