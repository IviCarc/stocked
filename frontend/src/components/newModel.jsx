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

    const [caracteristicas, setCaracteristicas] = useState([]);
    
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

    const [nuevoModelo, setNuevoModelo] = useState({
        producto: { value: "", valid: false },
        descripcion: { value: "", valid: false },
        precio: { value: "", valid: false },
        categoria: { value: "", valid: false },
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

    };

    const agregarCaracteristica = (e) => {
        console.log(caracteristicas);
        setCaracteristicas(<input type="text" className="input inputs" placeholder="Característica" />);
        console.log(caracteristicas);
    }

    return (
        <div className="newModel">
            <div className="container">
                <div className="cont">

                    <FontAwesomeIcon icon={faXmark} className="cruz" />
                    <input type="text" className="input inputs" placeholder="Nombre del modelo" />

                    {
                        caracteristicas
                    }

                    <div className="plus" >
                        <FontAwesomeIcon icon={faPlus} className="plusIcon" />
                        <input type="submit" className="input inputs plusinput" onClick={agregarCaracteristica} value="Añadir Caracteristica" />
                    </div>

                    <button type="button" className="btn" onClick={sendData}>Crear</button>

                    {/* <input type="text" className="input inputs" placeholder="Característica" /> */}

                    {/* <div className="cluod" >
                        <FontAwesomeIcon icon={faCloudArrowUp} className="cloudIcon" />
                        <input type="submit" className="input inputs cloudInput " value="Subir foto" />
                    </div> */}
                    {/* 
                    <div className="trash" >
                        <FontAwesomeIcon icon={faTrash} className="trashIcon" />
                        <input type="text" className="input inputs trashInput " placeholder="Caracteristica creada" />
                    </div> */}
                </div>

            </div>
        </div>
    );
};

export default NewModel;
