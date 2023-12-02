import React, { useEffect, useState } from 'react';
import { fetchData } from '../utilis/Api';

const Team = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        role: 'admin',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetchData('/getAllUsersOfProject');
            setUsers(res);
            console.log('team', res);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        // await deleteUser(userId);
        // // Fetch updated user list after deletion
        // const updatedUsers = await fetchData('/getAllUsersOfProject');
        // setUsers(updatedUsers);
    };

    const handleAddUser = async () => {
        // await addUser(newUser);
        // // Fetch updated user list after addition
        // const updatedUsers = await fetchData('/getAllUsersOfProject');
        // setUsers(updatedUsers);
        // // Reset new user form
        // setNewUser({ username: '', email: '', role: 'admin' });
    };

    return (
        <div>
            <div className="bg-gray-50 p-4">
                <table className='w-full border-collapse border'>
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2">Username</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Role</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="p-2">{user.username}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.role}</td>
                                <td className="p-2">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default Team;
