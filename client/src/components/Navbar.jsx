import React from 'react'
import { Link } from 'react-router-dom';
import { GoWorkflow } from "react-icons/go";

const Navbar = () => {
    return (
        <div className='flex justify-between px-24 pt-6'>
            <Link to="/" className='font-bold flex justify-center items-center text-2xl gap-1'><GoWorkflow />Flow</Link>
            <div className='gap-4 flex'><Link to="/login" className='font-semibold text-lg'>Log in</Link>
                <Link to="/signup" className='font-semibold bg-black rounded-md text-white px-4 py-1'>Try Flow for free</Link></div>
        </div>
    )
}

export default Navbar