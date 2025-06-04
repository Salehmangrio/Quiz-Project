import React from 'react'

const ViewDate = ({ title, date }) => {
    return (
        <p className="text-sm text-center text-gray-500">{title}: <span className='text-gray-800 font-semibold'>{new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</span> </p>
    )
}

export default ViewDate