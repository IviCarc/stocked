import "../css/resetPasswordRequest.css"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import Swal from 'sweetalert2'


const ResetPasswordRequest = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    
    const handleResetPasswordRequest = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reset-password-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.status != 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1000,
                    title: "Usuario no encontrado"
                })
            } else if (response.status != 400) {
                // Manejar errores, por ejemplo, correo no encontrado
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                    title: 'Solicitud de restablecimiento enviada.'
                })
                navigate('/login')
                
                // alert("Error al solicitar restablecimiento de contraseña")
            } else {
                alert('Error al solicitar restablecimiento de contraseña')
                console.error('Error al solicitar restablecimiento de contraseña');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    }

    return (
        <div className='resetPasswordRequest'>
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

export default ResetPasswordRequest;