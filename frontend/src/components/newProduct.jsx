import { useState, useEffect } from "react"
import '../css/newProduct.css'
import '../css/inputs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import axios from '../api/axios'

import * as yup from 'yup'
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup
    .object({
        producto: yup.string().min(4, "Mínimo 4 caracteres").required(),
        precio: yup.number().min(0).required(),
        descripcion: yup.string().min(4, "Mínimo 4 caracteres").required(),
        cantidadDisponible: yup.number().integer("Debe ingresar números enteros").min(0).required(),
        categoria: yup.string().required("Debe seleccionar una categoria"),
        modelo: yup.string(),
        imagen: yup.mixed().required("Debe subir una imagen")
            .test("test", "La imagen debe tener formato JPG o PNG", value => {
                return value.type === "image/jpeg" || value.type === "image/png"
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
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            cantidadDisponible: 0,
            precio: 0
        }
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

    const obtenerModelos = async (categoria) => {
        const modelos = await axios.get(process.env.REACT_APP_BASE_URL + 'categoriaModelo/' + categoria);
        setListaModelos(modelos.data);
    }

    const obtenerCaracteristicasModelo = async (e) => {
        setInputsModelo((await axios.get(process.env.REACT_APP_BASE_URL + 'modelo/' + e.target.value)).data)
    }


    const obtenerCategorias = async () => {
        const categorias = await axios.get(process.env.REACT_APP_BASE_URL + 'categorias');
        setListaCategorias(categorias.data);
    }

    useEffect(() => {
        obtenerCategorias()
            .catch(e => {
                console.log(e)
            });
    }, [])

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(process.env.REACT_APP_BASE_URL + "crear-producto", data, { headers: { 'Content-Type': 'multipart/form-data' } })
        } catch(e) {
            alert(e.response.data.message)
        }
    }

    const allowOnlyNumber = (value) => {
        return value.replace(/[^0-9]/g, '')
    }

    const onChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue === "") {
            setValue(e.target.name, 0);
            return;
        }

        if (isNaN(parseFloat(inputValue))) {
            console.log("NAN")
            return ; // No se modifica el valor si no es numérico
        }

        if (inputValue[0] == "0") {
            console.log(parseFloat(inputValue) * 1)
            setValue(e.target.name, parseFloat(inputValue) * 1);
            console.log(inputValue)

            return  
        }
        // Se actualiza el valor utilizando setValue
        setValue(e.target.name, parseFloat(inputValue));
    };



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
                        <div className="newproduct-select-container " id=''>
                            <select className="select select-newProduct" id="" {...register("categoria")}
                                onChange={(e) => obtenerModelos(e.target.value)}>

                                <option selected disabled value=''>Seleccione una categoria</option>

                                {listaCategorias && listaCategorias.map((categoria, i) => {
                                    return <option key={i} value={categoria.categoria}>{capitalizeFirstLetter(categoria.categoria)}</option>
                                })}

                            </select>
                        </div>
                            {errors.categoria && <p className="input-error-message">{errors.categoria.message}</p>}
                    </div>

                    <div className="input-div">
                        <label htmlFor="modelo" className='input-label'>Modelo</label>
                        <div className="newproduct-select-container" id=''>
                            <select className="select select-newProduct" id="modelo" {...register("modelo")}
                                onChange={obtenerCaracteristicasModelo}>
                                <option selected disabled value=''>Seleccione un modelo</option>
                                {listaModelos && listaModelos.map((modelo, i) => {
                                    return <option key={i} value={modelo}>{capitalizeFirstLetter(modelo)}</option>
                                })}
                            </select>
                        </div>
                        {errors.modelo && <p className="input-error-message">{errors.modelo.message}</p>}
                    </div>

                    <div className="input-div">
                        <label htmlFor="descripcion" className='input-label'>Descripción del producto:</label>
                        <input className='input' type="text" {...register("descripcion")} />
                        {errors.descripcion && <p className="input-error-message">{errors.descripcion.message}</p>}
                    </div>

                    <div className="input-div">
                        <label htmlFor="cantidadDisponible" className='input-label'>Cantidad del producto:</label>
                        <Controller
                            control={control}
                            name="cantidadDisponible"
                            render={({ field }) => (
                                <input
                                    {...register("cantidadDisponible")}
                                    className="input"
                                    type="number"
                                    onChange={onChange}
                                    value={field.value}
                                />
                            )}
                        />
                        {errors.cantidadDisponible && <p className="input-error-message">{errors.cantidadDisponible.message}</p>}
                    </div>
                    <div className="input-div">
                        <label htmlFor="precio" className='input-label'>Precio:</label>
                        <Controller
                            control={control}
                            name="precio"
                            render={({ field }) => (
                                <input
                                    {...register("precio")}
                                    className="input"
                                    type="number"
                                    onChange={onChange}
                                    value={field.value}
                                />
                            )}
                        />
                        {/* <input className='input' type="number"  {...register("precio")} /> */}
                        {errors.precio && <p className="input-error-message">{errors.precio.message}</p>}
                    </div>

                    <div className="input-div">
                        <label htmlFor="imagen" className='input-label'>Subir imagen:</label>
                        {/* INPUT CONTROLADO PARA LA IMAGEN */}
                        <Controller
                            control={control}
                            name="imagen"
                            render={({ field: { value, onChange } }) => (
                                <input className='' type="file" id="imagen"  {...register("imagen")}
                                    value={value?.fileName}
                                    onChange={(e) => {
                                        onChange(e.target.files[0]);
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
                    </div>

                    {/* RENDERIZA LOS INPUTS NUEVOS */}

                    {inputsModelo && inputsModelo.map((caracteristica, i) => {
                        return (
                            <div className="input-div" key={i}>
                                <label htmlFor={caracteristica} className='input-label'>{capitalizeFirstLetter(caracteristica)}:</label>
                                <input className='input' type="text" name={caracteristica}
                                    {...register(caracteristica)} />
                            </div>
                        )
                    })}

                </div>

                <button className='btn' id='send-btn' type="submit">Subir producto</button>

                {
                    res && <p className='sended'>Producto enviado correctamente</p>
                }

            </form>
        </div>
    )
}

export default NewProduct