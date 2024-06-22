import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { login, register} from "../utils/userFetch"
import './Login.css'
import GeneralContext from '../context/GeneralContext'
import { saveToken } from '../utils/local' 
import { getAllRestaurantes } from '../utils/restauranteFetch'
import { getAllReservas} from  '../utils/reservaFetch'

function Login() {

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
  setUserId,
  userName, 
  setUserName,
  userEmail, 
  setUserEmail,
  infoModalSuccessOpen,
  setinfoModalSuccessOpen,
  infoModalErrorOpen,
  setinfoModalErrorOpen
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

   
  // if(userActionIsLogin && userIsClient){
  //   clientIsLogin = true;
  //   clientIsRegister = false;
  //   restaurantIsLogin = false;
  //   restaurantIsRegister = false;
  // }
  // if(userActionIsRegister && userIsClient){
  //   clientIsLogin = true;
  //   clientIsRegister = true;
  //   restaurantIsLogin = false;
  //   restaurantIsRegister = false;
  // }
  // if(userActionIsLogin && userIsRestaurant){
  //   clientIsLogin = false;
  //   clientIsRegister = false;
  //   restaurantIsLogin = true;
  //   restaurantIsRegister = false;
  // }
  // if(userActionIsRegister && userIsRestaurant){
  //   clientIsLogin = false;
  //   clientIsRegister = false;
  //   restaurantIsLogin = true;
  //   restaurantIsRegister = true;
  // }
  
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
    e.preventDefault();
    const data = e.target.value;
    const key = e.target.name;
    
    setUserData(userData => {
        return {
            ...userData,
            [key]:data
        }
    })

    if(key === "Name"){
      setUserName(data)
    }
    if(key === "Email"){
      setUserEmail(data)
    }
  }
  


async function loginClickHandler(e) {
  e.preventDefault();
  let result;

  if (userActionIsRegister) {
      result = await register(userData)
      if (!result.error) {
          setError("se ha registrado correctamente");
          
          setLoginFormOpenHandler(e)
          setuserLoggedOrRegistered(true)
          setshowRestaurantsOpen(true)
          setinfoModalSuccessOpen(true)
      } else {
        setuserLoggedOrRegistered(false)
          setError(result.error);
          setinfoModalErrorOpen(true)
      }
  }
  if (userActionIsLogin) {
      result = await login(userData);
      if (!result.error) {
          setError("login correcto");
          setUser(result.data); 
          saveToken(result.data.token);
          setLoginFormOpenHandler(e)
          setuserLoggedOrRegistered(true)
          setshowRestaurantsOpen(true)
          setinfoModalSuccessOpen(true)

        
      } else {
          setError(result.error);
          setuserLoggedOrRegistered(false)
          setinfoModalErrorOpen(true)
      }
  }

  setUserId(result.data.user_id)
};

 
const handleMisReservas = async (userId) => {
    try {
        const response = await getAllReservas(userId);
        const data = response.data;
        
        if (Array.isArray(data)) {
            setReservas(data);
        } else {
            alert('La respuesta de la API no contiene un array:', response)
        }
    }catch (error) {
        alert('La respuesta de la API no contiene un array:', response)
    }
}
  
const handleMisRestaurantes = async (userId) => {
    try {
        const response = await getAllRestaurantes(userId);
        const data = response.data;

        if (Array.isArray(data)) {
            setRestaurantes(data);
        } else {
            alert('La respuesta de la API no contiene un array: ', response)  
        }
    }catch(error) {
        alert('Error al obtener las reservas:', error)
    }
}
    
    useEffect(() => {
        handleMisReservas();
        handleMisRestaurantes();
    },[]);


  return (
    <div className='containerLogin'>
      <div className='login'>
      <div className='userTypeBtnContainer'>
                <div className='userTypeLabels'>
                    {userIsClient && <label  className='labelRestaurant' htmlFor="restaurantOption"><ion-icon className='chevronBack' name="chevron-back"></ion-icon>Restaurantes</label>}
                    {userIsRestaurant && <label  className='labelClient' htmlFor="clientOption"><ion-icon className='chevronBack' name="chevron-back"></ion-icon>Clientes</label>}
                </div>                   
                <div className='userTypeRadios' onChange={e=>userTypeHandler(e)}>
                      <input className='userTypeRadioOption' value="client"  id="clientOption" name='userType' type="radio" />
                      <input className='userTypeRadioOption' value="restaurant" id="restaurantOption" name='userType' type="radio" />
                </div>   

                </div>
                <form  className='loginFormContainer'>
                        <div className='loginMenuContainer'>
                              <div className='userActionRadios' onChange={e=>userActionHandler(e)}>
                                    <input className='userActionRadioOption' value="login" id="loginOption" name='userAction' type="radio"  />
                                    <input className='userActionRadioOption' value="register" id="registerOption" name='userAction' type="radio"  />
                              </div>
                              <div className='userActionLabels'>
                                  <label  className='labelLogin' htmlFor="loginOption">Login</label>
                                  <span>/</span>
                                  <label  className='labelRegister' htmlFor="registerOption">Registro</label>
                              </div> 
                              <div>
                            <button type="button" className='loginCloseBtn' onClick={setLoginFormOpenHandler}>
                                <ion-icon name="close-outline"></ion-icon>
                            </button>
                        </div>
                        </div> 

                        {/* {error && <div className='error'>{error}</div>}              */}
                        <div className='inputContainerLogin'>

                            <input type="text" id="Name" name="Name" placeholder="¿Cuál es tu nombre de usuario?" value={userData.Name} onChange={handleUserData} />
                            <input type="password" id="Password" name="Password" placeholder="Escribe tu contraseña aquí..." value={userData.Password} onChange={handleUserData}  />  
                            <input type="text" id="clientEmail" name="Email" placeholder="Tu correo..." value={userData.Email} onChange={handleUserData}  />
                            <input type="password" id="Password_repeat" name="Password_repeat" placeholder="Verifica tu contraseña..." value={userData.Password_repeat} onChange={handleUserData} />
                                  
                            <input type='button' value="ENTRAR" className='entrarBtn' onClick={e=>loginClickHandler(e)} />
                        </div>
                </form>
        </div>
      </div>
    
  )
}

export default Login
