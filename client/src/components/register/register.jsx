import { useEffect, useState } from "react";
import { register, login } from "../../utils/fetch"
import { saveToken } from "../../utils/local";


const initialUserData = {
    username: "",
    email: "",
    password: "",
    passwordRepeat: ""
}
const Register = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(initialUserData);

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
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;
        if (isRegister) {
            result = await register(userData);
            if (!result.error) {
                setIsRegister(false);
                setError("se ha registrado correctamente");
            }
            else {
                setError(result.error);
            }
        }
        else {
            result = await login(userData);
            if (!result.error) {
                setError("login correcto");
                saveToken(result.token);
                onLogin(result.token);
            }
            else {
                setError(result.error);
            }
        }
    }
    return (
        <section className="register-login">
            <h2>{isRegister ? "Register" : "Login"}</h2>
            {error}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input name="username" type="text" value={userData.username} onChange={handleUserData} />
                {isRegister &&
                    <>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" value={userData.email} onChange={handleUserData} />
                    </>
                }
                <label htmlFor="password">Password</label>
                <input name="password" type="password" value={userData.password} onChange={handleUserData} />
                {isRegister &&
                    <>
                        <label htmlFor="passwordRepeat">Repeat Password</label>
                        <input name="passwordRepeat" type="password" value={userData.passwordRepeat} onChange={handleUserData} />
                    </>
                }
                <button>{isRegister ? "Register" : "Login"}</button>
            </form>
            <button onClick={() => setIsRegister(register => !register)} >{isRegister ? "Go to Login" : "Go to Register"}</button>
        </section>
    )
}

export default Register;