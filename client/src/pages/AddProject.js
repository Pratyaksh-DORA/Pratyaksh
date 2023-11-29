import React, { useState } from 'react'
import { FormInput } from "../components"
import { useNavigate, } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { addProject } from '../features/ProjectSlice';

import axios from "axios"

const AddProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const [values, setValues] = useState({
        name: "",
    });


    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Team name",
            errorMessage:
                "Team name should be 3-16 characters and shouldn't include any special characters!",
            label: "Team name",
            required: true,
        },
    ];

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/v1/addProject", { name: values.name }, { headers })
            .then((res) => {
                const id = res.data.project._id;
                console.log(res.data.project._id)
                dispatch(addProject(values.name, id));
                navigate(`/${id}`);
            })
            .catch((error) => {
                console.error("Error adding project:", error);
                // You might want to show an error message to the user
            });
    };

    return (
        <div className='flex justify-center items-center h-screen bg-secondary'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <p className='text-3xl font-semibold '>Create a team project</p>

                <form onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            onChange={handleChange}
                            {...input}
                            value={values[input.name]}
                        />
                    ))}
                    <button className="w-full p-2 mt-4  border rounded-md" type="submit">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProject;