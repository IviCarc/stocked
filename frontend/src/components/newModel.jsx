import "./newModel.css";
import "./inputs.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'


const NewModel = (props) => {
  return (
    <div className="newModel">
      <div className="container">
        <div className="cont">

          <FontAwesomeIcon icon={faXmark} className="cruz" />
          <input type="text" className="input inputs" placeholder="Nombre del modelo" />
          <input type="number" min={1} className="input inputs" placeholder="Unidades" />

          <div className="cluod" >
          <FontAwesomeIcon icon={faCloudArrowUp} className="cloudIcon" />
          <input type="submit" className="input inputs cloudInput " value="Subir foto"/>
          </div>

          <div className="trash" >
          <FontAwesomeIcon icon={faTrash} className="trashIcon" />
          <input type="text" className="input inputs trashInput " placeholder="Caracteristica creada"/>
          </div>

          <div className="plus" >
          <FontAwesomeIcon icon={faPlus} className="plusIcon" />
          <input type="submit" className="input inputs plusinput " value="Añadir Caracteristica"/>
          </div>

          <button type="button" className="input inputs" id="boton">Crear</button>
        </div>

      </div>
    </div>
  );
};

export default NewModel;
