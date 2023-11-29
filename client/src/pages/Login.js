import React, { useState } from 'react'
import { FormInput } from "../components"
import { Link, useNavigate } from 'react-router-dom';
import { GoWorkflow } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { login } from "../features/AuthSlice"
import axios from "axios";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
    });
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Username",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 6 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            required: true,
        },

    ];


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/v1/login", values)
            .then((res) => {
                const { user, token } = res.data;
                console.log("hi")
                console.log(user.currentProject)
                dispatch(login({ user, token }));
                if (user.currentProject.length !== 0) {
                    navigate(`/${user.currentProject}`)
                } else {
                    navigate("/onboarding")
                }

            })
            .catch((error) => {
                console.error("An error occurred:", error.message);
            })


    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    return (
        <div className='h-screen'>
            <div className='flex justify-between px-24 pt-6'>
                <Link to="/" className='font-bold flex justify-center items-center text-2xl gap-1'><GoWorkflow />Flow</Link>
                <ToastContainer />
            </div>
            <div className='flex justify-center items-center mt-24 '>
                <div>

                    <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col' >
                        <p className='text-5xl font-bold mb-2'>Login</p>
                        {inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={handleChange}
                            />
                        ))}
                        <button className="w-full p-2 mt-4  border rounded-md" type="submit">Continue with Flow</button>
                        <Link to="/" className='text-xs underline underline-offset-2 text-gray-400 mt-2'>Forgot Password ?</Link>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login