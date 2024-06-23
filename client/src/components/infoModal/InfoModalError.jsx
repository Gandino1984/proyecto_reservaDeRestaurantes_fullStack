import React from 'react';
import './InfoModal.css';
import GeneralContext from '../../context/GeneralContext';
import { useState, useContext } from 'react';
import logoImg from '../../images/guindilla.png';

const InfoModalError = () => {

  const { setmostrarReservasRestauranteOpen, 
    infoModalErrorOpen,
    setinfoModalErrorOpen
   } = useContext(GeneralContext);

   setTimeout(() => {
    setinfoModalErrorOpen(false); 
    }, "4500");

  return (
    <div className="modal">
      <div className="modal-content error">
            <div className='logoContainerInfoModal'>
                  <img src={logoImg} alt="logo image" />
            </div>
            <div className="modal-text">
              <h3>¡Ouch!</h3>
              <p>Hubo un error en el inicio de sesión.</p>
            </div>
      </div>
    </div>
  );
};

export default InfoModalError;