import { useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";


import "./product.css";


const Product = (props) => {

  const toggleReadOnly = () => {

    var elementos = document.querySelectorAll('.inputs');

    elementos.forEach(function (elemento) {
      elemento.readOnly = !elemento.readOnly

    });

  }


  const id = useLocation().pathname.split("/")[2]; // ID  

  return (
    <div className="producto">
      {
        props.productos && props.productos.map(producto => {
          if (producto._id == id) {
            const keys = Object.entries(producto)
            // keys.map()
            // console.log(keys)
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
                        <button><p><b>Precio:${producto.precio} </b></p></button>
                        <hr />
                        <button onClick={toggleReadOnly}><p><b>Editar</b> <FontAwesomeIcon icon={faPenToSquare} className="editIconProduct" /></p></button>
                        <hr />
                        <button><p><b>Eliminar</b> <FontAwesomeIcon icon={faTrash} className="trashIconProduct" /> </p></button>
                      </div>
                    </div>
                    <div className="info-producto">
                      <div className="info-titulo">
                        {producto.producto}
                      </div>
                      <div className="info">
                        <div className="info1">
                          <label htmlFor="autor">Autor:<input className="inputs" id="A" name="autor" type="text" readOnly placeholder={producto.autor} /></label>
                          <label htmlFor="Editorial">Editorial:<input className="inputs" id="B" type="text" readOnly placeholder={producto.editorial} /></label>
                          <label htmlFor="Edicion">Edicion:<input className="inputs" type="text" readOnly placeholder={producto.edicion} /></label>
                        </div>
                        <div className="info2">
                          <label htmlFor="Fecha de impresión">Fecha de impresión<input className="inputs" type="text" readOnly placeholder={producto.fechaImpresion} /></label>
                          <label htmlFor="Idioma">Idioma:<input className="inputs" type="text" readOnly placeholder={producto.idioma} /></label>
                        </div>
                      </div>
                      <div className="info-unidades">
                        <p><FontAwesomeIcon icon={faMinus} className="iconMinus" />Unidades Disponibles: {producto.cantidadDisponible}<FontAwesomeIcon icon={faPlus} className="iconPlus" /></p>
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
