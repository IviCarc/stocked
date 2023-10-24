import { useAuth } from "../context/AuthContext";
import "../css/header.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

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
    
    
    return ( 
        <>
            <nav>
                <div className='logo-container'>
                    <img src={require("../imgs/logo.png")} alt="" />
                </div>
                <ul>
                    <li><Link className='header-link' to='new-model'>Crear Modelo</Link></li>
                    <li><Link className='header-link' to=''>Ver Stock</Link></li>
                    <li><Link className='header-link' to='new-product'>Crear Producto</Link></li>
                    <li><Link className='header-link' to='new-category'>Crear Categoria</Link></li>
                    <li>
                        <Link className='' >
                            <Button className="username-menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                {user.username}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Link to='cambiarContraseña'>
                                <MenuItem className="cambiarContraseña">Cambiar Contraseña</MenuItem>
                                </Link>
                                <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
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
