import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../features/AuthSlice";
import { editProject } from "../features/ProjectSlice";
import ModalI from "./Modal";
import { fetchData, putData } from "../utilis/Api";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import {
  MdBarChart,
  MdChatBubbleOutline,
  MdUpdate,
  MdOutlineCheckBox,
  MdOutlineDashboard,
  MdDashboard,
  MdOutlineSettings,
} from "react-icons/md";
import { PiGraphDuotone } from "react-icons/pi";
import ProjectDetails from "./ProjectDetails";
import Modal from "react-modal";
const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  let id = user.currentProject;
  id = id.toString();
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
      id = id.toString();
      fetchProjectDetails(id);
    };
    fetchDetails();
  }, []);

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
    const res = await putData("/updateuser", { currentProject });
    const user = res.user;
    dispatch(login({ user }));
    let id = user.currentProject;
    id = id.toString();
    fetchProjectDetails(id);
    closeModal();
  };
  const [modalIsOpenSetting, setModalIsOpenSetting] = useState(false);

  const openModalSetting = () => {
    setModalIsOpenSetting(true);
  };

  const closeModalSetting = () => {
    console.log("drunken");
    setModalIsOpenSetting(false);
  };

  const fetchProjectDetails = async (id) => {
    const res = await fetchData(`/getOneProject/${id}`);
    const project = res.project;
    dispatch(editProject(project));
    setSelectedProject(res.project);
  };

  return (
    <div
      className={` text-white h-screen ${isCollapsed ? "w-16 bg-primary" : "w-52 bg-primary"
        } transition-all fixed top-0 left-0 z-5 h-screen`}
    >
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && (
          <div className="App">
            <button
              ref={buttonRef}
              onClick={openModal}
              className=" font-semibold  "
            >
              {selectedProject ? selectedProject.name : "Loading..."}
            </button>
            {isModalOpen && (
              <ModalI
                projects={projects}
                closeModal={closeModal}
                position={modalPosition}
                parentRef={buttonRef}
                onProjectClick={handleProjectClick}
              />
            )}
          </div>
        )}
        {isCollapsed && selectedProject ? (
          <FaBars
            className="text-2xl cursor-pointer "
            onClick={toggleSidebar}
          />
        ) : (
          <MdKeyboardDoubleArrowLeft
            className="text-2xl cursor-pointer"
            onClick={toggleSidebar}
          />
        )}
      </div>
      {!isCollapsed ? (
        <div className="p-4 text-md font-semibold gap-5 flex flex-col">
          <Link
            to={`/${id}`}
            className="flex p-1  items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2 "
          >
            <MdOutlineDashboard /> Dashboard
          </Link>
          <Link
            to={`/${id}/task`}
            className="flex p-1  items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2 "
          >
            <MdOutlineCheckBox /> Tasks
          </Link>
          <Link
            to={`/${id}/team`}
            className="flex p-1  items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2 "
          >
            {" "}
            <FaRegUser />
            Team
          </Link>
          <Link
            to={`/${id}/update`}
            className="flex p-1  items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2 "
          >
            <MdUpdate /> Updates
          </Link>
          <Link
            to={`/${id}/analysis`}
            className="flex p-1  items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2 "
          >
            <MdBarChart /> Analysis
          </Link>
          <Link
            to={`/${id}/gis`}
            className="flex p-1  items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2 "
          >
            <FaMapMarkedAlt /> GIS{" "}
          </Link>

          <Link
            to={`/${id}/report`}
            className="flex p-1  items-center hover:bg-white hover:rounded-md hover:text-black gap-2 "
          >
            <MdChatBubbleOutline /> Reports{" "}
          </Link>
          <div>
            <button
              onClick={openModalSetting}
              className="flex gap-2 items-center"
            >
              <div className="flex p-1  items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2 ">
                <MdOutlineSettings /> Setting
              </div>
            </button>
            <Modal
              isOpen={modalIsOpenSetting}
              onRequestClose={closeModalSetting}
              contentLabel="Hello World Modal"
            >
              <ProjectDetails closeModalSetting={closeModalSetting} />
            </Modal>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 text-md font-semibold gap-8 flex flex-col ">
            <Link
              to={`/${id}`}
              className="flex text-lg p-1 items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2"
            >
              <MdOutlineDashboard />{" "}
            </Link>
            <Link
              to={`/${id}/task`}
              className="flex text-lg p-1 items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2"
            >
              <MdOutlineCheckBox />{" "}
            </Link>
            <Link
              to={`/${id}/team`}
              className="flex text-lg p-1 items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2"
            >
              {" "}
              <FaRegUser />
            </Link>
            <Link
              to={`/${id}/update`}
              className="flex text-lg p-1 items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2"
            >
              <MdUpdate />{" "}
            </Link>
            <Link
              to={`/${id}/analysis`}
              className="flex text-lg p-1 items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2"
            >
              <MdBarChart />{" "}
            </Link>

            <Link
              to={`/${id}/simulator`}
              className="flex text-lg p-1 items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2"
            >
              <PiGraphDuotone />{" "}
            </Link>
            <Link
              to={`/${id}/chat`}
              className="flex text-lg p-1 items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2"
            >
              <MdChatBubbleOutline />{" "}
            </Link>
            <div>
              <button onClick={openModalSetting}>
                <div className="flex text-lg p-1 items-center hover:bg-white hover:rounded-md hover:text-black hover:p-1 gap-2">
                  <MdOutlineSettings />
                </div>
              </button>
              <Modal
                isOpen={modalIsOpenSetting}
                onRequestClose={closeModalSetting}
                contentLabel="Hello World Modal"
              >
                <ProjectDetails closeModalSetting={closeModalSetting} />
              </Modal>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
