import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import ProtectedLayout from './layouts/ProtectedLayout'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import RoleLayout from './layouts/RoleLayout'

import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import AdminHome from './pages/home/AdminHome'
import UserHome from './pages/home/UserHome'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedLayout />}>

          <Route path='/' element={<RoleLayout />} >

            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
            </Route>

            <Route path='/user' element={<UserLayout />}>
              <Route index element={<UserHome />} />
            </Route>

          </Route >

        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router >
  )
}

export default App