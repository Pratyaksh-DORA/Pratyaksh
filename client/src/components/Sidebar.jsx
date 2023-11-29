
import React, { useState, useRef, useEffect } from 'react';
import { FaBars, } from 'react-icons/fa';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

import { login } from "../features/AuthSlice"
import { editProject } from "../features/ProjectSlice"
import axios from "axios"

import Modal from './Modal';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { MdBarChart, MdChatBubbleOutline, MdUpdate, MdOutlineCheckBox } from "react-icons/md";




const Sidebar = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");
    const { user } = useSelector((state) => state.auth);
    let id = user.currentProject;
    id = id.toString()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef();


    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/getAllProjectOfUser", { headers })
            .then((res) => {
                setProjects(res.data);
                let id = user.currentProject;
                id = id.toString()
                fetchProjectDetails(id);
            }).catch((error) => console.log(error))

    }, [])

    const headers = {
        Authorization: `Bearer ${token}`,
    };
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
    const handleProjectClick = (project) => {
        setSelectedProject(project);
        let currentProject = project._id;

        axios.put("http://localhost:5000/api/v1/updateUser", { currentProject }, { headers })
            .then((res) => {
                const user = res.data.user;
                dispatch(login({ user, token }))
                let id = user.currentProject;
                id = id.toString();
                fetchProjectDetails(id);

            })
            .catch((error) => console.error(error))
            .finally(() => {
                closeModal(); // Close the modal after updating project details
            });
    };

    const fetchProjectDetails = (id) => {
        axios.get(`http://localhost:5000/api/v1/getOneProject/${id}`, { headers })
            .then((res) => {
                const project = res.data.project;
                console.log(project);
                console.log("first")
                dispatch(editProject({ project }));
                setSelectedProject(res.data.project);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <div className={` text-gray-600 h-screen ${isCollapsed ? 'w-16 bg-white' : 'w-52 bg-secondary'} transition-all`}>
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


                    <Link to={`/${id}/task`} className='flex gap-2 items-center '><MdOutlineCheckBox /> Tasks</Link>
                    <Link to={`/${id}/team`} className='flex gap-2 items-center '> <FaRegUser />Team</Link>
                    <Link to={`/${id}/update`} className='flex gap-2 items-center '><MdUpdate /> Updates</Link>
                    <Link to={`/${id}/analysis`} className='flex gap-2 items-center '><MdBarChart /> Analysis</Link>
                    <Link to={`/${id}/chat`} className='flex gap-2 items-center '><MdChatBubbleOutline /> Chats</Link>

                </div>
            )}
        </div>
    );
};

export default Sidebar;
