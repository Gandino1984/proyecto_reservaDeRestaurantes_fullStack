import React from 'react';
import './InfoModal.css';
import GeneralContext from '../../context/GeneralContext';
import { useState, useContext } from 'react';
import logoImg from '../../images/guindilla.png';

const InfoModalErrorReserva = () => {

  const { setmostrarReservasRestauranteOpen, 
    infoModalErrorOpen,
    setinfoModalErrorReservaOpen
   } = useContext(GeneralContext);

   setTimeout(() => {
    setinfoModalErrorReservaOpen(false); 
    }, "4500");

  return (
    <div className="modal">
      <div className="modal-content error">
            <div className='logoContainerInfoModal'>
                  <img src={logoImg} alt="logo image" />
            </div>
            <div className="modal-text">
              <h3>¡Ouch!</h3>
              <p>Para reservar inicia sesión.</p>
            </div>
      </div>
    </div>
  );
};

export default InfoModalErrorReserva;   