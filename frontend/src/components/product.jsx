import { useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";


import "./product.css";

const Product = (props) => {
  const location = useLocation().pathname.split("/")[2]; // ID  

  return (
    <div className="producto">
      {
        props.productos && props.productos.map(obj => {
          if (obj._id == location) {
            return (
              <>
                {
                  <>
                    <div className="about-producto">
                      <div className="img-product">
                        <img src={require("../imgs/libro.avif")} alt="adawd" />
                        {/* props.img */}
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
                      <div className="info1">
                        <p>Autor:{obj.autor}</p>
                        <p>Editorial:{obj.editorial}</p>
                        <p>Edición:{obj.edicion}</p>
                      </div>
                        <div className="info2">
                          <p>Fecha de impresión:{obj.fechaImpresion}</p>
                          <p>Idioma:{obj.idioma}</p>
                        </div>
                      </div>
                      <div className="info-unidades">
                        <p><FontAwesomeIcon icon={faMinus} className="iconMinus" />Unidades Disponibles: {obj.cantidadDisponible}<FontAwesomeIcon icon={faPlus} className="iconPlus" /></p>
                      </div>
                    </div>
                  </>
                }
              </>
            )
          }
        })
      }

    </div>
  );
};

export default Product;
