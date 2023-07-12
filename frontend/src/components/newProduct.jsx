import { useState, useEffect, useDispatch, useSelector, useMemo } from "react"
import '../css/newProduct.css'
import '../css/inputs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import {useForm} from './form.jsx'

const NewProduct = (props) => {
    const [listaCategorias, setListaCategorias] = useState(null);
    
    const obtenerCategorias = async () => {
        const categorias = await axios.get(process.env.REACT_APP_BASE_URL + 'todas-categorias');
        setListaCategorias(categorias.data);
    }

    // const [res, setRes] = useState(false)
    
    useEffect(() => {
        obtenerCategorias()
        .catch(e => {
            console.log(e)
        });
    }, [])

    // const onChange = (e, setter, state) => {
    //     const inputName = e.target.name;
    //     const inputValue = e.target.value;
    //     setter({
    //         ...state,
    //         [inputName]: {
    //             ...state[inputName],
    //             value: inputValue,
    //         },
    //     });

    //     if (inputName === 'imagen') {

    //         setter({
    //             ...state,
    //             [inputName]: {
    //                 ...state[inputName],
    //                 value: e.target.files[0],
    //             },
    //         });
    //     }
    // };

    // const [nuevoProducto, setNuevoProducto] = useState({
    //     producto: { value: "", valid: false },
    //     descripcion: { value: "", valid: false },
    //     precio: { value: "", valid: false },
    //     categoria: { value: "", valid: false },
    //     cantidadDisponible: { value: "", valid: false },
    //     imagen: { value: "", valid: false },
    // });

    // const sendData = async (e, state, url, contentType) => {
    //     e.preventDefault();

    //     let data = {};
        
    //     for (const key in state) {
    //         if (key === "precio" || key === "cantidadDisponible") data[key] = parseInt(state[key].value);
    //         else data[key] = state[key].value;
    //     }

    //     await axios.post(process.env.REACT_APP_BASE_URL + url, data, { headers: { "content-type": contentType } })
    //     .catch(e => {
    //         console.log(e)
    //     })
    //     setRes(true)
    // };

    // const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    // const { status, errorMessage } = useSelector(state => state.auth);
    // const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);


    const formData = {
       producto: '',
       descripcion: '',
       precio: 0,
       categoria: '',
       cantidadDisponible: 0,
       imagen: ''
    }
    
    // Usar regex
    
    const formValidations = {
        producto: [(value) => /^([a-zA-Z0-9]{3,20})/.test(value), 'El nombre es obligatorio'],
        descripcion: [(value) => /^([a-zA-Z]{3,20})$/.test(value), 'El nombre es obligatorio'],
        precio: [(value) => value >= 0, 'El nombre es obligatorio'],
        categoria: [(value) => /dad/.test(value), 'El nombre es obligatorio'],
        cantidadDisponible: [(value) => value >= 0, 'El correo debe tener un @'],
        imagen: [(value) => value, 'El nombre es obligatorio'],
    }

    
    const {
        producto, descripcion, precio, categoria,cantidadDisponible, imagen, onInputChange , formState,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid) return;

        const url = 'nuevo-producto';
        const contentType = 'application/json'
        
        await axios.post(process.env.REACT_APP_BASE_URL + url, formData,{ headers: { "content-type": contentType } })
        .catch(e => {
            console.log(e)
        })

        setFormSubmitted(true);

    }

    // const sendData = async (e, state, url, contentType) => {
    //     e.preventDefault();

    //     let data = {};
        
    //     for (const key in state) {
    //         if (key === "precio" || key === "cantidadDisponible") data[key] = parseInt(state[key].value);
    //         else data[key] = state[key].value;
    //     }

    //     await axios.post(process.env.REACT_APP_BASE_URL + url, data, { headers: { "content-type": contentType } })
    //     .catch(e => {
    //         console.log(e)
    //     })
    //     setRes(true)
    // };


    return (
        <div className="new-product">
            <div className="new-product-inside-div">

                <div className="inputs-container">
                    <div className="inputs-container-separator">
                        <div className="input-div">
                            <label htmlFor="producto" className='input-label'>Nombre del producto:</label>
                            <input className='input' type="text" name="producto" onChange={onInputChange} />
                        </div>
                        <div className="input-div">
                            <label htmlFor="categoria" className='input-label'>Categoría</label>
                            <div class="select" id='newproduct-select'>
                                <select name="categoria" id="categoria" onChange={onInputChange} >
                                    {/* <option selected disabled>Modelo</option>
                            <option value="libro">Libro</option>
                            <option value="auto">Auto</option> */}

                                    <option selected value='none'>Seleccione una categoria</option>
                                    {listaCategorias && listaCategorias.map((obj, i) => {
                                        return <option key={i} value={obj.categoria}>{obj.categoria}</option>
                                    })}

                                </select>
                            </div>
                        </div>
                        <div className="input-div">
                            <label htmlFor="descripcion" className='input-label'>Descripción del producto:</label>
                            <input className='input' onChange={onInputChange} type="text" name="descripcion" />
                        </div>  
                    </div>
                    <div className="inputs-container-separator">
                        <div className="input-div">
                            <label htmlFor="cantidadDisponible" className='input-label'>Cantidad del producto:</label>
                            <input className='input' onChange={onInputChange} type="number" name="cantidadDisponible" />
                        </div>
                        <div className="input-div">
                            <label htmlFor="precio" className='input-label'>Precio:</label>
                            <input className='input' onChange={onInputChange} type="number" name="precio" />
                        </div>
                        <div className="input-div">
                            <label htmlFor="imagen" className='input-label'>Subir imagen:</label>
                            <input className='' type="file" name="imagen" id="imagen" onChange={onInputChange} />
                            <div className='div-imagen'>
                                <label htmlFor="imagen" className='input input-imagen' type="text" />
                                <FontAwesomeIcon icon={faCloudArrowUp} className="cloudIcon " id='img-icon' />
                            </div>
                        </div>
                    </div>
                </div>

                <button className='btn' id='send-btn' onClick={onSubmit} >Subir producto</button>

                {

                    // res && <p className='sended'>Producto enviado correctamente</p>
                }

            </div>
        </div>
    )
}

export default NewProduct