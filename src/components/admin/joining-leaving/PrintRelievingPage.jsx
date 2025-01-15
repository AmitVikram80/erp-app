import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const PrintRelievingPage = () => {
  const [printDate, setPrintDate] = useState("");
  const [printRelievingId, setPrintRelievingId] = useState({ relievingId: "" });
  const [printadminId, setPrintAdminId] = useState({ empId: "" });
  const [status, setStatus] = useState("");
  const [printJoiningId, setPrintJoiningId] = useState({ joiningId: "" });
  const [printempId, setPrintEmpId] = useState({ empId: "" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [joinreports, setJoinReports] = useState([]);
  const [relievereports, setRelieveReports] = useState([]);
  const [employees, setEmployees] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  // Handle input change for all fields
  const handlePrintDate = (e) => setPrintDate(e.target.value);
  const handlePrintRelievingId = (e) =>
    setPrintRelievingId({ relievingId: e.target.value });
  const handlePrintAdminId = (e) => setPrintAdminId({ empId: e.target.value });
  const handlePrintJoiningId = (e) =>
    setPrintJoiningId({ joiningId: e.target.value });
  const handleStatus = (e) => setStatus(e.target.value);

  const handlePrintEmpId = (e) => {
    const empId = e.target.value;
    setPrintEmpId({ empId });

    if (empId) {
      // Fetch the Relieving Report by empId
      axiosInstance
        .get(`/admin/getRelievingReportByEmpId/${empId}`)
        .then((response) => {
          const relievingReport = response.data[0];
          if (relievingReport) {
            setPrintRelievingId({ relievingId: relievingReport.relievingId });
            setFirstName(relievingReport.firstName || "");
            setLastName(relievingReport.lastName || "");
          }
        })
        .catch((error) => {
          console.error("Error fetching relieving report by empId:", error);
        });

      // Fetch the Joining Report by empId
      axiosInstance
        .get(`/admin/getJoiningReportByEmpId/${empId}`)
        .then((response) => {
          const joiningReport = response.data[0];
          if (joiningReport) {
            setPrintJoiningId({ joiningId: joiningReport.joiningId });
          }
        })
        .catch((error) => {
          console.error("Error fetching joining report by empId:", error);
        });
    }
  };

  const handleEmpFName = (e) => setFirstName(e.target.value);
  const handleEmpLName = (e) => setLastName(e.target.value);

  const navigateHome = () => navigate("/admin-dashboard/printrelieving-list");

  const createPrintRelieving = (printrelieving) => {
    return axiosInstance.post(`/admin/addPrintRelievingReport`, printrelieving);
  };

  const getPrintRelieving = (printId) => {
    return axiosInstance.get(`/admin/getPrintRelievingReportById/${printId}`);
  };

  const modifyPrintRelieving = (printId, printrelieving) => {
    return axiosInstance.put(
      `/admin/modPrintRelievingReport/${printId}`,
      printrelieving
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

  const getRelieving = (relievingId) => {
    return axiosInstance.get(`admin/getRelievingReportById/${relievingId}`);
  };

  const getAllRelieveReports = () => {
    return axiosInstance.get("/admin/rreports");
  };

  const saveRelieving = (e) => {
    e.preventDefault();
    const printrelieving = {
      printDate,
      printRelievingId,
      printadminId,
      status,
      printJoiningId,
      printempId,
      firstName,
      lastName,
    };

    const savePromise = id
      ? modifyPrintRelieving(id, printrelieving)
      : createPrintRelieving(printrelieving);

    savePromise
      .then(() => {
        if (!id) {
          // 🔥 Print the form section only without buttons
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
        }
        navigate("/admin-dashboard/printrelieving-list");
        resetForm();
      })
      .catch((error) => console.error(error));
  };

  const resetForm = () => {
    setPrintDate("");
    setPrintRelievingId("");
    setPrintAdminId("");
    setStatus("");
    setPrintJoiningId("");
    setPrintEmpId("");
    setFirstName("");
    setLastName("");
  };

  useEffect(() => {
    if (id) {
      getPrintRelieving(id)
        .then((response) => {
          const data = response.data;
          setPrintDate(data.printDate || "");
          setPrintRelievingId({
            relievingId: data.printRelievingId?.relievingId || "",
          });
          setPrintAdminId({ empId: data.printadminId?.empId || "" });
          setStatus(data.status || "");
          setPrintJoiningId({
            joiningId: data.printJoiningId?.joiningId || "",
          });
          setPrintEmpId({ empId: data.printempId?.empId || "" });
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");

          if (data.printRelievingId?.relievingId) {
            getRelieving(data.printRelievingId.relievingId).catch((error) =>
              console.error("Error fetching joining details:", error)
            );
          }

          if (data.printadminId?.empId) {
            getEmployee(data.printadminId.empId).catch((error) =>
              console.error("Error fetching employee details:", error)
            );
          }

          if (data.printJoiningId?.joiningId) {
            getJoining(data.printJoiningId.joiningId).catch((error) =>
              console.error("Error fetching joining details:", error)
            );
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
          console.error("Error fetching print relieving details:", error)
        );
    }
  }, [id]);

  useEffect(() => {
    fetchRelieveReports();
    fetchEmployees();
    fetchJoinReports();
  }, []);

  const fetchRelieveReports = async () => {
    try {
      const response = await getAllRelieveReports(); // Assuming this API gets the list of all employees
      setRelieveReports(response.data);
    } catch (error) {
      console.error("Error fetching relieve reports:", error);
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

  const fetchJoinReports = async () => {
    try {
      const response = await getAllJoinReports();
      setJoinReports(response.data);
    } catch (error) {
      console.error("Error fetching join reports:", error);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
        <div><br/></div>
          <h3 className="text-center mb-3">
            {id ? "Edit Print Relieving" : "Add Print Relieving"}
          </h3>
          <div><br/></div>
          <div className="card col-md-6">
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label className="form-label">Emp ID:</label>
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
                    value={firstName || ""}
                    placeholder="First Name"
                    readOnly
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="LastName"
                    value={lastName || ""}
                    placeholder="Last Name"
                    readOnly
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Joining ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="printJoiningId"
                    value={printJoiningId.joiningId || ""}
                    placeholder="Joining ID"
                    readOnly
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Relieving ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="printRelievingId"
                    value={printRelievingId.relievingId || ""}
                    placeholder="Relieving ID"
                    readOnly
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

                <div className="form-group mb-1">
                  <label className="form-label">Print Date:</label>
                  <input
                    type="date"
                    placeholder="Enter Print Date"
                    value={printDate}
                    onChange={handlePrintDate}
                    className="form-control"
                  />
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-success" onClick={saveRelieving}>
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
      <br />
    </div>
  );
};
export default PrintRelievingPage;
