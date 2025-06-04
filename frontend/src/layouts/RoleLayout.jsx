import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RoleLayout = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const location = useLocation()

  // No user? Redirect to login
  if (!user) return <Navigate to="/login" replace />

  // At root '/', redirect to role-based route
  if (location.pathname === '/') {
    if (user.role === 'admin') return <Navigate to="/admin/quiz" replace />
    else return <Navigate to="/user/quiz" replace />
  }

  // Otherwise render child routes like /admin or /user
  return <Outlet />
}

export default RoleLayout
