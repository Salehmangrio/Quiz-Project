import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const AdminNavbar = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <div className='h-[70px] flex justify-between items-center bg-amber-200 px-6'>
            <h1 className=' font-serif text-black capitalize'>
                <Link to={'.'} className='text-xl font-extrabold'>{user.name}</Link></h1>
            <ul className='flex gap-4'>
                <li>
                    <NavLink to={'.'}>ViewQuiz</NavLink>
                </li>
                <li>
                    <NavLink to={'create'}>CreateQuiz</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AdminNavbar