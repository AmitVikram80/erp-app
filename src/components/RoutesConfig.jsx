import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeList from './employees/EmployeeList';
import AddEmployee from './employees/AddEmployee';
import PayrollList from './payroll/PayrollList';
import Home from './Home';
import CalcPayroll from './payroll/CalcPayroll';
import MedicalApprovalList from './medical/MedicalApprovalList';
import MedicalApprovalForm from './medical/MedicalApprovalForm';
import UpdateEmployee from './employees/UpdateEmployee';
import DeleteEmployee from './employees/DeleteEmployee';
import DeletePayroll from './payroll/DeletePayroll';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AddDependant from './medical/AddDependant';
import MedicalEntryList from './medical/MedicalEntryList';
import AddMedicalEntry from './medical/AddMedicalEntry';
import EditMedicalEntry from './medical/EditMedicalEntry';
import LeaveApplication from './leave/LeaveApplication';
import EmployeeMedicalData from './medical/EmployeeMedicalData';
import ApplyLeave from './leave/ApplyLeave';
import ModifyLeave from './leave/ModifyLeave';
import ApplyCompensatoryLeave from './leave/ApplyCompensatoryLeave';
import CompensatoryLeave from './leave/CompensatoryLeave';
import SanctionLeave from './leave/SanctionLeave';
import LeaveAdmin from './leave/LeaveAdmin';


const RoutesConfig = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/employees" element = {<PrivateRoute> <EmployeeList /> </PrivateRoute>} />
    <Route path="/add-employee" element = {<PrivateRoute> <AddEmployee /> </PrivateRoute>} />
    <Route path="/edit-employee" element = {<PrivateRoute> <UpdateEmployee /> </PrivateRoute>} />
    <Route path='delete-employee' element = {<PrivateRoute> <DeleteEmployee /> </PrivateRoute>} />
    <Route path="/payrolls" element = {<PrivateRoute> <PayrollList /> </PrivateRoute>} />
    <Route path="/calc-payroll" element = {<PrivateRoute> <CalcPayroll /> </PrivateRoute>} />
    <Route path="/medical-approvals" element = {<PrivateRoute> <MedicalApprovalList /> </PrivateRoute>} />
    <Route path="/approve-medical-entry" element = {<PrivateRoute> <MedicalApprovalForm /> </PrivateRoute>} />
    <Route path="/delete-payroll" element = {<PrivateRoute> <DeletePayroll /> </PrivateRoute>} />
    <Route path="/add-dependant" element = {<PrivateRoute> <AddDependant /> </PrivateRoute>} />
    <Route path="/medical-entry-list" element={<PrivateRoute> <MedicalEntryList /> </PrivateRoute>} />
    <Route path="/add-medical-entry" element={<PrivateRoute> <AddMedicalEntry /> </PrivateRoute>} />
    <Route path="/edit-medical-entry/:medicalEntryId/:dependantId" element={<PrivateRoute> <EditMedicalEntry /> </PrivateRoute>} />
    <Route path="/emp-medical-data/:empId" element={<PrivateRoute> <EmployeeMedicalData /> </PrivateRoute>} />
    <Route path="/leave-data/:empId" element={<PrivateRoute> <LeaveApplication /> </PrivateRoute>} />
    <Route path="/apply-leave" element={<PrivateRoute> <ApplyLeave /> </PrivateRoute>} />
    <Route path="modify-leave" element={<PrivateRoute> <ModifyLeave /> </PrivateRoute>} />
    <Route path="apply-compensatory-leave" element={<PrivateRoute> <ApplyCompensatoryLeave /> </PrivateRoute>} />
    <Route path="compensatory-leave" element={<PrivateRoute> <CompensatoryLeave /> </PrivateRoute>} />
    <Route path="sanctioned-leaves" element={<PrivateRoute> <SanctionLeave /> </PrivateRoute>} />
    <Route path="admin-leave-data" element={<PrivateRoute> <LeaveAdmin /> </PrivateRoute>} />
  </Routes>
);

export default RoutesConfig;