import React from 'react'
import { Link } from 'react-router-dom'
import { buttonStyles } from '../utils/styles'
const StyledLink = ({ to, quiz = {}, text }) => {
    return (
        <Link
            to={to}
            className={buttonStyles}
            state={{ title: quiz?.title, description: quiz?.description, time: quiz?.timeLimit }}
        >
            {text}
        </Link>
    )
}

export default StyledLink