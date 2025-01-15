import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeHeader from './UserHeader';
import PrivateRoute from '../PrivateRoute';
import EmployeeProfile from './employee/EmployeeProfile';
import EmployeeTasks from './employee/EmployeeTasks';
import UserHome from './UserHome';
import AddDependant from './medical/AddDependant';
import MedicalData from './medical/MedicalData';
import AddMedicalEntry from './medical/AddMedicalEntry';
import EditMedicalEntry from './medical/EditMedicalEntry';
import ApplyLeave from './leave/ApplyLeave';
import ModifyLeave from './leave/ModifyLeave';
import ApplyCompensatoryLeave from './leave/ApplyCompensatoryLeave';
import LeaveApplication from './leave/LeaveApplication';
import CompensatoryLeave from './leave/CompensatoryLeave';
import DisplayJoinings from './joining-leaving/DisplayJoinings'
import DisplayRelievings from './joining-leaving/DisplayRelievings'
import RelievingPage from './joining-leaving/RelievingPage'


const UserDashboard = () => (
  <div>
    <EmployeeHeader />
    <main>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="profile" element={<EmployeeProfile />} />
        <Route path="tasks" element={<EmployeeTasks />} />
        <Route path='add-dependant' element={<AddDependant />} />
        <Route path='medical-data' element={<MedicalData />} />
        <Route path='add-medical-entry' element={<AddMedicalEntry />} />
        <Route path='edit-medical-entry/:medicalEntryId/:dependantId' element={<EditMedicalEntry />} />
        
        <Route path="apply-leave" element={<PrivateRoute> <ApplyLeave /> </PrivateRoute>} />
        <Route path="modify-leave" element={<PrivateRoute> <ModifyLeave /> </PrivateRoute>} />
        <Route path="apply-compensatory-leave" element={<PrivateRoute> <ApplyCompensatoryLeave /> </PrivateRoute>} />
        <Route path="leave-data" element={<PrivateRoute> <LeaveApplication /> </PrivateRoute>} />
        <Route path="compensatory-leave" element={<PrivateRoute> <CompensatoryLeave /> </PrivateRoute>} />

        <Route path="joining-list" element={<PrivateRoute> < DisplayJoinings/> </PrivateRoute>} />
        <Route path="relieving-list" element={<PrivateRoute> < DisplayRelievings/> </PrivateRoute>} />
        <Route path="add-relieving" element={<PrivateRoute> < RelievingPage/> </PrivateRoute>} />

      </Routes>
    </main>
  </div>
);

export default UserDashboard;