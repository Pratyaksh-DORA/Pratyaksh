import React from 'react'
import { Navbar } from "../components"
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const Landing = () => {

  return (
    <>
      <Navbar />
      <div className='bg-secondary mt-48 flex flex-col justify-center items-center'>
        <div className='flex justify-center items-center flex-col gap-5 max-w-3xl'>
          <h1 className='text-6xl font-bold'>Plan, Collaborate, Achieve.</h1>
          <p className='font-semibold text-2xl text-center'>Flow is a Agile Workspace for Seamless Collaboration and Accelerated Productivity.</p>
          <Link to="/signup" className='rounded-md bg-black text-white font-semibold px-4 py-2 flex items-center justify-center gap-2'>Try Flow for free <FaArrowRight /></Link>
        </div>
      </div>
    </>
  )
}

export default Landing