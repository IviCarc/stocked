import './stockView.css'
import { Link } from 'react-router-dom'
import BusquedaIcon from '../imgs/magnifying-glass-solid.svg'
import React, { useState, useEffect } from 'react';
import axios, * as others from 'axios';

const Card = (props) => {
    return (
        <Link className="card" to={props.id}>
            <div className="img-container">
                <img src={require("../imgs/libro.avif")} alt="adawd" />
            </div>
            <div className="info-container">
                <p><b>Libro:</b> {props.producto}</p>
                <p><b>U/Disponibles:</b> 6</p>
            </div>
        </Link>
    )
}


const StockView = () => {
    const [productos, setProductos] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            let data = await axios.get('http://localhost:5000/todos-productos');
            console.log(data.data)
            setProductos(data.data);
        }   
        fetchProductos();
    }, [])


    return (
        <div className="stock">
            <div className="busqueda">
                <div class="select">
                    <select name="format" id="format">
                        <option selected disabled>Modelo</option>
                        <option value="libro">Libro</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <div className="searchbar-container">
                    <img  src={BusquedaIcon} alt="busqueda" className='search-icon' />
                    <input type="text" className='search-bar input' />
                </div>
            </div>
            <div className="cards-container">
                {

                    productos && productos.map((obj, n) => {
                        console.log(obj)
                        return(
                            <Card id={obj.id} producto={obj.producto}></Card>
                        )
                    })
                }
                {/* <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card> */}
            </div>
        </div>

    )
}

export default StockView