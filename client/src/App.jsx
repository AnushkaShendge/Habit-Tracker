import { useState } from 'react'
import './index.css'
import { Route , Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Dashboard from './pages/Dashboard'
import AddHabitForm from './pages/AddHabitForm'
import Statistics from './pages/Statistics'
import Calendar from './pages/Calendar'
import HomePage from './pages/Home'
import Cummunity from './pages/Cummunity'

axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials = true;

function App() {
  return (
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/addHabit" element={<AddHabitForm />} />
          <Route path="/dashboard/statistics" element={<Statistics />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/home" element={<HomePage />} />
          <Route path="/dashboard/post" element={<Cummunity />} />
        </Routes>
      </UserContextProvider>
  )
}

export default App
