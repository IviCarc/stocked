import "./login.css"

const Login = () => {
    return (
        <div className='login'>
            <h1 className='title'>STOCKED</h1>
            <h4 className='subtitle'>Ingrese su usuario y contraseña</h4>
            <div className="input-container">
                <label htmlFor="user">Usuario</label>
                <input type="text" name='user' />
            </div>
            <div className="input-container">
                <label htmlFor="password">Contraseña</label>
                <input type="password" name='password' />

            </div>
            <div className="btn-container">
                <button className='btn'>Ingresar</button>
            </div>
        </div>
    )
}

export default Login