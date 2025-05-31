import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Generic GET request
export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Generic POST request
export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Generic PUT request
export const putData = async (endpoint, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

// Generic DELETE request
export const deleteData = async (endpoint) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};

// Login API call
export const loginUser = async (credentials) => {
    return postData('login', credentials);
};

// Register API call
export const registerUser = async (userData) => {
    return postData('register', userData);
};
