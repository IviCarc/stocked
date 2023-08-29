import "../css/login.css"
import "../css/inputs.css"

const Login = () => {
    return (
        <div className='login'>
            <h1 className='title'>STOCKED</h1>
            <h4 className='subtitle'>Ingrese su usuario y contraseña</h4>
            <div className="input-container">
                <label htmlFor="user">Usuario</label>
                <input type="text" className='input' name='user' />
            </div>
            <div className="input-container">
                <label htmlFor="password">Contraseña</label>
                <input type="password" className='input' name='password' />

            </div>
            <div className="btn-container">
                <button className='btn'>Ingresar</button>
                <button className='btn'>Registrarse</button>
            </div>
                
        </div>
    )
}

export default Login