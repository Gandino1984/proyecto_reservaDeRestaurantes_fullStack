import React from 'react'
import bg1 from '../images/bgHome.jpg'

function Landing() {
  return (
    <div className='containerLanding'>
      <h1>Bookit</h1>
      <div className='background' style={{backgroundImage: `url(${bg1})`}}>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam ducimus vitae repellat. Odit excepturi quo numquam ea ad explicabo incidunt expedita autem pariatur, corrupti repudiandae nobis amet in repellendus minus.</p>
      </div>
    </div>
  )
}

export default Landing
