import "../css/newModel.css";
import "../css/inputs.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import axios from 'axios'


const NewModel = (props) => {

    const [caracteristicas, setCaracteristicas] = useState([""]);

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

    };

    const agregarCaracteristica = (e) => {
        // Al primer click escribe un 0, luego escribe el id correspondiente y así
        // setCaracteristicas([...caracteristicas,caracteristicas.length ==  0 ? 0 : caracteristicas[caracteristicas.length - 1 ] + 1]);
        setCaracteristicas([...caracteristicas, ""]);
    }

    const borrarCaracteristica = (i) => {
        const temp = [...caracteristicas];
        console.log(i)
        temp.splice(i, 1);
        setCaracteristicas(temp);
    }

    const actualizarCaracteristica = (e, i) => {
        const temp = [...caracteristicas];
        temp[i] = e.target.value
        console.log(temp)
        setCaracteristicas(temp)
    }

    return (
        <div className="newModel">
            <div className="container">
                <div className="cont">

                    <FontAwesomeIcon icon={faXmark} className="cruz" />
                    <input type="text" className="input inputs" placeholder="Nombre del modelo" />

                    {
                        caracteristicas && caracteristicas.map((obj, i) => {
                            return (
                                <div className="trash" key={i} >
                                    {/* RENDERIZA EL ICONO DE ELIMINAR SOLO SI SE AGREGÓ MAS DE UNA CARACTERISTICA */}
                                    {caracteristicas.length > 1  && 

                                    (<FontAwesomeIcon icon={faTrash} className="trashIcon" onClick={() => borrarCaracteristica(i)} listid={i} />)
                                   
                                    }
                                    <input type="text" className="input inputs trashInput " placeholder="Caracteristica creada" value={obj}
                                        onChange={(e) => actualizarCaracteristica(e, i)} />
                                </div>
                            )
                        })
                    }

                    <div className="plus" >
                        <FontAwesomeIcon icon={faPlus} className="plusIcon" />
                        <input type="submit" className="input inputs plusinput" onClick={agregarCaracteristica} value="Añadir Caracteristica" />
                    </div>

                    <button id="boton" type="button" className="btn" onClick={sendData}>Crear</button>

                </div>

            </div>
        </div>
    );
};

export default NewModel;
