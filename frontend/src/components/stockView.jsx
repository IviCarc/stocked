import '../css/stockView.css'
import { Link } from 'react-router-dom'
import BusquedaIcon from '../imgs/magnifying-glass-solid.svg'
import '../css/stockView.css'
import React, { useState, useEffect } from 'react';

const Card = (props) => {
    return (
        <Link className="card" to={"http://localhost:3000/productos/" + props.id}>
            <div className="img-container">
                <img src={`${process.env.REACT_APP_BASE_URL + "images/" + props.imagen}`} alt="product-img" />
            </div>
            <div className="info-container">
                <p>{props.producto}</p>
                <p><b>${props.precio}</b> </p>
                <p><b>U/Disponibles:</b> {props.cantidadDisponible}</p>
            </div>
        </Link>
    )
}

const StockView = (props) => {
    const [categorias, setCategorias] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            let data = await fetch('http://localhost:5000/categorias')
                .then(res => res.json())
                .then(datos => {
                    setCategorias(datos);
                })
        }
        fetchCategorias();
    }, [])

    const capitalizeFirstLetter = (str) => {
        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
    }

    var settings = {
        dots: true,
        className: "inside-div",
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        infinite: true
    };

    return (

        <div className="stock">

            <div className="busqueda">
                <div className="select">
                    <select name="format" id="format">
                        <option selected disabled>Categoria</option>
                        <option value="libro">Libros</option>
                        <option value="auto">Autos</option>
                    </select>
                </div>
                <div className="searchbar-container">
                    <img src={BusquedaIcon} alt="busqueda" className='search-icon' />
                    <input type="text" className='search-bar input' />
                </div>
            </div>
            <div className="categorias">
                
                {
                    categorias && categorias.map((categoria, n) => {
                        if (categoria.productos.length == 0) return
                        return (
                            <div className="categoria" key={n}>
                                <h1>{capitalizeFirstLetter(categoria.categoria)}</h1>

                                <div className="cards-container">
                                    {categoria.productos.map((producto, j) => {
                                        return (
                                            <Card key={j} id={producto._id} categoria={producto.categoria} producto={producto.producto} precio={producto.precio} imagen={producto.imagen} cantidadDisponible={producto.cantidadDisponible}></Card>
                                        )
                                    })}

                                </div>
                            </div>

                        )

                    })

                }
             </div>

        </div>

    )
}

export default StockView