import "../css/register.css";
import { Outlet, Link } from "react-router-dom";

const Register = (props) =>{
    return (
<div className='login'>
            <h1 className='title'>STOCKED</h1>
            <h4 className='subtitle'>Ingrese un nombre de usuario, email y una contraseña</h4>
            <div className="input-container">
                <label htmlFor="user">Usuario</label>
                <input type="text" className='input' name='user' />
            </div>
            <div className="input-container">
                <label htmlFor="email">Email</label>
                <input type="email" className='input' name='email' />
            </div>
            <div className="input-container">
                <label htmlFor="password">Contraseña</label>
                <input type="password" className='input' name='password' />

            </div>
            <div className="input-container">
                <label htmlFor="password">Repita la contraseña</label>
                <input type="password" className='input' name='password' />

            </div>
            <div className="register-container">
                <button className='btn btn-back'><Link className='backLink' to='http://localhost:3000/login/'>Volver</Link></button>
                <button className='btn'>Registrarse</button>
            </div>
            
                
        </div>
    )
}

export default Register ;