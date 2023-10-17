import { useAuth } from "../context/AuthContext";
import "../css/header.css";
import { Outlet, Link } from "react-router-dom";
const Header = () => {
    const {isAuthenticated, logout, user} = useAuth();
    return (
        <>
        <nav>
            <div className='logo-container'>
                <img src={require("../imgs/logo.png")} alt="" />
            </div>
            <ul>
                <li><Link className='header-link' >Bienvenido {user.username}</Link></li>
                <li><Link className='header-link' to='new-model'>Crear Modelo</Link></li>
                <li><Link className='header-link' to=''>Ver Stock</Link></li>
                <li><Link className='header-link' to='new-product'>Crear Producto</Link></li>
                <li><Link className='header-link' to='new-category'>Crear Categoria</Link></li>
                <li><Link className='header-link' to='/login' onClick={() => {
                    logout();
                }}>Cerrar Sesion</Link></li>
                
            </ul>
        </nav>
        <Outlet></Outlet>
        </>
    )
}

export default Header;