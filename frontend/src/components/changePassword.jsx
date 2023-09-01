import "../css/changePassword.css"
import { Outlet, Link } from "react-router-dom";

const ChangePassword = (props) =>{
    return(
        <div className='changePassword'>
            <h1 className='title'>STOCKED</h1>
            <h4 className='subtitle'>Ingrese el correo de su cuenta. En caso de ser correcto, le llegará un correo con el token de restablecimiento.</h4>
            <div className="input-container">
                <label htmlFor="email"></label>
                <input type="email" className='input' name='email' placeholder="Ingrese su correo electrónico" required />
            </div>
            <div className="btn-container">
            <Link className='backLink' to='http://localhost:3000/login/'><button className='btn btn-back'>Volver</button></Link>
            <Link className='backLink' to=''><button className='btn btn-send'>Enviar</button></Link>
            </div>
                
        </div>
    )
}

export default ChangePassword;