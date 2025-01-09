import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader';
import EmployeeProfile from './EmployeeProfile';
import EmployeeTasks from './EmployeeTasks';




const EmployeeDashboard = () => (
  <div>
    <EmployeeHeader />
    <main>
      <Routes>
        <Route path="profile" element={<EmployeeProfile />} />
        <Route path="tasks" element={<EmployeeTasks />} />
      </Routes>
    </main>
  </div>
);

export default EmployeeDashboard;