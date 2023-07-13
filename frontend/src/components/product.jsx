import { useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";


import "./product.css";


const Product = (props) => {

  const toggleReadOnly = () => {
  var boton = document.getElementById("editProduct");
  var elementos = document.querySelectorAll('.info-input');

  boton.addEventListener("click", function () {
    elementos.forEach(function (elemento) {
      if(elemento.readOnly == true){
        elemento.style.outline = "1px solid brown";
        elemento.readOnly = false;
        alert("A")
      }
      else if (elemento.readOnly == false){
        elemento.readOnly = true;
        elemento.style.outline = "none";
        console.log("B")
        
      }
    });

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
                if (key != "__v") {
                  inputs.push(<div className="caracteristica-container">
                    <b>{`${key}`}:</b>
                    <input type="text" readOnly placeholder={`${value}`} className="info-input input" />
                  </div>);
                }
              }

              return inputs;
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
                        <button className="btn-edit" id="editProduct" onClick={toggleReadOnly}><p><b>Editar</b> <FontAwesomeIcon icon={faPenToSquare} className="editIconProduct"  /></p></button>
                        <hr />
                        <button><p><b>Eliminar</b> <FontAwesomeIcon icon={faTrash} className="trashIconProduct" /> </p></button>
                      </div>
                    </div>
                    <div className="info-producto">
                      <div className="info-titulo">
                        {producto.producto}
                      </div>
                      <div className="info-cont">
                          <GenerarInputs keys={keys} />
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
