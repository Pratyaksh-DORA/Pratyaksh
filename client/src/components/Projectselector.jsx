// ProjectSelector.js

import React, { useState } from 'react';
import Select from 'react-select';
import Modal from 'react-modal';

const ProjectSelector = ({ isOpen, onRequestClose }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = [
        { value: 'project1', label: 'Project 1' },
        { value: 'project2', label: 'Project 2' },
        { value: 'project3', label: 'Project 3' },
        // Add more projects as needed
    ];

    const handleChange = (selectedOption) => {
        setSelectedProject(selectedOption);
        // You can add additional logic here, such as navigating to the selected project.
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Project Selector Modal"
            className="modal"
            overlayClassName="overlay"
        >
            <div className="w-full max-w-xs">
                <Select
                    value={selectedProject}
                    onChange={handleChange}
                    options={projects}
                    placeholder="Select a project"
                    isSearchable
                />
            </div>
        </Modal>
    );
};

export default ProjectSelector;
