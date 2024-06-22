import React, { useContext } from 'react';
import './Navbar.css'; 
import UserCard from './UserCard.jsx';
import GeneralContext from '../context/GeneralContext.jsx'
import logoImg from './guindilla.png';

function Navbar() {
  const { userLoggedOrRegistered, setLoginFormOpenHandler, setshowRestaurantsOpen } = useContext(GeneralContext);

  function empezarBtnClick(e) {
    e.preventDefault();
    if(userLoggedOrRegistered===false){
        setLoginFormOpenHandler(true)
        setshowRestaurantsOpen(false)    
    }else{
        alert("ya estás loggeado")
    }
}

  return (
    <div className='containerNavbar'>
        <div className='containerTitleNavbar'>
            <p className='titleNavBar'>jateko<span className='and'>prest</span></p>
            <div className='logoContainerNavbar'>
                <img src={logoImg} alt="logo image" />
            </div>
        </div>
      { !userLoggedOrRegistered && <button className='empezarBtn' onClick={e=>empezarBtnClick(e)}>EMPEZAR</button>}
      { userLoggedOrRegistered && <UserCard />}
    </div>
  );
}

export default Navbar;
