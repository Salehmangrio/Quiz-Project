import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
    const activeStyle = ({ isActive }) => isActive ? "font-bold text-rose-500" : ""
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <div className='h-[60px] md:h-[70px] flex justify-between items-center bg-amber-200 md:px-6 px-2'>
            <h1 className=' font-serif text-black capitalize'>
                <Link to={'.'} className='text-xl font-extrabold' >{user.name}</Link></h1>
            <ul className='flex gap-4 items-center'>
                <li>
                    <NavLink to={'.'} end className={activeStyle} >ViewQuiz</NavLink>
                </li>
                <li>
                    <NavLink to={'create'} className={activeStyle}>CreateQuiz</NavLink>
                </li>
                <li>
                    <button
                        className='w-14 bg-rose-600 h-14 text-white rounded-full  border-2'
                        onClick={
                            () => {
                                localStorage.removeItem('user')
                                localStorage.removeItem('token')
                                navigate('/login')
                            }
                        }
                    >
                        Logout
                    </button>
                </li>
            </ul>

        </div>
    )
}

export default AdminNavbar