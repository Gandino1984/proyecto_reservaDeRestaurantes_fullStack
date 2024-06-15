import React from 'react'
import styles from './App.module.css'
import Navbar from './navbar/Navbar.jsx'
import {useNavigate, Link, BrowserRouter} from 'react-router-dom'
import Landing from './home/Landing.jsx'

function App() {

  return (
    <>
        <Landing />
    </>
  )
}

export default App
