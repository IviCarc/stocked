import { useAuth } from "../context/AuthContext";
import "../css/header.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    return (
        <>
            <nav>
                <button id="nav-btn" onClick={toggleMenu}>
                    <FontAwesomeIcon className="menu-icon" icon={faBars} />
                </button>
                <div className='logo-container'>
                    <FontAwesomeIcon className="logo-caja" icon={faBoxOpen} />
                </div>
                <ul className={`nav-links ${menuVisible ? 'active' : ''}`}>
                    <li><Link className='header-link' to='new-model' onClick={closeMenu}>Crear Modelo</Link></li>
                    <li><Link className='header-link' to='' onClick={closeMenu}>Ver Stock</Link></li>
                    <li><Link className='header-link' to='new-product' onClick={closeMenu}>Crear Producto</Link></li>
                    <li><Link className='header-link' to='new-category' onClick={closeMenu}>Crear Categoria</Link></li>
                    <li>
                        <Link id='menu'>
                            <Button className="username-menu header-link" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                {user.username}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Link to='cambiarContraseña' onClick={closeMenu}>
                                    <MenuItem className="">Cambiar Contraseña</MenuItem>
                                </Link>
                                <MenuItem onClick={() => { logout(); closeMenu(); }}>Cerrar Sesión</MenuItem>
                            </Menu>
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </>
    );
}

export default Header;
