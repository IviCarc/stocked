import "../css/login.css"
import "../css/inputs.css"
import { Outlet, Link } from "react-router-dom";


const Login = () => {
    return (
        <div className='login'>
            <h1 className='title'>STOCKED</h1>
            <div className="input-container">
                <label htmlFor="user">Usuario</label>
                <input type="text" className='input' name='user' placeholder="Ingrese su usuario" required />
            </div>
            <div className="input-container">
                <label htmlFor="password">Contraseña</label>
                <input type="password" className='input' name='password'  placeholder="Ingrese su contraseña" required />
                <p className='changePasswordLink'><Link  to='http://localhost:3000/ChangePassword/'>¿Olvido su contraseña?</Link></p>

            </div>
            <div className="btn-container">
                <button className='btn'>Ingresar</button>
                <Link className=' registerLink' to='http://localhost:3000/register/'><button className='btn btn-register'>Registrarse</button></Link>
            </div>
                
        </div>
    )
}

export default Login