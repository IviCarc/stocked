import { useState, useEffect } from "react"
import '../css/newProduct.css'
import '../css/inputs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const NewProduct = (props) => {
    const [listaModelos, setListaModelos] = useState(null);
    const [res, setRes] = useState(false)

    const obtenerModelos = async () => {
        const modelos = await axios.get(process.env.REACT_APP_BASE_URL + 'todos-modelos');
        setListaModelos(modelos.data);
    }

    useEffect(() => {
        obtenerModelos()
        .catch(e => {
            console.log(e)
        });
    }, [])

    const onChange = (e, setter, state) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setter({
            ...state,
            [inputName]: {
                ...state[inputName],
                value: inputValue,
            },
        });

        if (inputName === 'imagen') {

            setter({
                ...state,
                [inputName]: {
                    ...state[inputName],
                    value: e.target.files[0],
                },
            });
        }
    };

    const [nuevoProducto, setNuevoProducto] = useState({
        producto: { value: "", valid: false },
        descripcion: { value: "", valid: false },
        precio: { value: "", valid: false },
        modelo: { value: "", valid: false },
        cantidadDisponible: { value: "", valid: false },
        imagen: { value: "", valid: false },
    });

    const sendData = async (e, state, url, contentType) => {
        e.preventDefault();

        let data = {};
        
        for (const key in state) {
            if (key === "precio" || key === "cantidadDisponible") data[key] = parseInt(state[key].value);
            else data[key] = state[key].value;
        }

        await axios.post(process.env.REACT_APP_BASE_URL + url, data, { headers: { "content-type": contentType } })
        .catch(e => {
            console.log(e)
        })
        setRes(true)

    };


    return (
        <div className="new-product">
            <div className="new-product-inside-div">

                <div className="inputs-container">
                    <div className="inputs-container-separator">
                        <div className="input-div">
                            <label htmlFor="producto" className='input-label'>Nombre del producto:</label>
                            <input className='input' type="text" name="producto" onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} />
                        </div>
                        <div className="input-div">
                            <label htmlFor="modelo" className='input-label'>Modelo</label>
                            <div class="select" id='newproduct-select'>
                                <select name="modelo" id="modelo" onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} >

                                    <option selected value='none'>Seleccione un modelo</option>
                                    {listaModelos && listaModelos.map((modelo, i) => {
                                        return <option key={i} value={modelo}>{modelo}</option>
                                    })}

                                </select>
                            </div>
                        </div>
                        <div className="input-div">
                            <label htmlFor="descripcion" className='input-label'>Descripción del producto:</label>
                            <input className='input' onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} type="text" name="descripcion" />
                        </div>  
                    </div>
                    <div className="inputs-container-separator">
                        <div className="input-div">
                            <label htmlFor="cantidadDisponible" className='input-label'>Cantidad del producto:</label>
                            <input className='input' onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} type="number" name="cantidadDisponible" />
                        </div>
                        <div className="input-div">
                            <label htmlFor="precio" className='input-label'>Precio:</label>
                            <input className='input' onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} type="number" name="precio" />
                        </div>
                        <div className="input-div">
                            <label htmlFor="imagen" className='input-label'>Subir imagen:</label>
                            <input className='' type="file" name="imagen" id="imagen" onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} />
                            <div className='div-imagen'>
                                <label htmlFor="imagen" className='input input-imagen' type="text" />
                                <FontAwesomeIcon icon={faCloudArrowUp} className="cloudIcon " id='img-icon' />
                            </div>
                        </div>
                    </div>
                </div>

                <button className='btn' id='send-btn' onClick={(e) => sendData(e, nuevoProducto, 'nuevo-producto', 'multipart/form-data')}>Subir producto</button>

                {

                    res && <p className='sended'>Producto enviado correctamente</p>
                }

            </div>
        </div>
    )
}

export default NewProduct