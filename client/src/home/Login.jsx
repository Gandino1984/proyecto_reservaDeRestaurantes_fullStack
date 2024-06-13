import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Login.module.css'

function Login({userType, loginFormStateChangeHandler}) {

  //default state del formulario inicial
  let formState  = "inactiveForm";

  //si el selector de tipo de usuario del navbar no ha sido presionado 
  //el formulario. Para cualquier opción se muestra.
  if(userType === ""){
    formState = "inactiveForm"
  }else{
    formState = "activeForm"
    loginFormStateChangeHandler();
  }

  //estados de los componentes del formulario inicial
  const [clientIsLogin, setclientIsLogin] = useState(true);
  const [clientIsRegister, setclientIsRegister] = useState(false);
  const [restaurantIsLogin, setrestaurantIsLogin] = useState(false);
  const [restaurantIsRegister, setrestaurantIsRegister] = useState(false);

  const [userAction, setUserAction] = useState("login");


  function onChangeActionHandler(e){
      if(e.target.value === "login" && userType === "client"){
        setUserAction("login")
        setclientIsLogin(true)
        setclientIsRegister(false)
        setrestaurantIsLogin(false)
        setrestaurantIsRegister(false)
      }
      if(e.target.value === "register" && userType === "client"){
        setUserAction("register")
        setclientIsLogin(false)
        setclientIsRegister(true)
        setrestaurantIsLogin(false)
        setrestaurantIsRegister(false)
      }
      if(e.target.value === "login" && userType === "restaurant"){
        setUserAction("login")
        setclientIsLogin(false)
        setclientIsRegister(false)
        setrestaurantIsLogin(true)
        setrestaurantIsRegister(false)
      }
      if(e.target.value === "register" && userType === "restaurant"){
        setclientIsLogin(false)
        setclientIsRegister(false)
        setrestaurantIsLogin(false)
        setrestaurantIsRegister(true)
        setUserAction("register")
      }
  }

  return (
    <div className={styles.containerLogin}>
                  <form className={`${styles.formContainer} ${styles[formState]}`} action="">
                          <div className={styles.menuContainer}>
                                <div className={styles.radios} onChange={e=>onChangeActionHandler(e)}>
                                    <div className={styles.labels}>
                                      <label  className={styles.labelLogin} htmlFor="loginOption">Iniciar Sesión</label>
                                      <label  className={styles.labelRegister} htmlFor="registerOption">Registrar Cuenta</label>
                                    </div>  
                                    <input className={styles.radioOption} value="login" id="loginOption" name='userAction' type="radio"  />
                                    <input className={styles.radioOption} value="register" id="registerOption" name='userAction' type="radio"  />
                                </div>
                          </div>
                          
                          {userType === "client" && 
                            <div className={styles.inputsUserLogin}>
                              <input type="text" id="clientName" name="clientName" placeholder="Nombre de cliente" />
                              <input type="password" id="clientPasssword" name="clientPasssword" placeholder="Contraseña de cliente" />
                            </div>}
                          {clientIsRegister && <input type="password" id="repeatClientPasssword" name="clientRepeatPasssword" placeholder="Repetir contraseña de cliente" />}
                          
                          {userType === "restaurant" && 
                            <div className={styles.inputsUserLogin}>
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
