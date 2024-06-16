import React from 'react'
import { useState, useEffect } from 'react'
import { register, login } from "../utils/userFetch"
import styles from "./Login.module.css"

function Login({userType, loginFormStateChangeHandler}) {
  const [clientIsLogin, setclientIsLogin] = useState(true);
  const [clientIsRegister, setclientIsRegister] = useState(false);
  const [restaurantIsLogin, setrestaurantIsLogin] = useState(false);
  const [restaurantIsRegister, setrestaurantIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [userAction, setUserAction] = useState("login");
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Password_repeat: ""
});
const [formState, setformState] = useState("");


 useEffect (() => {
    //default state del formulario inicial
   //si el selector de tipo de usuario del navbar no ha sido presionado 
    //el formulario. Para cualquier opción se muestra.  
    if(userType === ""){
      setformState("inactiveForm")
    }else{
      setformState("activeForm")
      loginFormStateChangeHandler();
    }

 },[userType]) 


  //estados de los componentes del formulario inicial



  const handleUserData =(e) =>{
    e.preventDefault();
    const data = e.target.value;
    const key = e.target.name;
    setUserData(prevData => {
        return {
            ...prevData,
            [key]:data
        }
    })
  }


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
        setUserData(prevData => {
          return {
              ...prevData,
              IsClient:1
          }
      })
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
        setUserData(prevData => {
          return {
              ...prevData,
              IsClient:0
          }
      })
      }
  }

  async function loginClickHandler(e){
    e.preventDefault();
    if (clientIsRegister || restaurantIsRegister){
      result = await register(userData);
      if (!result.error) {
          setError("se ha registrado correctamente");
      }
      else {
          setError(result.error);
      }
    }
    if (clientIsLogin || restaurantIsLogin){
      result = await login(userData);
      if (!result.error) {
        setError("login correcto");
    }
    }
};




  return (
    <div className={styles.containerLogin}>
                  <form className={`${styles.formContainer} ${styles[formState]}`} onSubmit={loginClickHandler}>
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
                              <input type="text" id="Name" name="Name" placeholder="Nombre de cliente" value={userData.Name} onChange={handleUserData} />
                              <input type="password" id="clientPasssword" name="Password" placeholder="Contraseña de cliente" value={userData.Password} onChange={handleUserData} />
                            </div>}
                          {clientIsRegister &&  <> <input type="password" id="repeatClientPasssword" name="Password_repeat" placeholder="Repetir contraseña de cliente" value={userData.Password_repeat} onChange={handleUserData} />  <input type="Email" id="Email" name="Email" placeholder="Escribe tu correo electronico" value={userData.Email} onChange={handleUserData}/> </>}
                          
                          {userType === "restaurant" && 
                            <div className={styles.inputsUserLogin}>
                              <input type="text" id="restaurantName" name="restaurantName" placeholder="Nombre de restaurante"value={userData.Name} onChange={handleUserData} />
                              <input type="password" id="restaurantPasssword" name="restaurantPasssword" placeholder="Contraseña de restaurante"value={userData.Password} onChange={handleUserData} />
                            </div>
                          }
                          {restaurantIsRegister && <><input type="password" id="restaurantRepeatPasssword" name="Password_repeat" placeholder="Repetir contraseña de restaurante" value={userData.Password_repeat} onChange={handleUserData} /> <input type="Email" id="Email" name="Email" placeholder="Escribe tu correo electronico"value={userData.Email} onChange={handleUserData} /> </>}
                          
                          <button className={styles.btn1}>ENTRAR</button>
                  </form>
    </div>
    
  )
}

export default Login
