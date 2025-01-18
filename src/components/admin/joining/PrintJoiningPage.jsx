import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const PrintJoiningPage = () => {
  const [printDate, setPrintDate] = useState(""); // Print Date state
  const [printJoiningId, setPrintJoiningId] = useState({ joiningId: "" });
  const [printadminId, setPrintAdminId] = useState({ empId: "" });
  const [status, setStatus] = useState("");
  const [printempId, setPrintEmpId] = useState({ empId: "" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [joinReports, setJoinReports] = useState([]);

  const [employees, setEmployees] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const handlePrintDate = (e) => setPrintDate(e.target.value);
  const handleStatus = (e) => setStatus(e.target.value);
  const navigateHome = () => navigate("/admin-dashboard/printjoining-list");
  const handlePrintAdminId = (e) => {
    const empId = e.target.value;
    setPrintAdminId({ empId });
  };

  const handlePrintEmpId = (e) => {
    const empId = e.target.value;
    setPrintEmpId({ empId });

    if (empId) {
      axiosInstance
        .get(`/admin/getJoiningReportByEmpId/${empId}`)
        .then((response) => {
          const joiningReport = response.data[0];
          if (joiningReport) {
            const joiningId = joiningReport.joiningId;
            setPrintJoiningId({ joiningId });
            setFirstName(joiningReport.firstName || "");
            setLastName(joiningReport.lastName || "");
          }
        })
        .catch((error) => {
          console.error("Error fetching joining report by empId:", error);
        });
    }
  };

  //APIs
  const createPrintJoining = (printjoining) => {
    return axiosInstance.post(`/admin/addPrintJoiningReport`, printjoining);
  };

  const getPrintJoining = (printId) => {
    return axiosInstance.get(`/admin/getPrintJoiningReportById/${printId}`);
  };

  const modifyPrintJoining = (printId, printjoining) => {
    return axiosInstance.put(
      `/admin/modPrintJoiningReport/${printId}`,
      printjoining
    );
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

  const savePrintJoining = (e) => {
    e.preventDefault();
    const printjoining = {
      printDate,
      printJoiningId,
      printadminId,
      status,
      printempId,
      firstName,
      lastName,
    };

    if (id) {
      modifyPrintJoining(id, printjoining)
        .then(() => {
          navigate("/admin-dashboard/printjoining-list");
          resetForm();
        })
        .catch((error) => console.error(error));
    } else {
      createPrintJoining(printjoining)
        .then(() => {
          navigate("/admin-dashboard/printjoining-list"); // Navigate after saving
          const formContents = document.querySelector("form").innerHTML;

          // Remove buttons from formContents
          const formWithoutButtons = formContents.replace(
            /<button[^>]*>.*?<\/button>/g,
            ""
          );

          // Open a new print window
          const printWindow = window.open("", "", "height=600,width=800");
          printWindow.document.write(`
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        h3 {
          text-align: center;
          color: #333;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
      </style>
    </head>
    <body>
      <h3>Relieving Form Details</h3>
      ${formWithoutButtons}
    </body>
  </html>
`);

          printWindow.print();
          resetForm();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const resetForm = () => {
    setPrintDate("");
    setPrintJoiningId("");
    setPrintAdminId("");
    setStatus("");
    setPrintEmpId("");
    setFirstName("");
    setLastName("");
  };

  // Fetch print joining data for editing
  useEffect(() => {
    if (id) {
      getPrintJoining(id)
        .then((response) => {
          const data = response.data;
          setPrintDate(data.printDate || "");
          setPrintJoiningId({
            joiningId: data.printJoiningId?.joiningId || "",
          });
          setPrintAdminId({ empId: data.printadminId?.empId || "" });
          setStatus(data.status || "");
          setPrintEmpId({ empId: data.printempId?.empId || "" });
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");

          // Fetch joining data using the joiningId
          if (data.printJoiningId?.joiningId) {
            getJoining(data.printJoiningId.joiningId)
              .then(() => {})
              .catch((error) => {
                console.error("Error fetching joining details:", error);
              });
          }

          // Fetch admin data using the adminId
          if (data.printadminId?.empId) {
            getEmployee(data.printadminId.empId)
              .then(() => {})
              .catch((error) => {
                console.error("Error fetching admin details:", error);
              });
          }

          if (data.printempId?.empId) {
            //as we r fetching empname instead of empid we need to follow this
            getEmployee(data.printempId.empId)
              .then((emp) => {
                setFirstName(emp.data.firstName || "");
                setLastName(emp.data.lastName || "");
              })
              .catch((error) => {
                console.error("Error fetching employee details:", error);
              });
          }
        })
        .catch((error) =>
          console.error("Error fetching print joining details:", error)
        );
    }
  }, [id]);

  useEffect(() => {
    fetchJoinReports();
    fetchEmployees();
  }, []);

  const fetchJoinReports = async () => {
    try {
      const response = await getAllJoinReports();
      setJoinReports(response.data);
    } catch (error) {
      console.error("Error fetching join reports:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  // Change heading based on whether we're editing or adding
  const changeHeading = () => (
    <h3 className="text-center">
      {id ? "Edit Print Joining" : "Add Print Joining"}
    </h3>
  );

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
        <div><br/></div>
          {changeHeading()}
          <div><br/></div>
          <div className="card col-md-6">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label className="form-label">Emp Id:</label>
                  <select
                    className="form-control"
                    name="printempId"
                    value={printempId.empId || ""}
                    onChange={handlePrintEmpId}
                  >
                    <option value="">Select Emp Id</option>
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
                    readOnly // Make it readonly
                    placeholder="Enter First Name" // Add placeholder
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Last Name"
                    value={lastName}
                    readOnly // Make it readonly
                    placeholder="Enter Last Name" // Add placeholder
                  />
                </div>

                {/* Joining ID */}
                <div className="form-group mb-3">
                  <label className="form-label">Joining ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="printJoiningId"
                    value={printJoiningId.joiningId || ""}
                    readOnly // Make it readonly
                    placeholder="Enter Joining ID" // Add placeholder
                  />
                </div>

                {/* Status */}
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

                {/* Admin ID */}
                <div className="form-group mb-3">
                  <label className="form-label">Verified By Admin ID:</label>
                  <select
                    className="form-control"
                    name="printAdminId"
                    value={printadminId.empId || ""}
                    onChange={handlePrintAdminId}
                  >
                    <option value="">Select Admin</option>
                    {employees.map((emp) => (
                      <option key={emp.employeeId} value={emp.employeeId}>
                        {emp.employeeId}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Print Date */}
                <div className="form-group mb-3">
                  <label className="form-label">Print Date:</label>
                  <input
                    type="date"
                    placeholder="Enter Print Date"
                    name="printDate"
                    value={printDate}
                    onChange={handlePrintDate}
                    className="form-control"
                  />
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-success"
                    style={{ border: "solid rgba(199, 209, 212, 0.5) 1px" }}
                    onClick={savePrintJoining}
                  >
                    {id ? "Save" : "Save & Print"}
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

export default PrintJoiningPage;
