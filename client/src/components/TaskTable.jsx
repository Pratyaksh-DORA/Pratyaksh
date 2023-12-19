import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProject } from "../features/ProjectSlice";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";




const TaskTable = ({ tasks, milestoneIndex, handleTaskEdit }) => {
    const project = JSON.parse(localStorage.getItem("project"))
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTasks, setEditedTasks] = useState([...tasks]);
    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        dueDate: "",
        assigned: "",
        priority: "Low",
        status: "",
    });

    const handleTaskSave = async () => {
        const updatedMilestones = project.milestones.map((milestone, index) => {
            if (index === milestoneIndex) {
                return {
                    ...milestone,
                    tasks: editedTasks,
                };
            }
            return milestone;
        });

        const updatedProject = {
            ...project,
            milestones: updatedMilestones,
        };

        dispatch(editProject(updatedProject));
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
            priority: "Low",
            status: "",
        });
        setIsEditing(true);
    };

    return (
        <div>
            <table className="table-fixed border-collapse border text-left">
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
                                        className="w-full focus:outline-none bg-background bg-"
                                        type="text"
                                        value={task.name}
                                        onChange={(e) => handleEdit(index, "name", e.target.value)}
                                    />
                                </td>
                                <td className="border px-2 py-1">
                                    <input
                                        className="w-full focus:outline-none bg-background"
                                        type="text"
                                        value={task.description}
                                        onChange={(e) => handleEdit(index, "description", e.target.value)}
                                    />
                                </td>
                                <td className="border px-2 py-1 ">
                                    <DatePicker
                                        className="w-full focus:outline-none bg-background cursor-pointer"
                                        selected={task.dueDate ? new Date(task.dueDate) : null}
                                        onChange={(date) => handleEdit(index, "dueDate", date)}
                                        dateFormat="dd-MM-yyyy"
                                    />
                                </td>
                                <td className="border px-2 py-1">
                                    <input
                                        className="w-full focus:outline-none bg-background"
                                        type="text"
                                        value={task.assigned}
                                        onChange={(e) => handleEdit(index, "assigned", e.target.value)}
                                    />
                                </td>
                                <td className="border px-2 py-1">
                                    <select
                                        className="w-full focus:outline-none bg-background appearance-none cursor-pointer"
                                        value={task.priority}
                                        onChange={(e) => handleEdit(index, "priority", e.target.value)}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>

                                </td>
                                <td className="border px-2 py-1">
                                    <select
                                        className="w-full focus:outline-none bg-background appearance-none cursor-pointer"
                                        value={task.status}
                                        onChange={(e) => handleEdit(index, "status", e.target.value)}
                                    >
                                        <option value="Planning">Planning</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Paused">Paused</option>
                                        <option value="Done">Done</option>
                                        <option value="Canceled">Canceled</option>
                                    </select>
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
