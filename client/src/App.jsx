import React from 'react'
import styles from './App.module.css'
import Navbar from './navbar/Navbar.jsx'
import {useNavigate, Link, BrowserRouter} from 'react-router-dom'
import Landing from './home/Landing.jsx'

function App() {

  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Landing />
      </div>
      
    </BrowserRouter>
  )
}

export default App
