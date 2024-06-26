import { useState } from 'react'
import './index.css'
import { Route , Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
