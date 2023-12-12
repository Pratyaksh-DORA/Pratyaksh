// Task.jsx
import React, { useState } from 'react';
import { TaskTable } from '../components';
import { useDispatch } from 'react-redux';
import { editProject } from '../features/ProjectSlice';
import { putData } from '../utilis/Api';

const Task = () => {
    const dispatch = useDispatch();
    // const { project } = useSelector((state) => state.project);
    const project = JSON.parse(localStorage.getItem("project"))
    const milestones = project.milestones;
    const id = project._id

    const [editedMilestones, setEditedMilestones] = useState([...milestones]);

    const handleMilestoneEdit = (milestoneIndex, fieldName, value) => {
        const updatedMilestones = [...editedMilestones];
        updatedMilestones[milestoneIndex] = {
            ...updatedMilestones[milestoneIndex],
            [fieldName]: value,
        };
        setEditedMilestones(updatedMilestones);
        dispatch(editProject({ ...project, milestones: updatedMilestones }));
    };
    const handleAddMilestone = () => {
        const newMilestone = {
            name: "New Milestone",
            tasks: [],
        };
        const updatedMilestones = [...editedMilestones, newMilestone];
        setEditedMilestones(updatedMilestones);

        // Update Redux state immediately after adding a new milestone
        dispatch(editProject({ ...project, milestones: updatedMilestones }));
    };

    const handleSave = async () => {
        const updatedProject = JSON.parse(localStorage.getItem("project"))

        // Send the updated project data to the backend
        try {
            const res = await putData(`/updateProject/${id}`, updatedProject);
            console.log(res);
        } catch (error) {
            console.error("Error updating project on the backend:", error);
        }
    };


    return (
        <div className='p-4'>
            <div>
                {editedMilestones.map((milestone, index) => (
                    <div key={index} className='mt-8'>
                        <h2>
                            <input
                                className="mb-2 w-full focus:outline-none text-lg font-semibold"
                                type="text"
                                value={milestone.name}
                                onChange={(e) => handleMilestoneEdit(index, 'name', e.target.value)}
                            />
                        </h2>
                        <TaskTable tasks={milestone.tasks} milestoneIndex={index} />
                    </div>
                ))}
            </div>
            <button onClick={handleAddMilestone} className="mt-4 p-2 border rounded-md">
                Add Milestone
            </button>
            <button onClick={handleSave} className="mt-4 p-2 border rounded-md">
                Save
            </button>
        </div>
    );
};

export default Task;