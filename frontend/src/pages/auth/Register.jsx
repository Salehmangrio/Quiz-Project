import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUser } from '../../utils/apiCalls';
import { registerValidationSchema } from '../../utils/validation';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);

    const initialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'user',
        general: ''
    };

    const handleRegister = (values, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        registerUser(values)
            .then(() => {
                navigate('/login');
            })
            .catch(error => {
                const backendMsg = error?.response?.data?.message || 'Registration failed.';
                setErrors({ general: backendMsg });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-indigo-300 p-10">
            <div className="bg-white rounded-3xl md:shadow-2xl p-8 max-w-3xl w-[85vw]  transform transition-all md:hover:scale-105 duration-300">
                <h2 className="md:text-4xl text-xl font-bold text-indigo-700 text-center mb-8 tracking-tight">
                    Join the Quiz Adventure
                </h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={registerValidationSchema}
                    onSubmit={handleRegister}
                    validateOnMount={true}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            {errors.general && (
                                <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm font-medium flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {errors.general}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                        Full Name
                                    </label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                        placeholder="Enter your name"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                {/* Right Column */}
                                <div>
                                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                                        Username
                                    </label>
                                    <Field
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                        placeholder="Choose a username"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                {/* Left Column */}
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                        Email Address
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                        placeholder="your.email@example.com"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                {/* Right Column */}
                                <div className="relative">
                                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                                        Password
                                    </label>
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                        placeholder="Create a password"
                                        autoComplete="off"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                                        tabIndex={-1}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                {/* Full width on bottom: role select */}
                                <div className="md:col-span-2">
                                    <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
                                        Role
                                    </label>
                                    <Field
                                        as="select"
                                        name="role"
                                        id="role"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                    >
                                        <option value="user">Student</option>
                                        <option value="admin">Teacher</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Registering...
                                    </span>
                                ) : (
                                    'Register Now'
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="mt-6 text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition duration-200">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
