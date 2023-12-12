import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { fetchData, postData, } from '../utilis/Api';
import FormInput from '../components/FormInput';
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
const Team = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUserData, setNewUserData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const customModalStyles = {
        content: {
            width: '70%',
            height: '70%',
            margin: 'auto',
        },
    };
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage:
                "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
            required: true,
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 6 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
            required: true,
        },

    ];

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetchData('/getAllUsersOfProject');
            setUsers(res);

        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        //     await deleteUser(id);
        //     const updatedUsers = await fetchData('/getAllUsersOfProject');
        //     setUsers(updatedUsers);
    };

    const handleAddMember = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewUserData({
            username: '',
            email: '',
            password: '',
        });
    };
    const onChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await postData('/createUser', newUserData)
        console.log(res)
        const updatedUsers = await fetchData('/getAllUsersOfProject');
        setUsers(updatedUsers);
        handleCloseModal();
    };

    return (
        <div className='p-4'>
            <div className="bg-gray-50 p-4">

                <table className='w-full border-collapse border'>
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2">Username</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Edit</th>
                            <th className='p-2'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="p-2">{user.username}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.role}</td>
                                <td className='p-2'>
                                    <button className="font-bold py-1 px-2 "><MdOutlineEdit /></button>
                                </td>
                                <td className="p-2">
                                    <button
                                        className=" hover:text-red-700  font-bold py-1 px-2 "
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <IoTrashOutline />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleAddMember}>Add New Member</button>
            </div>


            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Add New Member"
                style={customModalStyles}
            >
                <div className='flex justify-between items-center'>
                    <p>Add New Member</p>
                    <button onClick={handleCloseModal} className='text-2xl text-gray-400'><MdOutlineClose /></button>
                </div>
                <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col' >

                    {inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={newUserData[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button onClick={(e) => handleSubmit(e)} className="w-96 p-2 mt-4  border rounded-md" type="submit">Add member</button>

                </form>

            </Modal>
        </div>
    );
};

export default Team;
