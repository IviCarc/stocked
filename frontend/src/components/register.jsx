import "../css/register.css";
import { Outlet, Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { registerRequest } from "../api/auth";

const Register = (props) => {
    const { register, handleSubmit } = useForm();
    return (
        <div className='register'>
            <h1 className='title'>STOCKED</h1>
            <h4 className='subtitle'>Ingrese un nombre de usuario, email y una contraseña</h4>

            <form className="input-register" onSubmit={handleSubmit(async (values) => {
                console.log(values)
                const res = await registerRequest(values)
                console.log(res)
            })} >

                <label htmlFor="user"></label>
                <input type="text" {...register("username", { required: true })} className='input' placeholder="Ingrese un usuario" />

                <label htmlFor="email"></label>
                <input type="email" {...register("email", { required: true })} className='input' placeholder="Ingrese un email" />
                <label htmlFor="password"></label>
                <input type="password" {...register("password", { required: true })} className='input' placeholder="Ingrese una contraseña" />

                <div className="register-container">
                    <Link className='backLink' to='/login/'><button className='btn btn-back'>Volver</button></Link>
                    <button type="submit" className='btn btn-register'>Registrarse</button>
                </div>

            </form>



        </div>
    )
}

export default Register;