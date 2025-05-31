import * as Yup from 'yup';

//  Reusable field schemas
const username = Yup.string().min(3, 'Username too short').required('Username is required');
const password = Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required');

//  Login Schema
export const loginValidationSchema = Yup.object({
    username,
    password,
});

//  Register Schema
export const registerValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    username,
    email: Yup.string().email('Invalid email').required('Email is required'),
    password,
    role: Yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Role is required'),
});
