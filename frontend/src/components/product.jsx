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
                        <label htmlFor="autor">Autor<input name="autor" type="text" readOnly placeholder={obj.autor} /></label>
                        <label htmlFor="Editorial">Editorial<input type="text" readOnly placeholder={obj.editorial} /></label>
                        <label htmlFor="Edicion">Edicion<input type="text" readOnly placeholder={obj.edicion} /></label>
                      </div>
                        <div className="info2">
                        <label htmlFor="Fecha de impresión">Fecha de impresión<input type="text" readOnly placeholder={obj.fechaImpresion} /></label>
                        <label htmlFor="Idioma">Idioma:<input type="text" readOnly placeholder={obj.idioma} /></label>
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
