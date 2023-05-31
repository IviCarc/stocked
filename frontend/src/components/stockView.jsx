import './stockView.css'
import { Link } from 'react-router-dom'
import BusquedaIcon from '../imgs/magnifying-glass-solid.svg'
import './inputs.css'

// import axios, * as others from 'axios';

const Card = (props) => {
    return (
        <Link className="card" to={"http://localhost:3000/productos/" + props.id}>
            <div className="img-container">
                <img src={require("../imgs/libro.avif")} alt="adawd" />
            </div>
            <div className="info-container">
                <p><b>{props.categoria}:</b> {props.producto}</p>
                <p><b>${props.precio}</b> </p>
                <p><b>U/Disponibles:</b> {props.cantidadDisponible}</p>
            </div>
        </Link>
    )
}

const StockView = (props) => {
    
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

                    props.productos && props.productos.map((obj, n) => {
                        return(
                            <Card id={obj._id} categoria={obj.categoria} producto={obj.producto} precio={obj.precio} cantidadDisponible={obj.cantidadDisponible}></Card>
                        )
                    })
                }
            </div>
        </div>

            )
}

export default StockView