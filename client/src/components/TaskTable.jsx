// TaskTable.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProjectTask } from "../features/ProjectSlice";
import FormInput from "./FormInput";

const TaskTable = ({ tasks, milestoneIndex, handleTaskEdit }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTasks, setEditedTasks] = useState([...tasks]);

    const handleTaskSave = () => {
        dispatch(editProjectTask({ milestoneIndex, tasks: editedTasks }));
        setIsEditing(false);
    };

    const handleEdit = (taskIndex, fieldName, value) => {
        const updatedTasks = [...editedTasks];
        updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            [fieldName]: value,
        };
        setEditedTasks(updatedTasks);
        setIsEditing(true);
    };

    return (
        <div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Assigned</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 &&
                        tasks.map((task, index) => (
                            <tr key={index}>
                                <td>
                                    <FormInput
                                        type="text"
                                        value={editedTasks[index]?.name || task.name}
                                        onChange={(e) => handleEdit(index, "name", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <FormInput
                                        type="text"
                                        value={editedTasks[index]?.description || task.description}
                                        onChange={(e) => handleEdit(index, "description", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <FormInput
                                        type="text"
                                        value={editedTasks[index]?.dueDate || task.dueDate}
                                        onChange={(e) => handleEdit(index, "dueDate", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <FormInput
                                        type="text"
                                        value={editedTasks[index]?.assigned || task.assigned}
                                        onChange={(e) => handleEdit(index, "assigned", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <FormInput
                                        type="text"
                                        value={editedTasks[index]?.priority || task.priority}
                                        onChange={(e) => handleEdit(index, "priority", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <FormInput
                                        type="text"
                                        value={editedTasks[index]?.status || task.status}
                                        onChange={(e) => handleEdit(index, "status", e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {isEditing && (
                <button onClick={handleTaskSave} className="mt-4 p-2 border rounded-md">
                    Save
                </button>
            )}
        </div>
    );
};

export default TaskTable;