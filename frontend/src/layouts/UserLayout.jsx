import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <>
            <nav className='w-full bg-gray-800 text-white p-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Welcome, {user ? user.name : 'Guest'}</h1>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => {
                        localStorage.removeItem('user')
                        navigate('/login',{ replace: true})
                    }}>Logout</button>
            </nav>
            <Outlet />
        </>
    )
}

export default UserLayout