import React from 'react'
import './App.css'
import Navbar from './navbar/Navbar.jsx'
import {useNavigate, Link, BrowserRouter} from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}

export default App
