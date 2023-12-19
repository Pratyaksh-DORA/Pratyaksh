
import React from 'react'
import { MilestoneChart } from '../components';
import { PieChart } from 'react-minimal-pie-chart';


const Home = () => {
    const project = JSON.parse(localStorage.getItem("project"))
    const milestones = [
        {
            name: "Milestone 1",
            target_date: "2023-03-01",
            status: "In Progress",
            tasks: [
                {
                    name: "Task 1",
                    description: "Description for Task 1",
                    dueDate: "2023-03-15",
                    assigned: "657ffc42f346718deebe59d5",
                    priority: "High",
                    status: "Not Started"
                },
                {
                    name: "Task 2",
                    description: "Description for Task 2",
                    dueDate: "2023-03-20",
                    assigned: "657ffc42f346718deebe59d5",
                    priority: "Medium",
                    status: "Not Started"
                }
            ]
        },
        {
            name: "Milestone 2",
            target_date: "2023-05-01",
            status: "Not Started",
            tasks: [
                {
                    name: "Task 3",
                    description: "Description for Task 3",
                    dueDate: "2023-05-10",
                    assigned: "657ffc42f346718deebe59d5",
                    priority: "Low",
                    status: "Not Started"
                }
            ]
        },
        {
            name: "Milestone 3",
            target_date: "2023-05-01",
            status: "completed",
            tasks: [
                {
                    name: "Task 3",
                    description: "Description for Task 3",
                    dueDate: "2023-05-10",
                    assigned: "657ffc42f346718deebe59d5",
                    priority: "Low",
                    status: "Not Started"
                }
            ]
        }
        ,
        {
            name: "Milestone 3",
            target_date: "2023-05-01",
            status: "completed",
            tasks: [
                {
                    name: "Task 3",
                    description: "Description for Task 3",
                    dueDate: "2023-05-10",
                    assigned: "657ffc42f346718deebe59d5",
                    priority: "Low",
                    status: "Not Started"
                }
            ]
        }
        ,
        {
            name: "Milestone 3",
            target_date: "2023-05-01",
            status: "completed",
            tasks: [
                {
                    name: "Task 3",
                    description: "Description for Task 3",
                    dueDate: "2023-05-10",
                    assigned: "657ffc42f346718deebe59d5",
                    priority: "Low",
                    status: "Not Started"
                }
            ]
        }

    ]
    const data = [
        { title: 'completed', value: 10, color: '#8e44ad' },    // Purple
        { title: 'not started', value: 20, color: '#808080' },   // Grey
        { title: 'planning', value: 5, color: '#3498db' },       // Blue
        { title: 'progress', value: 15, color: '#27ae60' },       // Green
        { title: 'cancelled', value: 25, color: '#e74c3c' },      // Red
        { title: 'paused', value: 25, color: '#e67e22' },         // Orange
    ];


    return (

        <div className="container mx-auto mt-8 flex flex-col gap-8">

            <div className='flex items-center ml-2 px-4 gap-12'>

                <div className='bg-white rounded-md  shadow-md p-4 w-fit flex gap-8'>
                    <img className='rounded-md w-40 ' src="https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />
                    <div className='text-sm flex flex-col gap-2'>
                        <p><span className='font-semibold'>Project :</span> Dora The Explorer</p>
                        <p><span className='font-semibold'>Description :</span> Project for Real time monitoring of infrastructure.</p>
                        <p><span className='font-semibold'>Contractor :</span> Sunil Jangid</p>
                        <p><span className='font-semibold'>Progress :</span> 48% completed</p>
                        <p><span className='font-semibold'>Start date:</span> 12/25/23</p>
                        <p><span className='font-semibold'>Actual End date:</span> 18/25/23</p>
                        <p><span className='font-semibold'>Delay by :</span>14 days</p>
                    </div>
                </div>
                <div className=' flex gap-8 items-center bg-white rounded-lg shadow-md p-4 w-fit py-8'>
                    <PieChart
                        data={data}
                        label={({ dataEntry }) => `${dataEntry.value}%`}
                        className='w-44'
                        style={{
                            fontSize: '6px', // Set the desired font size
                            fill: '#fff', // Set the label text color
                        }}

                    />

                    <div id="description">
                        <ul>
                            {data.map((item, index) => (
                                <li key={index}>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: '10px', // Set the width of the colored block
                                            height: '10px', // Set the height of the colored block
                                            backgroundColor: item.color,
                                            borderRadius: '50%',
                                            marginRight: '5px', // Add some spacing between the block and text
                                        }}
                                    />
                                    {item.title}: {item.value}%
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46288.90455899588!2d75.67323739752513!3d26.914251186648098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4c9b9a59a5e1%3A0xd76745ca401b0df4!2sDOP%20FILM%20CITY%20JAIPUR!5e0!3m2!1sen!2sin!4v1702907486468!5m2!1sen!2sin"
                    width="230"
                    height="230"
                    style={{ border: '0' }}  // Use curly braces for inline styles in React
                    allowFullScreen=""
                    className='rounded-md'
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

            </div>

            <div className='flex items-center p-4 gap-12 ml-2 bg-white rounded-md shadow-md'>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md  w-72 '>

                    <p className='text-3xl font-bold py-4'>
                        Budget Analysis
                    </p>


                </div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-blue-500 to-blue-400 w-72 text-white'>

                    <p className='text-3xl font-bold'>
                        4,500
                    </p>
                    <p className='text-sm flex items-center'> Budget Allocated</p>
                </div>

                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-yellow-500 to-yellow-400 w-72 text-white'>

                    <p className='text-3xl font-bold'>
                        4,500
                    </p>
                    <p className='text-sm flex items-center'> Budget spent</p>
                </div>
                <div className='flex flex-col gap-2 p-4 rounded-md shadow-md bg-gradient-to-tr from-green-500 to-green-400 w-72 text-white'>

                    <p className='text-3xl font-bold'>
                        4,500
                    </p>
                    <p className='text-sm flex items-center'> Remaining Budget</p>
                </div>
            </div>
            <div className='ml-2 px-4 '>
                <MilestoneChart milestones={milestones} />
            </div>
        </div>
    );
}

export default Home