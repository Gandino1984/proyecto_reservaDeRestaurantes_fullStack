import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Login.module.css'

function Login() {

  const [userType, setuserType] = useState("restaurant");
  const [userAction, setuserAction] = useState("login");

  const [clientIsLogin, setclientIsLogin] = useState(true);
  const [clientIsRegister, setclientIsRegister] = useState(false);

  const [restaurantIsLogin, setrestaurantIsLogin] = useState(false);
  const [restaurantIsRegister, setrestaurantIsregister] = useState(false);

  useEffect(() => {
    if (userType === "client") {
      setrestaurantIsLogin(false);
      setrestaurantIsregister(false);
    }
    if (userType === "restaurant") {
      setrestaurantIsLogin(true);
      setrestaurantIsregister(true);
      setclientIsLogin(false);
      setclientIsRegister(false);
    }
  }, [userType, clientIsLogin, clientIsRegister, restaurantIsLogin, restaurantIsRegister])

  return (
    <div className={styles.containerLogin}>
                  <form className={styles.formContainer} action="">
                          <h2>Iniciar Sesión:</h2>
                            {clientIsLogin && <input type="text" id="clientName" name="clientName" placeholder="Nombre de cliente" />}
                            {clientIsLogin && <input type="password" id="clientPasssword" name="clientPasssword" placeholder="Contraseña de cliente" />}
                            {clientIsRegister && <input type="password" id="repeatClientPasssword" name="clientRepeatPasssword" placeholder="Repetir contraseña de cliente" />}
                            {restaurantIsLogin && <input type="text" id="restaurantName" name="restaurantName" placeholder="Nombre de restaurante" />}
                            {restaurantIsLogin && <input type="password" id="restaurantPasssword" name="restaurantPasssword" placeholder="Contraseña de restaurante" />}
                            {restaurantIsRegister && <input type="password" id="restaurantRepeatPasssword" name="restaurantRepeatPasssword" placeholder="Repetir contraseña de restaurante" />}
                          <button className={styles.btn1}>ENTRAR</button>
                  </form>
    </div>
    
  )
}

export default Login
