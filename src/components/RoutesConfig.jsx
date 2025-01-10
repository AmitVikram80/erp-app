import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './user/UserDashboard';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
    <Route path="/user-dashboard/*" element={<UserDashboard />} />
  </Routes>
);

export default RoutesConfig;