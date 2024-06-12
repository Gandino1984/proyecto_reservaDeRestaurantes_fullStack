import React from 'react'
import { useState } from 'react'
import styles from './Login.module.css'

function Login() {
  return (
    <div className={styles.containerLogin}>
                  <form className={styles.formContainer} action="">
                          <h2>Iniciar Sesión:</h2>
                            <input type="text" id="clientName" name="clientName" placeholder="Nombre de cliente" />
                            <input type="password" id="clientPasssword" name="clientPasssword" placeholder="Contraseña de cliente" />
                          <button className={styles.btn1}>INICIAR SESIÓN</button>
                  </form>
            
    </div>
    
  )
}

export default Login
