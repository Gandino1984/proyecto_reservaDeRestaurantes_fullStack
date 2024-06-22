import React from 'react';
import { useState, useContext } from 'react';
import './InfoModal.css';
import GeneralContext from '../../context/GeneralContext';

const InfoModalSuccess = ({onClose}) => {

    const { setmostrarReservasRestauranteOpen, 
      infoModalSuccessOpen,
      setinfoModalSuccessOpen
     } = useContext(GeneralContext);

  return (
    <div className="modal">
      <div className="modal-content success">
        <div className="modal-icon success-icon">
          <ion-icon name="checkmark-circle-outline"></ion-icon>
        </div>
        <div className="modal-text">    
          <h3>¡Vamos!</h3>
          <p>éxito</p>
          {/* <p>{message}</p> */}
        </div>
        <button className="modal-button" onClick={()=>setinfoModalSuccessOpen(false)}>OK</button>
      </div>
    </div>
  );
};

export default InfoModalSuccess;
