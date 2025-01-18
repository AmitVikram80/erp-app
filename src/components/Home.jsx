import React from 'react';
import Header from './Header';
import HomeRoute from './HomeRoute';

const Home = () => (
    <div>
        <Header />
        <main>
            <h2>Welcome to the Home Page</h2>
            <HomeRoute />
        </main>
    </div>
);

export default Home;