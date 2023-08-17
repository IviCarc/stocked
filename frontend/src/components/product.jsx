import { useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";


import "../css/product.css";


const Product = (props) => {

  const [isEditing, setIsEditing] = useState(false); // Agrega estado para el modo de edición

  const toggleReadOnly = () => {
    setIsEditing(!isEditing); // Cambiar el estado directamente al contrario del valor actual
  };

  const EditableInput = ({ value, onSave }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleSave = () => {
      onSave(inputValue);
    };

    const handleProductUpdate = (productId, updatedValues) => {
      // Encuentra el índice del producto en el array según el _id
      const productIndex = props.productos.findIndex(producto => producto._id === productId);
    
      if (productIndex !== -1) {
        // Crea una copia del array de productos para evitar mutar el estado directamente
        const updatedProductos = [...props.productos];
    
        // Actualiza los valores del producto usando el índice
        updatedProductos[productIndex] = {
          ...updatedProductos[productIndex],
          ...updatedValues
        };
    
        // Actualiza el estado con los productos actualizados
        props.setProductos(updatedProductos); // Asumiendo que tienes una función setProductos en el componente padre
      }
    };

    const handleInputClick = (e) => {
      e.stopPropagation(); // Detener la propagación del evento para que no llegue al contenedor
      setIsEditing(true);
    };

    return (
      <div >
        {isEditing ? (
          <input placeholder={`${value}`} 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleSave}
            autoFocus
            className="input-editing"
          />
        ) : (
          <span>{inputValue}</span>
        )}
      </div>
    );
  };


  const id = useLocation().pathname.split("/")[2]; // ID  

  return (
    <div className="producto">
      {
        props.productos && props.productos.map(producto => {
          if (producto._id === id) {
            const keys = Object.entries(producto);

            return (
              <>
                <div className="about-producto">
                  <div className="img-product">
                    <img src={require("../imgs/libro.avif")} alt="adawd" />
                  </div>
                  <div className="price-producto">
                    <button><p><b>Precio: ${producto.precio}</b></p></button>
                    <hr />
                    <button className="btn-edit" id="editProduct" onClick={toggleReadOnly}>
                      <p>
                        <b>{isEditing ? "Guardar" : "Editar"}</b>{" "}
                        <FontAwesomeIcon icon={faPenToSquare} className="editIconProduct" />
                      </p>
                    </button>
                    <hr />
                    <button><p><b>Eliminar</b> <FontAwesomeIcon icon={faTrash} className="trashIconProduct" /> </p></button>
                  </div>
                </div>
                <div className="info-producto">
                  <div className="info-titulo">
                    {producto.producto}
                  </div>
                  <div className="info-cont">
                    {keys.map(([key, value], index) => {
                      if (key !== "__v" && key!=="cantidadDisponible") {
                        return (
                          <div className="caracteristica-container info-input input" key={index}>
                            <b>{key}:</b>
                            <EditableInput className="info-input input"
                              value={value}
                              onSave={(newValue) => {
                                // Aquí debes implementar la lógica para guardar el nuevo valor
                                // en el estado o en la fuente de datos.
                                console.log(`Guardado nuevo valor para ${key}: ${newValue}`);
                              }}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div className="info-unidades">
                    <p><FontAwesomeIcon icon={faMinus} className="iconMinus" />Unidades Disponibles: {producto.cantidadDisponible}<FontAwesomeIcon icon={faPlus} className="iconPlus" /></p>
                  </div>
                </div>
              </>
            );
          }
        })
      }
    </div>
  );
};

export default Product;


