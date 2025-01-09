import React from 'react'
import { Routes, Route } from 'react-router-dom';

const HomeRoute = () => (
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
);

export default HomeRoute
