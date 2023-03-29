import "./header.css";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return (
        <>
        <nav>
            <div className='logo-container'>
                <img src={require("../imgs/logo.png")} alt="" />
            </div>
            <ul>
                <li><Link to='new-model'>CREAR MODELO</Link></li>
                <li><Link to='stock'>VER STOCK</Link></li>
            </ul>
        </nav>
        <Outlet></Outlet>
        </>
    )
}

export default Header;