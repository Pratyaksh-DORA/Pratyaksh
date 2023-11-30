// Task.jsx
import React, { useState } from 'react';
import { TaskTable } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { editProject } from '../features/ProjectSlice';

const Task = () => {
    const dispatch = useDispatch();
    const { project } = useSelector((state) => state.project);
    const milestones = project.project.milestones;

    const [editedMilestones, setEditedMilestones] = useState([...milestones]);

    const handleMilestoneEdit = (milestoneIndex, fieldName, value) => {
        const updatedMilestones = [...editedMilestones];
        updatedMilestones[milestoneIndex] = {
            ...updatedMilestones[milestoneIndex],
            [fieldName]: value,
        };
        setEditedMilestones(updatedMilestones);
    };

    const handleSave = () => {
        dispatch(editProject({ ...project, milestones: editedMilestones }));
    };

    return (
        <div>
            <div>
                {editedMilestones.map((milestone, index) => (
                    <div key={index}>
                        <h2>
                            <input
                                type="text"
                                value={milestone.name}
                                onChange={(e) => handleMilestoneEdit(index, 'name', e.target.value)}
                            />
                        </h2>
                        <TaskTable tasks={milestone.tasks} milestoneIndex={index} />
                    </div>
                ))}
            </div>
            <button onClick={handleSave} className="mt-4 p-2 border rounded-md">
                Save
            </button>
        </div>
    );
};

export default Task;