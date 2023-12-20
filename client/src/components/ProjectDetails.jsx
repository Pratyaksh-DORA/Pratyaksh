import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from './FormInput';
import { editProject } from '../features/ProjectSlice';
import { putData } from '../utilis/Api';

const ProjectDetails = ({ closeModalSetting }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: "",
        description: "",
        endDate: "",
        startDate: "",
    });
    const project = JSON.parse(localStorage.getItem("project"))

    const id = project._id
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProject = JSON.parse(localStorage.getItem("project"))
        console.log(updatedProject)

        try {
            const res = await putData(`/updateProject/${id}`, values);
            console.log(res);
            dispatch(editProject({ ...project, values }));
            closeModalSetting()
        } catch (error) {
            console.error("Error updating project on the backend:", error);
        }
    };


    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Project Name",
            errorMessage: "Project name should be 3-50 characters!",
            label: "Project Name",

            required: true,
        },
        {
            id: 2,
            name: "description",
            type: "textarea",
            placeholder: "Project Description",
            errorMessage: "Project description should be 10-500 characters!",
            label: "Project Description",

            required: true,
        },
        {
            id: 3,
            name: "startDate",
            type: "date",
            placeholder: "Start Date",
            errorMessage: "Invalid start date!",
            label: "Start Date",
            required: true,
        },
        {
            id: 4,
            name: "endDate",
            type: "date",
            placeholder: "End Date",
            errorMessage: "Invalid end date!",
            label: "End Date",
            required: true,
        },

    ];

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col'>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <div>

                </div>
                <button
                    onClick={(e) => handleSubmit(e)}
                    className="w-96 p-2 mt-4  border rounded-md"
                    type="submit"
                >
                    Update Project                </button>
            </form>
        </div>
    );
};

export default ProjectDetails;
