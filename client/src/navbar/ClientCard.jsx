import React from 'react'
import styles from './ClientCard.module.css'

function ClientCard() {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.userAvatar}>
                <img src="../images/png/mexicana.png" alt="user image" />
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
