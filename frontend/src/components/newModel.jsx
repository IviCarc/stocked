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

    // const [nombreModelo, setNombreModelo] = useState("");
    const [modelo, setModelo] = useState({nombreModelo : "", caracteristicas : [""]});

    const sendData = async (e, state, url, contentType) => {
        e.preventDefault();

        await axios.post(process.env.REACT_APP_BASE_URL + url, state, { headers: { "content-type": contentType } })
            .catch(e => {
                console.log(e)
            })
    };

    const agregarCaracteristica = (e) => {
        setModelo({...modelo, caracteristicas : [...modelo.caracteristicas, ""]});
    }

    const borrarCaracteristica = (i) => {
        const temp = {...modelo};
        temp.caracteristicas.splice(i, 1);
        setModelo(temp);
    }

    const actualizarCaracteristica = (e, i) => {
        const temp = {...modelo};
        temp.caracteristicas[i] = e.target.value    
        console.log(temp)
        setModelo(temp)
    }

    return (
        <div className="newModel">
            <div className="container">
                <div className="cont">
                    
                    <input type="text" className="input inputs trashInput" placeholder="Nombre del modelo" onChange={(e) => setModelo({...modelo, nombreModelo : e.target.value})}/>

                    {
                        modelo.caracteristicas && modelo.caracteristicas.map((value, i) => {
                            return (
                                <div className="trash" key={i} >
                                    {/* RENDERIZA EL ICONO DE ELIMINAR SOLO SI SE AGREGÓ MAS DE UNA CARACTERISTICA */}
                                    {modelo.caracteristicas.length > 1  && 

                                    (<FontAwesomeIcon icon={faTrash} className="trashIcon" onClick={() => borrarCaracteristica(i)} listid={i} />)
                                   
                                    }
                                    <input type="text" className="input inputs trashInput " placeholder="Caracteristica creada" value={value}
                                        onChange={(e) => actualizarCaracteristica(e, i)} />
                                </div>
                            )
                        })
                    }

                    <div className="plus" >
                        <FontAwesomeIcon icon={faPlus} className="plusIcon" />
                        <input type="submit" className="input inputs plusinput" onClick={agregarCaracteristica} value="Añadir Caracteristica" />
                    </div>

                    <button id="boton" type="button" className="btn" onClick={(e) => sendData(e, modelo, "crear-modelo", "application/json")}>Crear</button>

                </div>

            </div>
        </div>
    );
};

export default NewModel;