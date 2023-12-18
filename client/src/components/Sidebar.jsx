import React, { useState, useRef, useEffect } from 'react';
import { FaBars, } from 'react-icons/fa';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { login } from "../features/AuthSlice"
import { editProject } from "../features/ProjectSlice"
import Modal from './Modal';
import { fetchData, putData } from '../utilis/Api';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { MdBarChart, MdChatBubbleOutline, MdUpdate, MdOutlineCheckBox, MdOutlineDashboard } from "react-icons/md";
import { PiGraphDuotone } from "react-icons/pi";




const Sidebar = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("sidebar", user)
    let id = user.currentProject;
    id = id.toString()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef();


    useEffect(() => {
        const fetchDetails = async () => {
            const res = await fetchData("/getAllProjectofuser");

            setProjects(res);
            let id = user.currentProject;
            id = id.toString()
            fetchProjectDetails(id);
        }
        fetchDetails()

    }, [])

    const openModal = () => {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setModalPosition({
            x: buttonRect.left,
            y: buttonRect.bottom + window.scrollY,
        });
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };
    const handleProjectClick = async (project) => {
        setSelectedProject(project);
        let currentProject = project._id;
        const res = await putData("/updateuser", { currentProject })
        const user = res.user;
        dispatch(login({ user }))
        let id = user.currentProject;
        id = id.toString();
        fetchProjectDetails(id);
        closeModal()
    };

    const fetchProjectDetails = async (id) => {
        const res = await fetchData(`/getOneProject/${id}`)
        const project = res.project
        console.log(project)
        dispatch(editProject(project));
        setSelectedProject(res.project);
    }

    return (
        <div className={` text-white h-screen ${isCollapsed ? 'w-16 bg-white' : 'w-52 bg-primary'} transition-all`}>
            <div className="p-4 flex justify-between items-center">

                {!isCollapsed &&
                    <div className="App">
                        <button
                            ref={buttonRef}
                            onClick={openModal}
                            className=" text-gray-800 font-semibold  "
                        >
                            {selectedProject ? selectedProject.name : "Loading..."}
                        </button>
                        {isModalOpen && (
                            <Modal
                                projects={projects}
                                closeModal={closeModal}
                                position={modalPosition}
                                parentRef={buttonRef}
                                onProjectClick={handleProjectClick}
                            />
                        )}
                    </div>
                }
                {isCollapsed && selectedProject ? (
                    <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
                ) : (
                    <MdKeyboardDoubleArrowLeft className="text-2xl cursor-pointer" onClick={toggleSidebar} />
                )}
            </div>
            {!isCollapsed && (
                <div className="p-4 text-md font-semibold gap-5 flex flex-col">

                    <Link to={`/${id}`} className='flex gap-2 items-center '><MdOutlineDashboard /> Dashboard</Link>
                    <Link to={`/${id}/task`} className='flex gap-2 items-center '><MdOutlineCheckBox /> Tasks</Link>
                    <Link to={`/${id}/team`} className='flex gap-2 items-center '> <FaRegUser />Team</Link>
                    <Link to={`/${id}/update`} className='flex gap-2 items-center '><MdUpdate /> Updates</Link>
                    <Link to={`/${id}/analysis`} className='flex gap-2 items-center '><MdBarChart /> Analysis</Link>

                    <Link to={`/${id}/simulator`} className='flex gap-2 items-center '><PiGraphDuotone /> Simulator</Link>
                    <Link to={`/${id}/chat`} className='flex gap-2 items-center '><MdChatBubbleOutline /> Chats</Link>
                    <Link to={`/${id}/report`} className='flex gap-2 items-center '><MdChatBubbleOutline /> Reports </Link>


                </div>
            )}
        </div>
    );
};

export default Sidebar;
