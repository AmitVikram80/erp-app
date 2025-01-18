import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HelloWorld from './home/HelloWorld';
import HelloWorld2 from './home/HelloWorld2';

const HomeRoute = () => (
    <Routes>
        <Route path="hello1" element={<HelloWorld />} />
        <Route path="hello2" element={<HelloWorld2 />} />
    </Routes>
);

export default HomeRoute
