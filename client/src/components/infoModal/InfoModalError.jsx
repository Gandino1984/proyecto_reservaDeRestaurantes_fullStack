import React from 'react';
import './InfoModal.css';
import GeneralContext from '../../context/GeneralContext';
import { useState, useContext } from 'react';

const InfoModalError = () => {

  const { setmostrarReservasRestauranteOpen, 
    infoModalErrorOpen,
    setinfoModalErrorOpen
   } = useContext(GeneralContext);

  return (
    <div className="modal">
      <div className="modal-content error">
        <div className="modal-icon error-icon">
          <ion-icon name="close-circle-outline"></ion-icon>
        </div>
        <div className="modal-text">
          <h3>¡Ouch!</h3>
          <p>error</p>
          {/* <p>{message}</p> */}
        </div>
        <button className="modal-button" onClick={()=>setinfoModalErrorOpen(false)}>OK</button>
      </div>
    </div>
  );
};

export default InfoModalError;