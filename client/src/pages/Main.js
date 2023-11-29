// Main.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components';

const Main = () => {
    return (
        <div className='bg-white flex'>
            <Sidebar />
            <div className="flex-grow p-4 rounded-lg">

                <Outlet />
            </div>
        </div>
    );
}

export default Main;
