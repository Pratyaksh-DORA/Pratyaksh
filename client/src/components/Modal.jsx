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



    return (
        <div style={modalStyle} className="bg-white p-4 rounded-lg">
            <div className="flex flex-col">
                {projects.map((project) => (
                    <Link key={project._id} to={`/${project._id}`} onClick={() => onProjectClick(project)}>
                        {project.name}
                    </Link>
                ))}
            </div>

            <div className="flex flex-col items-start ">
                <button
                    // onClick={}
                    className="mt-4 text-sm"
                >
                    Add another project
                </button>
                <button
                    // onClick={closeModal}
                    className="mt-1 text-sm"
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Modal;
