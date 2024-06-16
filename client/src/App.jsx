import React from 'react'
import styles from './App.module.css'
import Navbar from './navbar/Navbar.jsx'
import {useNavigate, Link, BrowserRouter} from 'react-router-dom'
import Landing from './home/Landing.jsx'
import { UserProvider } from './context/Usercontext.jsx'

function App() {

  return (
    <UserProvider>
      <Landing />
    </UserProvider>
  )
}

export default App
