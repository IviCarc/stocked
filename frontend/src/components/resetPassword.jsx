import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/resetPassword.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};
  const handleResetPassword = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL + 'api/reset-Password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.status == 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
          title: 'Contraseña cambiada con éxito'
        });
        navigate('/login');
      } else if (response.status == 400) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          showConfirmButton: false,
          timer: 1000,
          title: 'Token inválido'
        });
      } else {
        alert('Error al cambiar la contraseña');
        console.error('Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  }

  return (
    <div className='resetPassword'>
      <h1 className='title'>Cambio de Contraseña</h1>
      <div className="input-container">
        <label htmlFor="password" className='subtitle'>Nueva Contraseña</label>
        <input className='input'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Ingrese su nueva contraseña"
          required
        />
      </div>
      <div className="password-container">
                    <button
                        type="button"
                        onClick={togglePasswordVisibility} className="password-btn "
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
      <div className='btn-container'>
      <button className='btn' onClick={handleResetPassword}>Cambiar Contraseña</button>
      </div>
    </div>
  );
};

export default ResetPassword;