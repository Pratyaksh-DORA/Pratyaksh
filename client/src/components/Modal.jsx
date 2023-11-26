// src/Modal.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Modal = ({ projects, closeModal, position, parentRef, onProjectClick }) => {
    const modalStyle = {
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 1000,
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                parentRef.current &&
                !parentRef.current.contains(event.target)
            ) {
                closeModal();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [parentRef, closeModal]);

    const handleProjectClick = () => {
        // Add any specific behavior when a project is clicked
        closeModal();
    };

    return (
        <div style={modalStyle} className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="flex flex-col">
                {projects.map((project) => (
                    <Link key={project.id} onClick={() => onProjectClick(project)}>
                        {project.name}
                    </Link>
                ))}
            </div>
            <div className="flex flex-col">
                <button
                    // onClick={}
                    className="mt-4  px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add another project
                </button>
                <button
                    // onClick={closeModal}
                    className="mt-4  px-4 py-2 rounded hover:bg-blue-700"
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Modal;
