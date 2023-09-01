import "../css/register.css";
import { Outlet, Link } from "react-router-dom";

const Register = (props) =>{
    return (
<div className='register'>
            <h1 className='title'>STOCKED</h1>
            <h4 className='subtitle'>Ingrese un nombre de usuario, email y una contraseña</h4>
            <div className="input-container">
                <label htmlFor="user"></label>
                <input type="text" className='input' name='user' placeholder="Ingrese un usuario" required />
            </div>
            <div className="input-container">
                <label htmlFor="email"></label>
                <input type="email" className='input' name='email' placeholder="Ingrese un email" required  />
            </div>
            <div className="input-container">
                <label htmlFor="password"></label>
                <input type="password" className='input' name='password' placeholder="Ingrese una contraseña" required  />

            </div>
            <div className="input-container">
                <label htmlFor="password"></label>
                <input type="password" className='input' name='password' placeholder="Repita la contraseña" required  />

            </div>
            <div className="register-container">
                <Link className='backLink' to='http://localhost:3000/login/'><button className='btn btn-back'>Volver</button></Link>
                <Link className='backLink' to=''><button className='btn btn-register'>Registrarse</button></Link>
            </div>
            
                
        </div>
    )
}

export default Register ;