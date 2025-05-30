import React from 'react'
import {
  createBrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="/about" element={<h1>About Us</h1>} />
        <Route path="/contact" element={<h1>Contact Us</h1>} />
      </Routes>
    </Router>
  )
}

export default App