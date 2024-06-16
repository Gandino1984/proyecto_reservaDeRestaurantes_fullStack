import React from 'react'
import styles from './ClientCard.module.css'
import userImg from './user.png'

function ClientCard() {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.userAvatar}>
                <img src={userImg} alt="user image" />
            </div>
            <div className={styles.userDetails}>
                <p>Nombre de usuario</p>
                <p>Correo</p>
                <button>MIS RESERVAS</button>
            </div>
        </div>
    </div>
  )
}

export default ClientCard
