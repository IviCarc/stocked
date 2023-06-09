import { useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";


import "../css/product.css";

const Product = (props) => {
  const location = useLocation().pathname.split("/")[2]; // ID  
console.log(location)
  return (
    <div className="producto">
      {
        props.productos && props.productos.map(obj => {
          if (obj._id === location) {
            return (
              <>
                {
                  <>
                    <div className="about-producto">
                      <div className="img-product">
                        <img src={`${process.env.REACT_APP_BASE_URL + "images/" + obj.imagen}`} alt="adawd" />
                      </div>
                      <div className="price-producto">
                        <button><p><b>Precio:${obj.precio} </b></p></button>
                        <hr />
                        <button><p><b>Editar</b> <FontAwesomeIcon icon={faPenToSquare} className="editIconProduct" /></p></button>
                        <hr />
                        <button><p><b>Eliminar</b> <FontAwesomeIcon icon={faTrash} className="trashIconProduct" /> </p></button>
                      </div>
                    </div>
                    <div className="info-producto">
                      <div className="info-titulo">
                        {obj.producto}
                      </div>
                      <div className="info">
                          <p>Autor:{obj.autor}</p>
                          <p>Editorial:{obj.editorial}</p>
                          <p>Edición:{obj.edicion}</p>
                          <p>Fecha de impresión:{obj.fechaImpresion}</p>
                          <p>Idioma:{obj.idioma}</p>
                      </div>
                      <div className="info-unidades">
                      <FontAwesomeIcon icon={faMinus} className="iconMinus" /><p>Unidades Disponibles: {obj.uDisponibles}</p><FontAwesomeIcon icon={faPlus} className="iconPlus" />
                      </div>
                    </div>
                  </>
                }
              </>
            )
          }
          return null
        })
      }

    </div>
  );
};

export default Product;
