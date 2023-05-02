import './stockView.css'
import { Link } from 'react-router-dom'
import BusquedaIcon from '../imgs/magnifying-glass-solid.svg'

const Card = (props) => {
    return (
        <Link className="card" to={props.refere}>
            <div className="img-container">
                <img src={require("../imgs/libro.avif")} alt="adawd" />
            </div>
            <div className="info-container">
                <p><b>Libro:</b> Harry Potter</p>
                <p><b>U/Disponibles:</b> 6</p>
            </div>
        </Link>
    )
}


const StockView = () => {
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
                <Card refere="obj1" id="Uno"></Card>
                <Card refere="obj2"></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>

    )
}

export default StockView