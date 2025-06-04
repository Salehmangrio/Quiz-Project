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


// ==================== QUIZ API CALLS ====================

// Create a new quiz
export const createQuiz = async (quizData) => {
    return postData('quizzes', quizData);
};

// Get all quizzes
export const getAllQuizzes = async () => {
    return fetchData('quizzes');
};

// Get a quiz by ID
export const getQuizById = async (quizId) => {
    return fetchData(`quizzes/${quizId}`);
};

// Update a quiz by ID
export const updateQuiz = async (quizId, updatedData) => {
    return putData(`quizzes/${quizId}`, updatedData);
};

// Delete a quiz by ID
export const deleteQuiz = async (quizId) => {
    try {
        await deleteData(`quizzes/${quizId}/questions`);
        await deleteData(`quizzes/${quizId}`);
        return { success: true };
    } catch (error) {
        console.error("Delete quiz failed:", error);
        throw error;
    }
};

// Get all quizzes created by a specific user
export const getQuizzesByUser = async (userId) => {
    return fetchData(`quizzes/user/${userId}`);
};

// Get only active quizzes
export const getActiveQuizzes = async () => {
    return fetchData('quizzes/active');
};

// ==================== QUESTIONS API CALLS ====================

//Add question to Quiz
export const addQuestionToQuiz = async (quizId, questionData) => {
    return postData(`quizzes/${quizId}/questions`, questionData);
};

//View questions of particular Quiz
export const viewQuestions = async (quizId) => {
    return fetchData(`quizzes/${quizId}/questions`);
}