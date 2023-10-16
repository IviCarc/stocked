import { useState, useEffect } from "react"
import '../css/newProduct.css'
import '../css/inputs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import * as yup from 'yup'
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup
    .object({
        producto: yup.string().min(4, "Mínimo 4 caracteres").required(),
        precio: yup.number().min(0).required(),
        descripcion: yup.string().min(4, "Mínimo 4 caracteres").required(),
        cantidadDisponible: yup.number().min(0).required(),
        categoria: yup.string().min(4, "Mínimo 4 caracteres").required(),
        modelo: yup.string().min(4, "Mínimo 4 caracteres"),
        imagen: yup.mixed().required("Debe subir una imagen")
            .test("test", "La imagen debe tener formato JPG o PNG", value => {
                console.log(value[0].type)
                return value[0].type === "image/jpeg" || value[0].type === "image/png"
            })
    })
    .required()

const NewProduct = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const [listaCategorias, setListaCategorias] = useState(null);
    const [listaModelos, setListaModelos] = useState(null);
    const [res, setRes] = useState(false)
    const [inputsModelo, setInputsModelo] = useState(null)

    const capitalizeFirstLetter = (str) => {
        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
    }

    const obtenerCategorias = async () => {
        const categorias = await axios.get(process.env.REACT_APP_BASE_URL + 'categorias');
        setListaCategorias(categorias.data);
    }

    const obtenerModelos = async (categoria) => {
        const modelos = await axios.get(process.env.REACT_APP_BASE_URL + 'categoriaModelo/' + categoria);
        setListaModelos(modelos.data);
    }

    useEffect(() => {
        obtenerCategorias()
            .catch(e => {
                console.log(e)
            });
    }, [])

    const onSubmit = async (data) => {
        // console.log(data)
        // await axios.post(process.env.REACT_APP_BASE_URL + "crear-producto", data)
    }

    return (
        <div className="new-product">
            <form onSubmit={handleSubmit(onSubmit)} className="new-product-inside-div">
                <div className="inputs-container">
                    <div className="input-div">
                        <label htmlFor="producto" className='input-label'>Nombre del producto:</label>
                        <input className='input' type="text" name="producto" {...register("producto")} />
                        {errors.producto && <p className="input-error-message">{errors.producto.message}</p>}
                    </div>

                    <div className="input-div">
                        <label htmlFor="categoria" className='input-label'>Categoria</label>
                        <div className="" id='newproduct-select'>
                            <select className="select" id="categoria" {...register("categoria")} >

                                <option selected disabled value=''>Seleccione una categoria</option>

                                {listaCategorias && listaCategorias.map((categoria, i) => {
                                    return <option key={i} value={categoria.categoria}>{capitalizeFirstLetter(categoria.categoria)}</option>
                                })}

                            </select>
                            {errors.categoria && <p className="input-error-message">{errors.categoria.message}</p>}
                        </div>
                    </div>

                    {/* <div className="input-div">
                        <label htmlFor="modelo" className='input-label'>Modelo</label>
                        <div className="select" id='newproduct-select'>
                            <select name="modelo" id="modelo" {...register("modelo")}>

                                <option selected disabled value=''>Seleccione un modelo</option>
                                {listaModelos && nuevoProducto.categoria.value !== "" &&  listaModelos.map((modelo, i) => {
                                    return <option key={i} value={modelo}>{capitalizeFirstLetter(modelo)}</option>
                                })}

                            </select>
                        </div>
                    </div> */}

                    <div className="input-div">
                        <label htmlFor="descripcion" className='input-label'>Descripción del producto:</label>
                        <input className='input' type="text" {...register("descripcion")} />
                        {errors.descripcion && <p className="input-error-message">{errors.descripcion.message}</p>}
                    </div>

                    <div className="input-div">
                        <label htmlFor="cantidadDisponible" className='input-label'>Cantidad del producto:</label>
                        <input className='input' type="number"   {...register("cantidadDisponible")} />
                        {errors.cantidadDisponible && <p className="input-error-message">{errors.cantidadDisponible.message}</p>}
                    </div>
                    <div className="input-div">
                        <label htmlFor="precio" className='input-label'>Precio:</label>
                        <input className='input' type="number"  {...register("precio")} />
                        {errors.precio && <p className="input-error-message">{errors.precio.message}</p>}
                    </div>

                    <div className="input-div">
                        <label htmlFor="imagen" className='input-label'>Subir imagen:</label>
                        <Controller
                            control={control}
                            name="imagen"
                            render={({ field }) => (
                                <input className='' type="file" id="imagen"  {...register("imagen")}
                                    value={() => {
                                        console.log(field.value)
                                    }}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                    }}
                                />
                            )}
                        >
                        </Controller>

                        <div className='div-imagen'>
                            <label htmlFor="imagen" className='input input-imagen' type="text" />
                            <FontAwesomeIcon icon={faCloudArrowUp} className="cloudIcon " id='img-icon' />
                        </div>
                        {errors.imagen && <p className="input-error-message">{errors.imagen.message}</p>}
                        {/* {watch('imagen') ? <img src={URL.createObjectURL(watch('imagen'))} alt="imagen" /> : null} */}
                        {/* {console.log(watch('imagen.0'))} */}
                    </div>

                    {/* {inputsModelo && inputsModelo.map((caracteristica, i) => {
                        return (
                            <div className="input-div">
                                <label htmlFor={caracteristica} className='input-label'>{capitalizeFirstLetter(caracteristica)}:</label>
                                <input className='input' type="text"  />
                            </div>
                        )
                    })} */}

                </div>

                {/* <button className='btn' id='send-btn' onClick={(e) => sendData(e, nuevoProducto, 'crear-producto', 'multipart/form-data')}>Subir producto</button> */}
                <button className='btn' id='send-btn' type="submit">Subir producto</button>

                {
                    res && <p className='sended'>Producto enviado correctamente</p>
                }

            </form>
        </div>
    )
}

// const onChange = async (e, setter, state) => {
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

//     if (inputName === 'modelo') {
//         let temp = { ...nuevoProducto }
//         try {
//             for (const caracteristica of inputsModelo) {
//                 console.log(temp[caracteristica])
//                 delete temp[caracteristica]
//             }
//             setNuevoProducto(temp)
//         }
//         catch (e) {
//             console.log(e)
//         }
//         setInputsModelo((await axios.get(process.env.REACT_APP_BASE_URL + 'modelo/' + e.target.value)).data)

//     }

//     if (inputName === 'categoria') {
//         console.log(inputValue)
//         obtenerModelos(inputValue)
//     }

// };

// const [nuevoProducto, setNuevoProducto] = useState({
//     producto: { value: "", valid: false },
//     descripcion: { value: "", valid: false },
//     precio: { value: "", valid: false },
//     modelo: { value: "", valid: false },
//     cantidadDisponible: { value: "", valid: false },
//     imagen: { value: "", valid: false },
//     categoria: { value: "", valid: false },
// });

// const sendData = async (e, state, url, contentType) => {
//     e.preventDefault();

//     let data = {};

//     for (const key in state) {
//         if (key === "precio" || key === "cantidadDisponible") data[key] = parseInt(state[key].value);
//         else data[key] = state[key].value;
//     }

//     console.log(data)

//     await axios.post(process.env.REACT_APP_BASE_URL + url, data, { headers: { "content-type": contentType } })
//         .then(res => {
//             console.log(res);
//         })
//         .catch(e => {
//             console.log(e)
//         })
//     setRes(true)

// };

export default NewProduct