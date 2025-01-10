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
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;