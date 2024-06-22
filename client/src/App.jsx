import React from 'react'
import './App.css'
import Landing from './home/Landing.jsx'
import StatesProvider from './context/StatesProvider.jsx'

function App() {

  return (
    <StatesProvider>
      <Landing />
    </StatesProvider>
  )
}

export default App
