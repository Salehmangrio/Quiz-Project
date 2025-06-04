import React from 'react'
import { Link } from 'react-router-dom'

const StyledLink = ({ to, quiz = {}, text }) => {
    return (
        <Link
            to={to}
            className={`w-full py-1 text-white shadow-[0_0_6px_1px_yellow] bg-emerald-500 rounded hover:bg-emerald-600`}
            state={{ title: quiz?.title, description: quiz?.description, time: quiz?.timeLimit }}
        >
            {text}
        </Link>
    )
}

export default StyledLink