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
  return (
    <div>
      <AdminHeader />
      <main>
        <Routes>
          <Route path='/' element={<AdminHome />} />
          <Route path='employees' element={<EmployeeList />} />
          <Route path="add-employee" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
          <Route path="edit-employee" element={<PrivateRoute><UpdateEmployee /></PrivateRoute>} />
          <Route path="delete-employee" element={<PrivateRoute><DeleteEmployee /></PrivateRoute>} />
          <Route path="payrolls" element={<PrivateRoute><PayrollList /></PrivateRoute>} />
          <Route path="calc-payroll" element={<PrivateRoute><CalcPayroll /></PrivateRoute>} />
          <Route path="medical-approvals" element={<PrivateRoute><MedicalApprovalList /></PrivateRoute>} />
          <Route path="approve-medical-entry" element={<PrivateRoute><MedicalApprovalForm /></PrivateRoute>} />
          <Route path="delete-payroll" element={<PrivateRoute><DeletePayroll /></PrivateRoute>} />
          <Route path="add-dependant" element={<PrivateRoute><AddDependant /></PrivateRoute>} />
          <Route path="medical-entry-list" element={<PrivateRoute><MedicalEntryList /></PrivateRoute>} />
          <Route path="add-medical-entry" element={<PrivateRoute><AddMedicalEntry /></PrivateRoute>} />
          <Route path="edit-medical-entry/:medicalEntryId/:dependantId" element={<PrivateRoute><EditMedicalEntry /></PrivateRoute>} />
          <Route path="emp-medical-data/:empId" element={<PrivateRoute><EmployeeMedicalData /></PrivateRoute>} />
          <Route path="leave-data/:empId" element={<PrivateRoute> <LeaveApplication /> </PrivateRoute>} />
          <Route path="sanctioned-leaves" element={<PrivateRoute> <SanctionLeave /> </PrivateRoute>} />
          <Route path="admin-leave-data" element={<PrivateRoute> <LeaveAdmin /> </PrivateRoute>} />
          <Route path='add-joining' element={<PrivateRoute> <JoiningPage /></PrivateRoute>} />
          <Route path='editjoining/:id' element={<PrivateRoute> <JoiningPage /></PrivateRoute>} />
          <Route path='joining-list' element={<PrivateRoute> <DisplayJoinings /></PrivateRoute>} />
          <Route path='add-relieving' element={<PrivateRoute> <RelievingPage /></PrivateRoute>} />
          <Route path='editrelieving/:id' element={<PrivateRoute> <RelievingPage /></PrivateRoute>} />
          <Route path='relieving-list' element={<PrivateRoute> <DisplayRelievings /></PrivateRoute>} />
          <Route path='add-printjoining' element={<PrivateRoute> <PrintJoiningPage /></PrivateRoute>} />
          <Route path='editprintjoining/:id' element={<PrivateRoute> <PrintJoiningPage /></PrivateRoute>} />
          <Route path='printjoining-list' element={<PrivateRoute> <DisplayPrintJoinings /></PrivateRoute>} />
          <Route path='add-printrelieving' element={<PrivateRoute> <PrintRelievingPage /></PrivateRoute>} />
          <Route path='editprintrelieving/:id' element={<PrivateRoute> <PrintRelievingPage /></PrivateRoute>} />
          <Route path='printrelieving-list' element={<PrivateRoute> <DisplayPrintRelievings /></PrivateRoute>} />

          <Route path='attendance-data' element={<PrivateRoute> <ListAttendanceComponent /> </PrivateRoute>} />
          <Route path='bioattendance-data' element={<PrivateRoute> <ListBiometricComponent /> </PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;