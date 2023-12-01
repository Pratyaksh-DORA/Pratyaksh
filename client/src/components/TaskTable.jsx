import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProjectTask } from "../features/ProjectSlice";

const TaskTable = ({ tasks, milestoneIndex, handleTaskEdit }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTasks, setEditedTasks] = useState([...tasks]);
    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        dueDate: "",
        assigned: "",
        priority: "",
        status: "",
    });

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

    const handleAddNewTask = () => {
        setEditedTasks([...editedTasks, newTask]);
        setNewTask({
            name: "",
            description: "",
            dueDate: "",
            assigned: "",
            priority: "",
            status: "",
        });
        setIsEditing(true);
    };

    return (
        <div>
            <table className="table-fixed border-collapse border ">
                <tbody>
                    <tr className="bg-gray-50">
                        <th className="w-1/6 border px-2 py-1 font-normal">Name</th>
                        <th className="w-1/6 border px-2 py-1 font-normal">Description</th>
                        <th className="w-1/6 border px-2 py-1 font-normal">Due Date</th>
                        <th className="w-1/12 border px-2 py-1 font-normal">Assigned</th>
                        <th className="w-1/12 border px-2 py-1 font-normal">Priority</th>
                        <th className="w-1/12 border px-2 py-1 font-normal">Status</th>
                    </tr>
                    {editedTasks.length > 0 &&
                        editedTasks.map((task, index) => (
                            <tr key={index}>
                                <td className="border px-2 py-1">
                                    <input
                                        className="w-full focus:outline-none"
                                        type="text"
                                        value={task.name}
                                        onChange={(e) => handleEdit(index, "name", e.target.value)}
                                    />
                                </td>
                                <td className="border px-2 py-1">
                                    <input
                                        className="w-full focus:outline-none"
                                        type="text"
                                        value={task.description}
                                        onChange={(e) => handleEdit(index, "description", e.target.value)}
                                    />
                                </td>
                                <td className="border px-2 py-1">
                                    <input
                                        className="w-full focus:outline-none"
                                        type="text"
                                        value={task.dueDate}
                                        onChange={(e) => handleEdit(index, "dueDate", e.target.value)}
                                    />
                                </td>
                                <td className="border px-2 py-1">
                                    <input
                                        className="w-full focus:outline-none"
                                        type="text"
                                        value={task.assigned}
                                        onChange={(e) => handleEdit(index, "assigned", e.target.value)}
                                    />
                                </td>
                                <td className="border px-2 py-1">
                                    <input
                                        className="w-full focus:outline-none"
                                        type="text"
                                        value={task.priority}
                                        onChange={(e) => handleEdit(index, "priority", e.target.value)}
                                    />
                                </td>
                                <td className="border px-2 py-1">
                                    <input
                                        className="w-full focus:outline-none"
                                        type="text"
                                        value={task.status}
                                        onChange={(e) => handleEdit(index, "status", e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    <tr onClick={handleAddNewTask} className=" cursor-pointer hover:bg-gray-100">
                        <td className="px-2 py-1" colSpan="6">New</td>
                    </tr>
                </tbody>
            </table>




            {isEditing && (
                <button onClick={handleTaskSave} className="mt-4 px-2 py-1 border rounded-md">
                    Save
                </button>
            )}
        </div>
    );
};

export default TaskTable;
