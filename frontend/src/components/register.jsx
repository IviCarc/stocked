import "../css/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

const schema = yup
    .object({
        username: yup.string().min(4, "El nombre de usuario debe tener 4 caracteres o más").required("Campo obligatorio"),
        email: yup
        .string()
        .required('El correo electrónico es obligatorio')
        .email('Debe ser un correo electrónico válido')
        .test('is-com', 'Debe terminar en ".com"', (value) => {
          if (value && yup.string().email().isValidSync(value)) {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
          }
          return true; // No se aplica la validación si el campo está vacío o no es un correo electrónico válido
        }),
      password: yup.string().min(6, "Mínimo 6 caracteres").required('La contraseña es obligatoria')
    })
    .required()

const Register = (props) => {
    const { signUp, isAuthenticated, errores } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (value) => {
        try {
            await signUp(value);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated]);
    return (
        <div className='register'>
            <h1 className='title'>STOCKED</h1>
            <h4 className='subtitle'>Ingrese un nombre de usuario, email y una contraseña</h4>
            <form className="input-register" onSubmit={handleSubmit(onSubmit)} >

                <label htmlFor="user"></label>
                <input type="text" {...register("username")} className='input' placeholder="Ingrese un usuario" />
                {errors.username && <p className="input-error-message">{errors.username.message}</p>}

                <label htmlFor="email"></label>
                <input type="email" {...register("email",{required:true})} className='input' placeholder="Ingrese un email" />
                {errors.email && <p className="input-error-message">{errors.email.message}</p>}


                <label htmlFor="password"></label>
                <input type={showPassword ? 'text' : 'password'} {...register("password")} className='input' placeholder="Ingrese una contraseña" />
                {errors.password && <p className="input-error-message">{errors.password.message}</p>}

                <div className="password-container">
                    <button
                        type="button"
                        onClick={togglePasswordVisibility} className="password-btn"

                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>


                <div className="register-container">
                    <Link className='backLink' to='/login/'><button className='btn btn-back'>Volver</button></Link>
                    <button type="submit" className='btn btn-register'>Registrarse</button>
                </div>

            </form>



        </div>
    )
}

export default Register;