import "../css/login.css"
import "../css/inputs.css"
import { Outlet, Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useAuth } from "../context/authContext";


const Login = () => {

    const { register, handleSubmit, formState:{errors} } = useForm()
    const {signIn, errores} = useAuth();
    const onSubmit = handleSubmit(data =>{
       signIn(data)
    })

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
                <input type="password" {...register("password", { required: true })} className='input' placeholder="Ingrese su contraseña" />
                {errors.password && (
                    <p className="error-msj">Contraseña es requerido</p>
                )}

<p className='changePasswordLink'><Link  to='http://localhost:3000/ChangePassword/'>¿Olvido su contraseña?</Link></p>
                
                <div className="btn-container">
                    <button className='btn'>Ingresar</button>
                    <Link className=' registerLink' to='http://localhost:3000/register/'><button className='btn btn-register'>Registrarse</button></Link>
                </div>
            </form>


        </div>
    )
}

export default Login