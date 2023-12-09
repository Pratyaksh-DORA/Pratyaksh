import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Header } from '../components';

const Main = () => {
    return (
        <div className='bg-white flex'>

            <Sidebar />
            <div className="w-full  rounded-lg  page-content flex-grow">
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default Main;
