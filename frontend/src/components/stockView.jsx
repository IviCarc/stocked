import '../css/stockView.css';
import { Link } from 'react-router-dom';
import BusquedaIcon from '../imgs/magnifying-glass-solid.svg';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

const Card = (props) => {
    return (
        <Link className="card" to={`/producto/${props.id}`}>
            <div className="img-container">
                <img src={`${process.env.REACT_APP_BASE_URL}images/${props.imagen}`} alt="product-img" />
            </div>
            <p>{props.producto}</p>
            <p>${props.precio}</p>
            <p>{props.cantidadDisponible}</p>
            <p>{props.categoria}</p>
        </Link>
    );
};

const StockView = (props) => {
    const [categorias, setCategorias] = useState(null);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const fetchCategorias = async () => {
        let data = await axios.get(process.env.REACT_APP_BASE_URL + 'categorias');
        setCategorias(data.data);
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const handleCategoriaChange = (event) => {
        setSelectedCategoria(event.target.value);
    };

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="stock">
            <div className="busqueda">
                <div className="select" id='select'>
                    <select
                        value={selectedCategoria}
                        onChange={handleCategoriaChange}
                        name="categoria"
                        id="categoria"
                    >
                        <option value="">Categorias</option>
                        {categorias && categorias.map((categoria, i) => {
                            return (
                                <option key={i} value={categoria.categoria}>
                                    {capitalizeFirstLetter(categoria.categoria)}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="searchbar-container">
                    <img src={BusquedaIcon} alt="busqueda" className="search-icon" />
                    <input
                        type="text"
                        className="search-bar input"
                        placeholder="Buscar"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className="productos-container">
                <div className="card titulos">
                    <h3>Producto</h3>
                    <h3>Nombre</h3>
                    <h3>Precio</h3>
                    <h3>U/Disponibles</h3>
                    <h3>Categoría</h3>
                </div>
                {categorias &&
                    categorias.map((categoria, n) => {
                        if (categoria.productos.length === 0) return null;

                        return categoria.productos.map((producto, j) => {
                            // Filtrar productos por categoría seleccionada
                            if (selectedCategoria === '' || producto.categoria === selectedCategoria) {
                                // Filtrar productos por valor de búsqueda
                                if (
                                    searchValue === '' ||
                                    producto.producto.toLowerCase().includes(searchValue.toLowerCase())
                                ) {
                                    return (
                                        <Card
                                            key={j}
                                            id={producto._id}
                                            categoria={producto.categoria}
                                            producto={producto.producto}
                                            precio={producto.precio}
                                            imagen={producto.imagen}
                                            cantidadDisponible={producto.cantidadDisponible}
                                        />
                                    );
                                }
                            }
                            return null;
                        });
                    })}
            </div>
        </div>
    );
};

export default StockView;
