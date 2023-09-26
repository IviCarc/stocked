import { useState, useEffect } from "react"
import '../css/newProduct.css'
import '../css/inputs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const NewProduct = (props) => {
    const [nuevoProducto, setNuevoProducto] = useState({
        producto: { value: "", valid: false },
        descripcion: { value: "", valid: false },
        precio: { value: "", valid: false },
        modelo: { value: "", valid: false },
        cantidadDisponible: { value: "", valid: false },
        imagen: { value: "", valid: false },
    });

    const [listaCategorias, setListaCategorias] = useState(null);
    const [listaModelos, setListaModelos] = useState(null);
    const [res, setRes] = useState(false)
    const [inputsModelo, setInputsModelo] = useState(null)

    const capitalizeFirstLetter = (str) =>  {
        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
    }

    const obtenerCategorias = async () => {
        const categorias = await axios.get(process.env.REACT_APP_BASE_URL + 'todas-categorias');
        setListaCategorias(categorias.data);
    }

    const obtenerModelos = async () => {
        const modelos = await axios.get(process.env.REACT_APP_BASE_URL + 'todos-modelos');
        setListaModelos(modelos.data);
    }

    useEffect(() => {
        obtenerCategorias()
            .catch(e => {
                console.log(e)
            });
        obtenerModelos()
            .catch(e => {
                console.log(e)
            });
    }, [])

    const onChange = async (e, setter, state) => {
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

        if (inputName === 'modelo') {
            let temp = {...nuevoProducto}
            try {
                for (const caracteristica of inputsModelo) {
                    console.log(temp[caracteristica])
                    delete temp[caracteristica]
                }
                setNuevoProducto(temp)
            }
            catch(e) {
                console.log(e)
            }
            setInputsModelo((await axios.get(process.env.REACT_APP_BASE_URL + 'getModel/' + e.target.value)).data)
            
        }
       
    };



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
                    <div className="input-div">
                        <label htmlFor="producto" className='input-label'>Nombre del producto:</label>
                        <input className='input' type="text" name="producto" onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} />
                    </div>
                    <div className="input-div">
                        <label htmlFor="categoria" className='input-label'>Categoria</label>
                        <div class="select" id='newproduct-select'>
                            <select name="categoria" id="categoria" onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} >

                                <option selected value='none'>Seleccione una categoria</option>
                                {listaCategorias && listaCategorias.map((categoria, i) => {
                                    return <option key={i} value={categoria.categoria}>{capitalizeFirstLetter(categoria.categoria)}</option>
                                })}

                            </select>
                        </div>
                    </div>

                    <div className="input-div">
                        <label htmlFor="modelo" className='input-label'>Modelo</label>
                        <div class="select" id='newproduct-select'>
                            <select name="modelo" id="modelo" onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} >

                                <option selected value='none'>Seleccione un modelo</option>
                                {listaModelos && listaModelos.map((modelo, i) => {
                                    return <option key={i} value={modelo}>{capitalizeFirstLetter(modelo)}</option>
                                })}

                            </select>
                        </div>
                    </div>

                    <div className="input-div">
                        <label htmlFor="descripcion" className='input-label'>Descripción del producto:</label>
                        <input className='input' onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} type="text" name="descripcion" />
                    </div>

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

                    {inputsModelo && inputsModelo.map((caracteristica, i) => {
                        return (
                            <div className="input-div">
                                <label htmlFor={caracteristica} className='input-label'>{capitalizeFirstLetter(caracteristica)}:</label>
                                <input className='input' onChange={(e) => onChange(e, setNuevoProducto, nuevoProducto)} type="text" name={caracteristica} />
                            </div>
                        )
                    })}

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