import "../css/newModel.css";
import "../css/inputs.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, Fragment } from "react"
import axios from '../api/axios'
import { useForm, Control, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Alert from './Alert'

const schema = yup
    .object({
        nombreModelo: yup.string().min(4, "Debe ingresar al menos 3 caracteres").required(),
        categoria: yup.string().required("Debe seleccionar una categoria"),
        caracteristicas: yup.array()
            .of(
                yup.string()
                .min(4, "Debe ingresar al menos 4 caracteres")
                .matches(/^[A-Za-z\s]+$/, "Sólo puede ingresar caracteres alfabéticos"))
            .required("Tienes que ingresar al menos una caracteristica").min(1, "Debe tener al menos una característica"),
    })
    .required()



const NewModel = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm({
        resolver: yupResolver(schema)
    })

    const { fields, append, remove } = useFieldArray({
        name: "caracteristicas",
        control
    });


    const [listaCategorias, setListaCategorias] = useState(null);
    const [modelo, setModelo] = useState({ nombreModelo: "", categoria: "", caracteristicas: [""] });

    const capitalizeFirstLetter = (str) => { 
        // converting first letter to uppercase
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
    }

    const onSubmit = async (data) => {
        try {
            await axios.post(process.env.REACT_APP_BASE_URL + "crear-modelo", data)
        } catch (e) {
            Alert("error", "Error al crear el modelo");
            return
        }
        Alert("success", "¡Modelo creado!");
        reset();
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
        append("");
    }, [])


    return (
        <div className="newModel">
            <form className="container container-newModel" onSubmit={handleSubmit(onSubmit)}>

                <div className="input-container-newModel">
                    <input type="text" className="input input-newModel" placeholder="Nombre del modelo" {...register("nombreModelo")} />
                </div>
                {errors.nombreModelo && <p className="input-error-message">{errors.nombreModelo.message}</p>}

                <div className="input-container-newModel" id='newmodel-select'>
                    <select defaultValue={''} className="select" name="categoria" id="newmodel-categoria"  {...register("categoria")}>

                        <option disabled  value=''>Seleccione una categoria</option>
                        {listaCategorias && listaCategorias.map((categoria, i) => {
                            return <option key={categoria._id} value={categoria.categoria}>{capitalizeFirstLetter(categoria.categoria)}</option>
                        })}

                    </select>
                </div>
                {errors.categoria && <p className="input-error-message">{errors.categoria.message}</p>}

                {
                    fields.map((field, i) => {
                        return (
                            <Fragment key={field.id}>
                                <div className="input-container-newModel">
                                    <input 
                                        type="text"
                                        className="input input-newModel"
                                        placeholder="Caracteristica creada"
                                        {...register(`caracteristicas.${i}`)} />

                                    {fields.length > 1 ? (<FontAwesomeIcon icon={faTrash} className="trashIcon" onClick={() => remove(i)} listid={i} />) : null}
                                </div>
                                {errors?.caracteristicas?.[i] && <p className="input-error-message">{errors.caracteristicas[i].message}</p>}
                            </Fragment>
                        )
                    })
                }

                <div className="input-container-newModel plus" >
                    <FontAwesomeIcon icon={faPlus} className="plusIcon" />
                    <button type="button" onClick={() => append("")} className="input input-newModel plusinput" >Añadir Caracteristica</button>
                </div>

                <button className="btn btn-crear" type="submit" >Crear</button>

            </form>
        </div>
    );
};

export default NewModel;