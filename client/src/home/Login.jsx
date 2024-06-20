import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { login, register} from "../utils/userFetch"
import styles from './Login.module.css'
import GeneralContext from '../context/GeneralContext'
import { saveToken } from '../utils/local' 
import { getAllRestaurantes } from '../utils/restauranteFetch'
import { getAllReservas} from  '../utils/reservaFetch'

function Login({closeBtnClick}) {

 const { setUser, 
  setLoginFormOpenHandler, 
  userIsClient, 
  userIsRestaurant, 
  userActionIsLogin, 
  userActionIsRegister, 
  setuserIsClient,
  setuserIsRestaurant,
  setuserActionIsLogin,
  setuserActionIsRegister,
  userLoggedOrRegistered,
  setuserLoggedOrRegistered,
  setshowRestaurantsOpen,
  reservasRestaurantOpen,
  setReservasRestaurantOpen,
  reservas,
  setReservas,
  restaurantes,
  setRestaurantes,
  userId, 
  setUserId

} = useContext(GeneralContext);

 const [error, setError] = useState("");
 
 const [userData, setUserData] = useState({
  Name: "",
  Email: "",
  Password: "",
  Password_repeat: "",
  Is_Client:1
});

useEffect(() => {
  if (userActionIsRegister) {
      setUserData(prevData => ({
          ...prevData,
          Is_Client: userIsClient ? 1 : 0

      }));
  }
}, [userIsClient, userActionIsRegister]);

 let clientIsLogin = true;
 let clientIsRegister = false;
 let restaurantIsLogin = false;
 let restaurantIsRegister = false;
   
  if(userActionIsLogin && userIsClient){
    clientIsLogin = true;
    clientIsRegister = false;
    restaurantIsLogin = false;
    restaurantIsRegister = false;
  }
  if(userActionIsRegister && userIsClient){
    clientIsLogin = true;
    clientIsRegister = true;
    restaurantIsLogin = false;
    restaurantIsRegister = false;
  }
  if(userActionIsLogin && userIsRestaurant){
    clientIsLogin = false;
    clientIsRegister = false;
    restaurantIsLogin = true;
    restaurantIsRegister = false;
  }
  if(userActionIsRegister && userIsRestaurant){
    clientIsLogin = false;
    clientIsRegister = false;
    restaurantIsLogin = true;
    restaurantIsRegister = true;
  }
  
  function userTypeHandler(e){
    if(e.target.value === "client"){
      setuserIsClient(true);
      setuserIsRestaurant(false);
    }else{
      setuserIsClient(false);
      setuserIsRestaurant(true);
    }
  }

  function userActionHandler(e){
    if(e.target.value === "login"){
      setuserActionIsLogin(true);
      setuserActionIsRegister(false);
    }else{
      setuserActionIsLogin(false);
      setuserActionIsRegister(true);
    }
  }

  const handleUserData =(e) =>{
    console.log("holass")
    e.preventDefault();
    const data = e.target.value;
    const key = e.target.name;
    setUserData(userData => {
        return {
            ...userData,
            [key]:data
        }
    })
}

async function loginClickHandler(e) {
  console.log("login handler")
  e.preventDefault();
  let result;  // Asegúrate de declarar result aquí
  if (userActionIsRegister) {
      result = await register(userData);
      console.log(result);
      if (!result.error) {
          setError("se ha registrado correctamente");

          setLoginFormOpenHandler(e)
          setuserLoggedOrRegistered(true)
          setshowRestaurantsOpen(true)
        
      } else {
        setuserLoggedOrRegistered(false)
          setError(result.error);
      }
  }
  if (userActionIsLogin) {
      result = await login(userData);
      console.log("resultado login", result)
      if (!result.error) {
          setError("login correcto");
          setUser(result.data); 
          saveToken(result.data.token);
          console.log("user", result.data)

          setLoginFormOpenHandler(e)
          setuserLoggedOrRegistered(true)
          setshowRestaurantsOpen(true)

        
      } else {
          setError(result.error);
          setuserLoggedOrRegistered(false)
      }
  }
};

 
const handleMisReservas = async (userId) => {
  try {
    const response = await getAllReservas(userId);
      const data = response.data;
      console.log("handleMisReservas: ", data);
      
      if (Array.isArray(data)) {
        setReservas(data);
      } else {
      console.error('La respuesta de la API no contiene un array:', response);
    }
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
  }}
  
  const handleMisRestaurantes = async (userId) => {
    try {
      alert('handleMisRestaurantes')
      const response = await getAllRestaurantes(userId);
      const data = response.data;
      console.log("handleMisRestaurantes: ", data);
      if (Array.isArray(data)) {
        setRestaurantes(data);
      } else {
        alert('La respuesta de la API no contiene un array:')  
        console.error('La respuesta de la API no contiene un array:', response);
      }
    } catch (error) {
      alert('Error al obtener las reservas:')
      console.error('Error al obtener las reservas:', error);
    }}
    
    useEffect(() => {
      handleMisReservas();
      handleMisRestaurantes();
    }, []);

function submitClickHandler(e){
  e.preventDefault();
}


  return (
    <div className={styles.container}>
      <div className={styles.login}>
                
                <form onSubmit={loginClickHandler} className={styles.formContainer}>
                            <div>
                                <button type="button" className={styles.closeBtn} onClick={setLoginFormOpenHandler}>
                                        <ion-icon name="close-circle-outline"></ion-icon>
                                </button>
                            </div>
                        <div className={styles.userTypeBtnContainer}>
                              <div className={styles.userTypeLabels}>
                                  {userIsClient && <label  className={styles.labelRestaurant} htmlFor="restaurantOption"><ion-icon className={styles.chevronBack} name="chevron-back"></ion-icon>Restaurantes</label>}
                                  {userIsRestaurant && <label  className={styles.labelClient} htmlFor="clientOption"><ion-icon className={styles.chevronBack} name="chevron-back"></ion-icon>Clientes</label>}
                              </div>                   
                              <div className={styles.userTypeRadios} onChange={e=>userTypeHandler(e)}>
                                    <input className={styles.userTypeRadioOption} value="client"  id="clientOption" name='userType' type="radio" />
                                    <input className={styles.userTypeRadioOption} value="restaurant" id="restaurantOption" name='userType' type="radio" />
                              </div>   

                        </div>


                        <div className={styles.menuContainer}>
                              <div className={styles.userActionRadios} onChange={e=>userActionHandler(e)}>
                                    <input className={styles.userActionRadioOption} value="login" id="loginOption" name='userAction' type="radio"  />
                                    <input className={styles.userActionRadioOption} value="register" id="registerOption" name='userAction' type="radio"  />
                              </div>
                              <div className={styles.userActionLabels}>
                                  <label  className={styles.labelLogin} htmlFor="loginOption">Login</label>
                                  <label  className={styles.labelRegister} htmlFor="registerOption">Registro</label>
                              </div> 
                        </div> 
                        {error && <div className={styles.error}>{error}</div>}             
                        {clientIsLogin && <input type="text" id="Name" name="Name" placeholder="¿Cuál es tu nombre de usuario?" value={userData.Name} onChange={handleUserData} />}
                        {clientIsLogin && <input type="password" id="Password" name="Password" placeholder="Escribe tu contraseña aquí..." value={userData.Password} onChange={handleUserData}  />}  
                        {clientIsLogin && <input type="text" id="clientEmail" name="Email" placeholder="Tu correo..." value={userData.Email} onChange={handleUserData}  />}
                        {clientIsRegister && <input type="password" id="Password_repeat" name="Password_repeat" placeholder="Verifica tu contraseña..." value={userData.Password_repeat} onChange={handleUserData} /> }
                        {restaurantIsLogin && <input type="text" id="restaurantName" name="Name" placeholder="Nombre de restaurante" value={userData.Name} onChange={handleUserData}  />}
                        {restaurantIsLogin && <input type="password" id="restaurantPasssword" name="Password" placeholder="Contraseña de restaurante" value={userData.Password} onChange={handleUserData} />}
                        {restaurantIsLogin && <input type="text" id="restaurantEmail" name="Email" placeholder="Correo de restaurante..." value={userData.Email} onChange={handleUserData}  />}
                        {restaurantIsRegister && <input type="password" id="restaurantRepeatPasssword" name="Password_repeat" placeholder="Repetir contraseña de restaurante" value={userData.Password_repeat} onChange={handleUserData} />}
                        
                        
                              
                        <input type='button' value="Entrar" className={styles.btn1} onClick={e=>loginClickHandler(e)} />
                </form>
        </div>
      </div>
    
  )
}

export default Login
