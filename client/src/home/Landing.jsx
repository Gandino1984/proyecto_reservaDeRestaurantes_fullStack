import React from 'react'
import stylesApp from '../App.module.css'
import styles from './Landing.module.css'
import bg1 from '../images/bgHome.jpg'

function Landing() {
  return (
        <div className={styles.containerLanding}>
            <div className={styles.Navbar}>
                <h1>Book-it</h1>
                <div className={styles.btnContainer}>
                    <button className={stylesApp.btn}>CLIENTES</button>
                    <button className={stylesApp.btn}>RESTAURANTES</button>
                </div>
                
            </div>
            <div className={styles.background} />
        </div>
  )
}

export default Landing
