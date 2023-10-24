import '../css/cambiarContraseña.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const CambiarContraseña = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errores } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  
    const onSubmit = async (data) => {
      try {
        const response = await axios.post('changePassword',data)
        if (response.ok) {
          // Contraseña cambiada con éxito, puedes redirigir al usuario a otra página
          navigate('/stock');
        } else {
          // Maneja errores de respuesta del servidor
          const data = response.data;
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error al conectar con el servidor', error);
      }
    };
  
    return (
      <div className='cambiarContraseña'>
        {errores.map((error, i) => (
          <div className='error-div' key={i}>
            {error}
          </div>
        ))}
        <form className='input-register' onSubmit={handleSubmit(onSubmit)}>
          <div className='input-container'>
            <label htmlFor='currentPassword'>Contraseña anterior</label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('currentPassword', { required: true })}
              className='input inputCambiar'
              placeholder='Ingrese su contraseña anterior'
            />
            {errors.oldPassword && (
              <p className='error-msj'>Contraseña anterior es requerida</p>
            )}
            <label htmlFor='newPassword'>Nueva contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('newPassword', { required: true })}
              className='input inputCambiar'
              placeholder='Ingrese su nueva contraseña'
            />
            {errors.newPassword && (
              <p className='error-msj'>Nueva contraseña es requerida</p>
            )}
            <label htmlFor='confirmPassword'>Confirmar contraseña</label>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('confirmPassword', { required: true })}
              className='input inputCambiar'
              placeholder='Confirme su nueva contraseña'
            />
            {errors.confirmPassword && (
              <p className='error-msj'>Confirmar contraseña es requerida</p>
            )}
          </div>
          <div className="password-container">
                    <button
                        type="button"
                        onClick={togglePasswordVisibility} className="password-btn"

                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
          <div className='btn-container'>
            <button type='submit' className='btn btn-send'>
              Restablecer Contraseña
            </button>
          </div>
        </form>
      </div>
    );
}

export default CambiarContraseña