import React from 'react'
import { TaskTable } from "../components"
import { useSelector, useDispatch } from 'react-redux';
import { editProject } from '../features/ProjectSlice';
const Task = () => {
    const dispatch = useDispatch();
    const { project } = useSelector((state) => state.project);
    const milestones = project.milestones;

    return (
        <div>
            <div>
                {milestones.map((milestone, index) => (
                    <div key={index}>
                        <h2>{milestone.name}</h2>
                        <TaskTable tasks={milestone.tasks} milestoneIndex={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Task