import axios from 'axios';

// const BASE_URL = 'https://pratyaksh-production.up.railway.app/api/v1';
const BASE_URL = 'http://localhost:5000/api/v1'


export const fetchData = async (endpoint, options = {}) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            ...options,                // Add any other headers as needed

        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postData = async (endpoint, data, options = {}) => {
    try {
        const token = localStorage.getItem("token");
        console.log("token from api", token)
        const response = await axios.post(`${BASE_URL}/${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
            ...options,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const putData = async (endpoint, data, options = {}) => {
    try {
        const token = localStorage.getItem("token");
        console.log("token from api", token)
        const response = await axios.put(`${BASE_URL}/${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
            ...options,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


