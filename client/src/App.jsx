import React from 'react'
import './App.css'
import Landing from './home/Landing.jsx'
import StatesProvider from './context/StatesProvider.jsx'

function App() {

  return (
    <StatesProvider>
      <Landing className='landing'/>
    </StatesProvider>
  )
}

export default App
