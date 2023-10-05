import "../css/header.css";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return (
        <>
        <nav>
            <div className='logo-container'>
                <img src={require("../imgs/logo.png")} alt="" />
            </div>
            <ul>
                <li><Link className='header-link' to='new-model'>CREAR MODELO</Link></li>
                <li><Link className='header-link' to='stock'>VER STOCK</Link></li>
                <li><Link className='header-link' to='new-product'>CREAR PRODUCTO</Link></li>
                <li><Link className='header-link' to='new-category'>CREAR CATEGORIA</Link></li>
            </ul>
        </nav>
        <Outlet></Outlet>
        </>
    )
}

export default Header;