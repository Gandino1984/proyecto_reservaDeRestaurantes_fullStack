import React from 'react';
import { useState, useContext } from 'react';
import './InfoModal.css';
import GeneralContext from '../../context/GeneralContext';
import logoImg from '../../images/guindilla.png';

const InfoModalSuccess = ({onClose}) => {

    const { setmostrarReservasRestauranteOpen, 
      infoModalSuccessOpen,
      setinfoModalSuccessOpen
     } = useContext(GeneralContext);

     setTimeout(() => {
      setinfoModalSuccessOpen(false);
      }, "3500");
    

  return (
    <div className="modal">
        <div className="modal-content success">
            <div className='logoContainerInfoModal'>
                  <img src={logoImg} alt="logo image" />
            </div>
            <div className="modal-text">    
                <h2>¡Bienvenida!</h2>
            </div>
        </div>
    </div>
  );
};

export default InfoModalSuccess;
