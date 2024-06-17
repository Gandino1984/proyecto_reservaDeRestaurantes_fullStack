import React from 'react'
import styles from './App.module.css'
import Navbar from './navbar/Navbar.jsx'
import {useNavigate, Link, BrowserRouter} from 'react-router-dom'
import Landing from './home/Landing.jsx'
// import { UserProvider } from './context/Usercontext.jsx'
import MostrarReservas from './components/reserva/MostrarReservas.jsx'
import Login from './home/Login.jsx'
function App() {

  return (
    <StatesProvider>
      <Login />
      <MostrarReservas />
      {/* <Landing /> */}
    </StatesProvider>
  )
}

export default App
