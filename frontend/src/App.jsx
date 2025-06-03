import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import {UserLayout,ProtectedLayout,AdminLayout,RoleLayout,QuizLayout} from './layouts'
import {Login,Register} from './pages/auth'
import {UserHome} from './pages/home'
import { CreateQuiz, UpdateQuiz, ViewQuiz } from './pages/quizzes/admin'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedLayout />}>

          <Route path='/' element={<RoleLayout />} >

            <Route path='/admin/quiz' element={<AdminLayout />}>
              <Route element={<QuizLayout />}>
                <Route index element={<ViewQuiz />} />
                <Route path='create' element={<CreateQuiz />} />
                <Route path='update/:id' element={<UpdateQuiz />} />
              </Route>
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