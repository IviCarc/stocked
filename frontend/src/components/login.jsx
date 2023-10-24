import "../css/login.css";
import "../css/inputs.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, errores, isAuthenticated } = useAuth();
    const onSubmit = (data) => signIn(data);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const navigate = useNavigate();

    return (
        <div className='login'>
            <h1 className='title'>STOCKED</h1>
            {
                errores.map((error, i) => (
                    <div className="error-div" key={i}>
                        {error}
                    </div>
                ))
            }
            <form className="input-register" onSubmit={handleSubmit(onSubmit)} >
                <label htmlFor="email"></label>
                <input type="email" {...register("email", { required: true })} className='input' placeholder="Ingrese su email" />
                {errors.email && (
                    <p className="error-msj">Email es requerido</p>
                )}

                <label htmlFor="password"></label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    {...register("password", { required: true })}
                    className='input'
                    placeholder="Ingrese su contraseña"
                />
                {errors.password && (
                    <p className="error-msj">Contraseña es requerido</p>
                )}
                <div className="password-container">
                    <button
                        type="button"
                        onClick={togglePasswordVisibility} className="password-btn "
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                <div className="changePassword-container">
                    <p ><Link className='changePasswordLink' to='http://localhost:3000/resetPasswordRequest/'>¿Olvidó su contraseña?</Link></p>
                </div>
                <div className="btn-container">
                    <button className='btn'>Ingresar</button>
                    <Link className='registerLink' to='http://localhost:3000/register/'><button className='btn btn-register'>Registrarse</button></Link>
                </div>
            </form>
        </div>
    )
}

export default Login;
