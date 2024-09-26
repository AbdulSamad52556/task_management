import { useState } from 'react'
import './App.css'
import Login from './components/login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup.jsx';
import Dashboard from './components/dashboard.jsx';
import Tasks from './components/tasks.jsx';
import ProtectedRoute from './components/protectedroute.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/tasks" element={<ProtectedRoute component={Tasks} />} />
        </Routes>
    </Router>
  )
}

export default App
