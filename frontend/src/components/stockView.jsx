import '../css/stockView.css'
import { Link } from 'react-router-dom'
import BusquedaIcon from '../imgs/magnifying-glass-solid.svg'
import '../css/stockView.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

    const capitalizeFirstLetter = (str) => {
        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
    }

    var settings = {
        dots: true,
        className:"inside-div",
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        infinite:true
    };

    return (

        <div className="stock">

            <div className="busqueda">
                <div className="select">
                    <select name="format" id="format">
                        <option selected disabled>Modelo</option>
                        <option value="libro">Libro</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>
                <div className="searchbar-container">
                    <img src={BusquedaIcon} alt="busqueda" className='search-icon' />
                    <input type="text" className='search-bar input' />
                </div>
            </div>
            <div className="categorias">
                {
                    props.categorias && props.categorias.map((categoria, n) => {

                        return (
                            <div className="categoria" key={n}>
                                <h1>{capitalizeFirstLetter(categoria.categoria)}</h1>

                                <Slider {...settings}>
                                {categoria.productos.map((producto, j) => {
                                    return (
                                        <Card key={j} id={producto._id} categoria={producto.categoria} producto={producto.producto} precio={producto.precio} imagen={producto.imagen} cantidadDisponible={producto.cantidadDisponible}></Card>
                                    )
                                })}
                                    {/* <div><p>ADADWADAWD</p></div>
                                    <div><p>ADADWADAWD</p></div>
                                    <div><p>ADADWADAWD</p></div>
                                    <div><p>ADADWADAWD</p></div>
                                    <div><p>ADADWADAWD</p></div>
                                    <div><p>ADADWADAWD</p></div> */}
                                </Slider>


                            </div>


                        )

                    })

                }
                {/* <Carousel>
                    <div>
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <p className="legend">Legend 3</p>
                    </div>
                </Carousel> */}
            </div>

        </div>

    )
}

export default StockView