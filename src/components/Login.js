import React, {useState, useEffect} from 'react'

import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'

import {APIservice} from './APIservice'



export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // Para que el token se guarde en cookies después de iniciar sesión, y así no tener que 
    // loguearse otra vez al cerrar el navegador. Se le da el nombre al cookie como un string:
    const [token, setToken] = useCookies(['myToken'])
    // Booleano para controlar si va a ser un Logueo -por defecto-, o un registro
    const [isLogin, setLogin] = useState(true)

    // Para el redireccionamiento a App después del inicio de sesión:
    let history = useHistory()

    useEffect(() => {
        // Si hay un token en Cookies, mandar a la App:
        if(token['myToken']) {
            history.push('/articles')
        }
    },[token])

    const loginBtn = () => {
        APIservice.LoginUser({username, password})
        // El token se almacena en la respuesta despues del logueo:
        .then(resp => setToken('myToken', resp.token))
        .catch(error => console.log(error))
    }

    const registerBtn = () => {
        APIservice.RegisterUser({username, password})
        .then(() => loginBtn()) // Después del registro se ejecuta el logueo
        .catch(error => console.log(error))
    }

    return (
        <div className="App login">
            <br/>
            <br/>
            {isLogin ? <h1>Inicio de Sesión</h1> : <h1>Regístrate</h1>}

            <div className=" container mb-3">
            <br/>
            <br/>
            <label htmlFor="username" className="form-label">Usuario</label>
            <input type="text" className="form-control mb-3" id="username" placeholder="Ingrese su usuario"
                value={username} onChange={(e) =>setUsername(e.target.value)}
            />
            <label htmlFor="password" className="form-label">Contaseña</label>
            <input type="password" className="form-control mb-3" id="password" placeholder="Ingrese su contraseña"
                value={password} onChange={(e) =>setPassword(e.target.value)}
            />
            </div>
            {isLogin ? 
            <button onClick={loginBtn} type="submit" className="btn btn-success" >Iniciar Sesión</button>
            : <button onClick={registerBtn} type="submit" className="btn btn-success" >Registrarse</button> }
            


            <div className="mb-3">
            <br/>
             {isLogin ? <h5>Si no tienes una cuenta, puedes registrarte &nbsp;
             <button className="btn btn-primary" onClick={() => setLogin(false)}>Aquí</button></h5>
             : <h5>Si ya posees una cuenta, ingresa &nbsp;
             <button className="btn btn-primary" onClick={() => setLogin(true)}>Aquí</button></h5>
             }            
            </div>
            
        </div>
    )
}
