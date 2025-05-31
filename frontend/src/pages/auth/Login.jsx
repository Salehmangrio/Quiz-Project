import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Formik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import { loginValidationSchema } from '../../utils/validation';
import { loginUser } from '../../utils/apiCalls';

const Login = () => {

    const navigate = useNavigate();
    const initialValues = {
        username: '',
        password: '',
        general: ''
    };

    const handleLogin = (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        loginUser(values)
            .then(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                navigate('/');
            })
            .catch(error => {
                const backendMsg = error?.response?.data?.message || 'Login failed.';
                setErrors({ general: backendMsg });
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-indigo-300 px-4">
            <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full">
                <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-8">
                    Login to Quiz
                </h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleLogin}
                    validateOnMount={true}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>

                            {errors.general && (
                                <div className='mb-2 flex items-center'>
                                    <div className="text-red-500 text-sm font-serif">{errors.general}</div>
                                </div>
                            )}

                            <div className="mb-6">
                                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                                    Username
                                </label>
                                <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className="flex justify-end items-center mb-6 text-sm text-indigo-600">
                                <a href="#" className="hover:underline">
                                    Forgot Password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="mt-8 text-center text-gray-600 text-sm">
                    Don't have an account?
                    <a href="#" className="text-indigo-600 hover:underline ml-1">
                        Sign up
                    </a>
                </p>
            </div>
        </div >
    );
};

export default Login;
