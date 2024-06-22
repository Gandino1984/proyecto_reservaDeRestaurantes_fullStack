import React from 'react'
import {useState, useContext} from 'react'
import './Landing.css'
import bg1 from '../images/bgHome.jpg'
import Login from './Login.jsx'
import Navbar from '../navbar/Navbar.jsx'
import Hero from './Hero.jsx'


function Landing({children}){

  return (
        <div className='containerLanding'>
                <div className='background' />
                <Navbar />
                <Hero />
        </div>
  )
}

export default Landing
