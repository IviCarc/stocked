import "../css/crearCategoria.css";
import "../css/inputs.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import axios from 'axios'


const CrearCategoria = (props) => {

    const [categoria, setCategoria] = useState({ categoria: "" });

    const sendData = async (e, state, url, contentType) => {
        e.preventDefault();

        console.log(state)

        await axios.post(process.env.REACT_APP_BASE_URL + url, state, { headers: { "content-type": contentType } })
            .catch(e => {
                console.log(e)
            })
    };

    return (
        <div className="newCategoria">
            <div className="container-newCategoria container">

                <div className="input-container-newCategoria">
                    <input type="text" className="input input-newCategoria" placeholder="Nombre de la categoria" onChange={(e) => setCategoria({ categoria : e.target.value })} />
                </div>

                <button id="boton" type="button" className="btn" onClick={(e) => sendData(e, categoria, "crear-categoria", "application/json")}>Crear</button>

            </div>
        </div>
    );
};

export default CrearCategoria;