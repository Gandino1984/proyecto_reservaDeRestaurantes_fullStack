import React from 'react'
import { useState } from 'react'
import styles from './Login.module.css'
import stylesApp from '../App.module.css'

function Login() {
  return (
    <div className={styles.containerLogin}>
            <div className={styles.wrapper}>
                <form className={styles.formContainer} action="">
                    <h2>Iniciar sesión</h2>
                    <input type="text" placeholder="Nombre de cliente" />
                    <input type="password" placeholder="Contraseña" />
                    <button className={stylesApp.btnPurple}>INICIAR SESIÓN</button>
                </form>
                <div className={styles.btnContainer}>
                                <button className={stylesApp.btnWhite}>CLIENTES</button>
                                <button className={stylesApp.btnWhite}>RESTAURANTES</button>
                </div>
            </div>
    </div>
    
  )
}

export default Login
