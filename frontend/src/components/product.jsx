import { useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";


import "./product.css";


const Product = (props) => {

  const toggleReadOnly = () => {

    var elementos = document.querySelectorAll('.info-input');
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
            function GenerarInputs({ keys }) {
              const inputs = [];
      
              for (let i = 1; i < keys.length; i++) {
                const key = keys[i][0];
                const value = keys[i][1];
                const input = <input type="text" value={`${key}`} readOnly placeholder={`${value}`}/> ;
                inputs.push(input);
              }
            
              return <div className="info-input">{inputs}</div>;
            }

            
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
                        <GenerarInputs keys={keys} />
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
