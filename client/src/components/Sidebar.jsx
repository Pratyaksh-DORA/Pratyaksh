// Sidebar.js

import React, { useState, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import Modal from './Modal';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef();

    const projects = [
        { id: 1, name: "Project 1" },
        { id: 2, name: "Project 2" },
        // Add more projects as needed
    ];


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
