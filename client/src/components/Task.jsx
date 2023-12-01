// Task.jsx
import React, { useState } from 'react';
import { TaskTable } from '../components';
import { useSelector, useDispatch } from 'react-redux';
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
    };
    const handleAddMilestone = () => {
        const newMilestone = {
            name: "New Milestone",
            tasks: [],
        };
        setEditedMilestones([...editedMilestones, newMilestone]);
    };

    const handleSave = async () => {
        dispatch(editProject({ ...project, milestones: editedMilestones }));
        console.log("first")
        console.log(editedMilestones)
        const res = await putData(`/updateProject/${id}`, { milestones: editedMilestones })
        console.log(res)
    };

    return (
        <div>
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