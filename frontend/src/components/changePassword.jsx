import "../css/changePassword.css"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from 'react'

const ChangePassword = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    const handleResetPasswordRequest = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.status === 200) {
                console.log('Solicitud de restablecimiento de contraseña exitosa');
                navigate('/login')
            } else {
                // Manejar errores, por ejemplo, correo no encontrado
                alert("Error al solicitar restablecimiento de contraseña")
                console.error('Error al solicitar restablecimiento de contraseña');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    }

    return (
        <div className='changePassword'>
            <h1 className='title'>STOCKED</h1>
            <h4 className='subtitle'>Ingrese el correo de su cuenta. En caso de ser correcto, le llegará un correo con el token de restablecimiento.</h4>
            <div className="input-container">
                <label htmlFor="email"></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='input' name='email' placeholder="Ingrese su correo electrónico" required />
            </div>
            <div className="btn-container">
                <Link className='backLink' to='http://localhost:3000/login/'><button className='btn btn-back'>Volver</button></Link>
                <Link className='backLink' to=''><button onClick={handleResetPasswordRequest} className='btn btn-send'>Enviar</button></Link>
            </div>

        </div>
    )
}

export default ChangePassword;