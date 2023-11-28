
import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';

import { login } from "../features/AuthSlice"
import { editProject } from "../features/ProjectSlice"
import axios from "axios"

import Modal from './Modal';


const Sidebar = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");
    const { user } = useSelector((state) => state.auth);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef();
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/v1/getAllProjectOfUser", { headers })
            .then((res) => {

                setProjects(res.data)
            }).catch((error) => console.log(error))

    }, [])
    useEffect(() => {
        console.log("project details")
        let id = user.currentProject
        id = id.toString();
        axios.get(`http://localhost:5000/api/v1/getOneProject/${id}`, { headers })
            .then((res) => {
                const project = res.data.project
                console.log(project)
                dispatch(editProject({ project }))
            }).catch((error) => {
                console.log(error)
            })
    }, [selectedProject])
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
        let currentProject = project._id

        axios.put("http://localhost:5000/api/v1/updateUser", { currentProject }, { headers })
            .then((res) => {
                const user = res.data.user
                dispatch(login({ user, token }))

            })
            .catch((error) => console.error(error))

        closeModal();
    };
    selectedProject && console.log(selectedProject.name)
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
                            {selectedProject ? selectedProject.name : "Open Modal"}
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
                {isCollapsed ? (
                    <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
                ) : (
                    <MdKeyboardDoubleArrowLeft className="text-2xl cursor-pointer" onClick={toggleSidebar} />
                )}
            </div>
            {!isCollapsed && (
                <div className="p-4 text-sm font-semibold gap-4">


                    <p>Updates</p>
                    <p>Members</p>
                    <p>Settings</p>

                </div>
            )}
        </div>
    );
};

export default Sidebar;
