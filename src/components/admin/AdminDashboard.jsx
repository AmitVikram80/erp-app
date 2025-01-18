import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import AdminHeader from './AdminHeader';
import AdminHome from './AdminHome';
import EmployeeList from './employees/EmployeeList';
import AddEmployee from './employees/AddEmployee';
import UpdateEmployee from './employees/UpdateEmployee';
import DeleteEmployee from './employees/DeleteEmployee';
import PayrollList from './payroll/PayrollList';
import CalcPayroll from './payroll/CalcPayroll';
import MedicalApprovalList from './medical/MedicalApprovalList';
import MedicalApprovalForm from './medical/MedicalApprovalForm';
import DeletePayroll from './payroll/DeletePayroll';
import AddDependant from './medical/AddDependant';
import MedicalEntryList from './medical/MedicalEntryList';
import AddMedicalEntry from './medical/AddMedicalEntry';
import EditMedicalEntry from './medical/EditMedicalEntry';
import EmployeeMedicalData from './medical/EmployeeMedicalData';
import LeaveApplication from './leave/LeaveApplication';
import SanctionLeave from './leave/SanctionLeave';
import LeaveAdmin from './leave/LeaveAdmin';
import JoiningPage from './joining/JoiningPage';
import DisplayJoinings from './joining/DisplayJoinings';
import RelievingPage from './relieving/RelievingPage';
import DisplayRelievings from './relieving/DisplayRelievings';
import PrintJoiningPage from './joining/PrintJoiningPage';
import DisplayPrintJoinings from './joining/DisplayPrintJoinings';
import PrintRelievingPage from './relieving/PrintRelievingPage';
import DisplayPrintRelievings from './relieving/DisplayPrintRelievings';
import ListAttendanceComponent from './attendance/ListAttendanceComponent';
import ListBiometricComponent from './attendance/ListBiometricComponent';

const AdminDashboard = () => {
  const privateRoutes = [
    { path: '/', element: <AdminHome /> },
    { path: 'employees', element: <EmployeeList /> },
    { path: 'add-employee', element: <AddEmployee /> },
    { path: 'edit-employee', element: <UpdateEmployee /> },
    { path: 'delete-employee', element: <DeleteEmployee /> },
    { path: 'payrolls', element: <PayrollList /> },
    { path: 'calc-payroll', element: <CalcPayroll /> },
    { path: 'medical-approvals', element: <MedicalApprovalList /> },
    { path: 'approve-medical-entry', element: <MedicalApprovalForm /> },
    { path: 'delete-payroll', element: <DeletePayroll /> },
    { path: 'add-dependant', element: <AddDependant /> },
    { path: 'medical-entry-list', element: <MedicalEntryList /> },
    { path: 'add-medical-entry', element: <AddMedicalEntry /> },
    { path: 'edit-medical-entry/:medicalEntryId/:dependantId', element: <EditMedicalEntry /> },
    { path: 'emp-medical-data/:empId', element: <EmployeeMedicalData /> },
    { path: 'leave-data/:empId', element: <LeaveApplication /> },
    { path: 'sanctioned-leaves', element: <SanctionLeave /> },
    { path: 'admin-leave-data', element: <LeaveAdmin /> },
    { path: 'add-joining', element: <JoiningPage /> },
    { path: 'editjoining/:id', element: <JoiningPage /> },
    { path: 'joining-list', element: <DisplayJoinings /> },
    { path: 'add-relieving', element: <RelievingPage /> },
    { path: 'editrelieving/:id', element: <RelievingPage /> },
    { path: 'relieving-list', element: <DisplayRelievings /> },
    { path: 'add-printjoining', element: <PrintJoiningPage /> },
    { path: 'editprintjoining/:id', element: <PrintJoiningPage /> },
    { path: 'printjoining-list', element: <DisplayPrintJoinings /> },
    { path: 'add-printrelieving', element: <PrintRelievingPage /> },
    { path: 'editprintrelieving/:id', element: <PrintRelievingPage /> },
    { path: 'printrelieving-list', element: <DisplayPrintRelievings /> },
    { path: 'attendance-data', element: <ListAttendanceComponent /> },
    { path: 'bioattendance-data', element: <ListBiometricComponent /> }
  ];

  return (
    <div>
      <AdminHeader />
      <main>
        <Routes>
          {privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={<PrivateRoute>{element}</PrivateRoute>} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;