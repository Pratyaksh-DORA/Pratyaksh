import React, { useState } from 'react'
import { FormInput } from "../components"
import { useNavigate, } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { addProject, editProject } from '../features/ProjectSlice';
import { login } from "../features/AuthSlice"
import { fetchData, postData, putData } from '../utilis/Api';


const AddProject = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values)
        console.log(" 1s")
        const addProjectRes = await postData("/addProject", { name: values.name })
        console.log(addProjectRes.project._id)
        let currentProject = addProjectRes.project._id;
        dispatch(addProject(values.name, currentProject))

        console.log(" 2s")
        const updateUserRes = await putData('/updateUser', { currentProject });
        const user = updateUserRes.user;
        dispatch(login({ user }));

        console.log("3s");
        currentProject = currentProject.toString()
        console.log(currentProject)
        const getProjectRes = await fetchData(`/getOneProject/${currentProject}`);
        const project = getProjectRes.project;
        dispatch(editProject(project));
        console.log("4s")
        navigate(`/${currentProject}`);

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