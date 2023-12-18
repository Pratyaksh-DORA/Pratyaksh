import React from 'react'
import { MdIncompleteCircle, MdOutlineMotionPhotosPaused, MdOutlineNotInterested } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
const Admin = () => {
    return (
        <div className='flex items-center justify-evenly p-4'>
            <div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-blue-500 to-blue-400 w-72 text-white'>
                    <p className='text-3xl'><MdIncompleteCircle /></p>
                    <p className='text-sm'>Completed Projects</p>
                    <p className='text-3xl font-bold'>
                        4,500
                    </p>
                    <p className='text-sm flex items-center'><span className='bg-green-50 rounded-full px-1  text-blue-500 mr-1 font-semibold'>45.26%</span> increase from 2022</p>
                </div>
            </div>
            <div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-green-500 to-green-400 w-72 text-white'>
                    <p className='text-3xl'><TbProgressBolt /></p>
                    <p className='text-sm'>Ongoing Projects</p>
                    <p className='text-3xl font-bold'>
                        4,500
                    </p>
                    <p className='text-sm flex items-center'><span className='bg-green-50 rounded-full px-1  text-green-500 mr-1 font-semibold'>45.26%</span> increase from 2022</p>
                </div>
            </div>
            <div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-red-500 to-red-400 w-72 text-white'>
                    <p className='text-3xl'><MdOutlineMotionPhotosPaused /></p>
                    <p className='text-sm'>Paused Projects</p>
                    <p className='text-3xl font-bold'>
                        4,500
                    </p>
                    <p className='text-sm flex items-center'><span className='bg-green-50 rounded-full px-1  text-red-500 mr-1 font-semibold'>45.26%</span> increase from 2022</p>
                </div>
            </div>
            <div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-gray-500 to-gray-400 w-72 text-white'>
                    <p className='text-3xl'><MdOutlineNotInterested /></p>
                    <p className='text-sm'>Not Started Projects</p>
                    <p className='text-3xl font-bold'>
                        4,500
                    </p>
                    <p className='text-sm flex items-center'><span className='bg-green-50 rounded-full px-1  text-gray-500 mr-1 font-semibold'>45.26%</span> increase from 2022</p>
                </div>
            </div>

        </div>
    )
}

export default Admin