import "../css/register.css";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { registerRequest } from "../api/auth";
import { useAuth } from '../context/authContext'
import { useEffect } from "react";

const Register = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signUp, isAuthenticated, errores } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/')
    }, [isAuthenticated])

    const onSubmit = async (values) => {
        signUp(values)
    }
    return (
        <div className='register'>
            <h1 className='title'>STOCKED</h1>
            <h4 className='subtitle'>Ingrese un nombre de usuario, email y una contraseña</h4>
            {
                errores.map((error, i) => (
                    <div className="error-div" key={i}>
                        {error}
                    </div>
                ))
            }
            <form className="input-register" onSubmit={handleSubmit(onSubmit)} >

                <label htmlFor="user"></label>
                <input type="text" {...register("username", { required: true })} className='input' placeholder="Ingrese un usuario" />
                {errors.username && (
                    <p className="error-msj">Usuario es requerido</p>
                )}

                <label htmlFor="email"></label>
                <input type="email" {...register("email", { required: true })} className='input' placeholder="Ingrese un email" />
                {errors.email && (
                    <p className="error-msj">Email es requerido</p>
                )}

                <label htmlFor="password"></label>
                <input type="password" {...register("password", { required: true })} className='input' placeholder="Ingrese una contraseña" />
                {errors.password && (
                    <p className="error-msj">Contraseña es requerido</p>
                )}


                <div className="register-container">
                    <Link className='backLink' to='/login/'><button className='btn btn-back'>Volver</button></Link>
                    <button type="submit" className='btn btn-register'>Registrarse</button>
                </div>

            </form>



        </div>
    )
}

export default Register;