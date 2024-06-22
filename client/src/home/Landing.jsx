import React from 'react'
import './Landing.css'
import Navbar from '../navbar/Navbar.jsx'
import Hero from './Hero.jsx'

function Landing({children}){

  return (
        <div className='containerLanding'>
                <div className='backgroundLanding' />
             
                <Navbar />
                <Hero />
        </div>
  )
}

export default Landing
