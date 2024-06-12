import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Login.module.css'

function Login({userType}) {

  const [clientIsLogin, setclientIsLogin] = useState(true);
  const [clientIsRegister, setclientIsRegister] = useState(false);
  const [restaurantIsLogin, setrestaurantIsLogin] = useState(false);
  const [restaurantIsRegister, setrestaurantIsRegister] = useState(false);

  const [userAction, setUserAction] = useState(null);

  function onChangeActionHandler(e){
      if(e.target.value === "login" && userType === "client"){
        setclientIsLogin(true)
        setclientIsRegister(false)
        setrestaurantIsLogin(false)
        setrestaurantIsRegister(false)
        setUserAction("login")
      }
      if(e.target.value === "register" && userType === "client"){
        setclientIsLogin(false)
        setclientIsRegister(true)
        setrestaurantIsLogin(false)
        setrestaurantIsRegister(false)
        setUserAction("register")
      }
      if(e.target.value === "login" && userType === "restaurant"){
        setclientIsLogin(false)
        setclientIsRegister(false)
        setrestaurantIsLogin(true)
        setrestaurantIsRegister(false)
        setUserAction("login")
      }
      if(e.target.value === "register" && userType === "restaurant"){
        setclientIsLogin(false)
        setclientIsRegister(true)
        setrestaurantIsLogin(false)
        setrestaurantIsRegister(false)
        setUserAction("register")
      }
  }

  return (
    <div className={styles.containerLogin}>
                  <form className={styles.formContainer} action="">
                          <div className={styles.menuContainer}>
                                {userAction === "login" && <h2>Iniciar Sesión:</h2>}
                                {userAction === "register" && <h2>Registrar Cuenta:</h2>}
                                <div className={styles.radios} onChange={e=>onChangeActionHandler(e)}>
                                    <input className={styles.radioOption} id="loginOption" name='userAction' type="radio" value="login" />
                                    <input className={styles.radioOption} id="registerOption" name='userAction' type="radio" value="register" />
                                </div>
                          </div>
                          
                          {userType === "client" && 
                            <div>
                              <input type="text" id="clientName" name="clientName" placeholder="Nombre de cliente" />
                              <input type="password" id="clientPasssword" name="clientPasssword" placeholder="Contraseña de cliente" />
                            </div>}
                          {clientIsRegister && <input type="password" id="repeatClientPasssword" name="clientRepeatPasssword" placeholder="Repetir contraseña de cliente" />}
                          
                          {userType === "restaurant" && 
                            <div>
                              <input type="text" id="restaurantName" name="restaurantName" placeholder="Nombre de restaurante" />
                              <input type="password" id="restaurantPasssword" name="restaurantPasssword" placeholder="Contraseña de restaurante" />
                            </div>
                          }
                          
                          {restaurantIsRegister && <input type="password" id="restaurantRepeatPasssword" name="restaurantRepeatPasssword" placeholder="Repetir contraseña de restaurante" />}
                          
                          <button className={styles.btn1}>ENTRAR</button>
                  </form>
    </div>
    
  )
}

export default Login
