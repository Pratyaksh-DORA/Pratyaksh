import React, { useState } from 'react'
import { FormInput } from "../components"
import { useNavigate } from 'react-router-dom'

const AddProject = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const inputs = [
        {
            id: 1,
            name: "Team Name",
            type: "text",
            placeholder: "Team name",
            errorMessage:
                "Teamname should be 3-16 characters and shouldn't include any special character!",
            label: "Teamname",
            required: true,
        },]
    const handleChange = (e) => {
        setName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/main")

    }
    return (
        <div className='flex justify-center items-center h-screen bg-secondary'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <p className='text-3xl font-semibold '>Create a team project</p>

                <form onSubmit={handleSubmit}>
                    {inputs.map((inputs) => (
                        <FormInput
                            onChange={handleChange}
                            {...inputs}
                            value={name} />
                    ))}
                    <button onClick={() => console.log(name)} className="w-full p-2 mt-4  border rounded-md" type="submit">Continue</button>
                </form>
            </div>
        </div>
    )
}

export default AddProject