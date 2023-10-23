import '../css/cambiarContraseña.css'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useAuth } from "../context/AuthContext";


const CambiarContraseña = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { errores } = useAuth();
  
    const onSubmit = async (formData) => {
      try {
        const response = await fetch('/api/cambiar-contrasena', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          // Contraseña cambiada con éxito, puedes redirigir al usuario a otra página
          navigate('/ruta-de-exito');
        } else {
          // Maneja errores de respuesta del servidor
          const data = await response.json();
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error al conectar con el servidor', error);
      }
    };
  
    return (
      <div className='resetPassword'>
        <h4 className='subtitle'>Restablecer contraseña</h4>
        {errores.map((error, i) => (
          <div className='error-div' key={i}>
            {error}
          </div>
        ))}
        <form className='input-register' onSubmit={handleSubmit(onSubmit)}>
          <div className='input-container'>
            <label htmlFor='oldPassword'>Contraseña anterior</label>
            <input
              type='password'
              {...register('oldPassword', { required: true })}
              className='input inputCambiar'
              placeholder='Ingrese su contraseña anterior'
            />
            {errors.oldPassword && (
              <p className='error-msj'>Contraseña anterior es requerida</p>
            )}
            <label htmlFor='newPassword'>Nueva contraseña</label>
            <input
              type='password'
              {...register('newPassword', { required: true })}
              className='input inputCambiar'
              placeholder='Ingrese su nueva contraseña'
            />
            {errors.newPassword && (
              <p className='error-msj'>Nueva contraseña es requerida</p>
            )}
            <label htmlFor='confirmPassword'>Confirmar contraseña</label>
            <input
              type='password'
              {...register('confirmPassword', { required: true })}
              className='input inputCambiar'
              placeholder='Confirme su nueva contraseña'
            />
            {errors.confirmPassword && (
              <p className='error-msj'>Confirmar contraseña es requerida</p>
            )}
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