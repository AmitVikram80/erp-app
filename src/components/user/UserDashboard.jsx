import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeHeader from './UserHeader';
import PrivateRoute from '../PrivateRoute';
import EmployeeProfile from './employee/EmployeeProfile';
import EmployeeTasks from './employee/EmployeeTasks';
import UserHome from './UserHome';
import AddDependant from './medical/AddDependant';
import MedicalData from './medical/MedicalData';
import MedicalEntryForm from './medical/MedicalEntryForm';
import ApplyLeave from './leave/ApplyLeave';
import ModifyLeave from './leave/ModifyLeave';
import ApplyCompensatoryLeave from './leave/ApplyCompensatoryLeave';
import LeaveApplication from './leave/LeaveApplication';
import CompensatoryLeave from './leave/CompensatoryLeave';
import DisplayJoinings from './joining/DisplayJoinings'
import AddAttendanceComponent from './attendance/AddAttendanceComponent';
import ListAttendanceComponent from './attendance/ListAttendanceComponent';
import AddBiometricComponent from './attendance/AddBiometricComponent';
import ListBiometricComponent from './attendance/ListBiometricComponent';

const UserDashboard = () => {
  const routes = [
    { path: "/", element: <UserHome /> },
    { path: "profile", element: <EmployeeProfile /> },
    { path: "tasks", element: <EmployeeTasks /> },
    { path: "add-dependant", element: <AddDependant /> },
    { path: "medical-data", element: <MedicalData /> },
    { path: "add-medical-entry", element: <MedicalEntryForm isEdit={false}  /> },
    { path: "edit-medical-entry/:medicalEntryId", element: <MedicalEntryForm isEdit={true}  /> },
    { path: "apply-leave", element: <ApplyLeave /> },
    { path: "modify-leave", element: <ModifyLeave /> },
    { path: "apply-compensatory-leave", element: <ApplyCompensatoryLeave /> },
    { path: "leave-data", element: <LeaveApplication /> },
    { path: "compensatory-leave", element: <CompensatoryLeave /> },
    { path: "joining-list", element: <DisplayJoinings /> },
    { path: "createattendance", element: <AddAttendanceComponent /> },
    { path: "attendances", element: <ListAttendanceComponent /> },
    { path: "editattendance/:id", element: <AddAttendanceComponent /> },
    { path: "createbioattendance", element: <AddBiometricComponent /> },
    { path: "bioattendances", element: <ListBiometricComponent /> }
  ];

  return (
    <div>
      <EmployeeHeader />
      <main>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={<PrivateRoute>{element}</PrivateRoute>} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default UserDashboard;