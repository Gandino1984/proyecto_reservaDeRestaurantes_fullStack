import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Login.module.css'

function Login({userType}) {

  const [user, setuser] = useState(userType);
  console.log("Login:userType= ", userType)

  const [userAction, setuserAction] = useState("login");

  const [clientIsLogin, setclientIsLogin] = useState(true);
  const [clientIsRegister, setclientIsRegister] = useState(false);

  const [restaurantIsLogin, setrestaurantIsLogin] = useState(false);
  const [restaurantIsRegister, setrestaurantIsregister] = useState(false);

  // faltan comprobaciones aquí
  useEffect((user, userAction) => {
    if (user === "client") {
        if(userAction === "login"){
          setrestaurantIsLogin(false);
          setrestaurantIsregister(false);
          setclientIsLogin(true);
          setclientIsRegister(false);  
        }else{
          setrestaurantIsLogin(false);
          setrestaurantIsregister(false);
          setclientIsLogin(false);
          setclientIsRegister(true);
        }  
    }
    if (user === "restaurant") {
      if(userAction === "login"){
        setrestaurantIsLogin(true);
        setrestaurantIsregister(false);
        setclientIsLogin(false);
        setclientIsRegister(false);  
      }else{
        setrestaurantIsLogin(false);
        setrestaurantIsregister(true);
        setclientIsLogin(false);
        setclientIsRegister(false);
      }  
  }

  }, [user, userAction, clientIsLogin, clientIsRegister, restaurantIsLogin, restaurantIsRegister])

  return (
    <div className={styles.containerLogin}>
                  <form className={styles.formContainer} action="">
                          <div className={styles.menuContainer}>
                                {userAction === "login" && <h2>Iniciar Sesión:</h2>}
                                {userAction === "register" && <h2>Registrar Cuenta:</h2>}
                                <div className={styles.radios} onChange={e=>setuserAction(e.target.value)}>
                                    <input className={styles.radioOption} id="loginOption" name='userAction' type="radio" value="login" />
                                    <input className={styles.radioOption} id="registerOption" name='userAction' type="radio" value="register" />
                                </div>
                          </div>
                          
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
