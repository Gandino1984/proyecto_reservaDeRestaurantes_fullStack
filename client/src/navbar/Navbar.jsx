import React, { useContext } from 'react';
import './Navbar.css'; 
import UserCard from './UserCard.jsx';
import GeneralContext from '../context/GeneralContext.jsx'
import logoImg from './guindilla.png';
import InfoModalSuccess from '../components/infoModal/InfoModalSuccess.jsx';
import InfoModalError from '../components/infoModal/InfoModalError.jsx';

function Navbar() {
  const { userLoggedOrRegistered, 
    setLoginFormOpenHandler, 
    setshowRestaurantsOpen,
    infoModalSuccessOpen,
    setinfoModalSuccessOpen,
    infoModalErrorOpen,
    setinfoModalErrorOpen
  } = useContext(GeneralContext);

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
            <p className='titleNavBar'>Jateko<span className='and'>prest</span></p>
            <div className='logoContainerNavbar'>
                <img src={logoImg} alt="logo image" />
            </div>
        </div>
        {infoModalSuccessOpen && <InfoModalSuccess />}
        {infoModalErrorOpen && <InfoModalError />}
      { !userLoggedOrRegistered && <button className='empezarBtn' onClick={e=>empezarBtnClick(e)}>EMPEZAR</button>}
      { userLoggedOrRegistered && <UserCard />}
    </div>
  );
}

export default Navbar;
