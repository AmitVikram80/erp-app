import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeHeader from './UserHeader';
import EmployeeProfile from './employee/EmployeeProfile';
import EmployeeTasks from './employee/EmployeeTasks';
import UserHome from './UserHome';
import AddDependant from './medical/AddDependant';
import MedicalData from './medical/MedicalData';
import AddMedicalEntry from './medical/AddMedicalEntry';


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
      </Routes>
    </main>
  </div>
);

export default UserDashboard;