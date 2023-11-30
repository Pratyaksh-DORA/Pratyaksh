import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../utilis/Api"
import { useDispatch } from 'react-redux';
import { logout } from "../features/AuthSlice"

const Modal = ({ projects, closeModal, position, parentRef, onProjectClick }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const handleLogout = async () => {
        const res = await fetchData("/logout")
        console.log(res);
        navigate("/login")
        dispatch(logout())

    }


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
                    onClick={() => navigate("/onboarding")}
                    className="mt-4 text-sm"
                >
                    Add another project
                </button>
                <button
                    onClick={handleLogout}
                    className="mt-1 text-sm"
                >
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Modal;
