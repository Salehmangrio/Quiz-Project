import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { UserHome } from './pages/home'
import { Login, Register } from './pages/auth'
import { UserLayout, ProtectedLayout, AdminLayout, RoleLayout, QuizLayout } from './layouts'
import { AddQuestion, CreateQuiz, UpdateQuestion, UpdateQuiz, ViewQuestions, ViewQuiz } from './pages/quizzes/admin'

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
                <Route path=":quizId/add-question" element={<AddQuestion />} />
                <Route path=":quizId/view-questions" element={<ViewQuestions />} />
                <Route path=":quizId/view-questions/edit" element={<UpdateQuestion />} />
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