import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "../css/product.css";


const Product = (props) => {
  const navigate = useNavigate();

  const handleEliminarProducto = async (productId) => {
    try {
      // Mostrar una ventana de confirmación antes de eliminar
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');

      if (confirmDelete) {
        const res = await fetch(`http://localhost:5000/eliminar-producto/${productId}`, {
          method: 'DELETE',
        });
        if (res.status === 204) {
          // Redirige a la página de stock
          navigate('/stock');
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const [isEditing, setIsEditing] = useState(false); // Agrega estado para el modo de edición

  const toggleReadOnly = () => {
    setIsEditing(!isEditing); // Cambiar el estado directamente al contrario del valor actual
  };

  const EditableInput = ({ value, onSave }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleSave = () => {
      onSave(inputValue);
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
                    <button onClick={() => handleEliminarProducto(producto._id)}><p><b>Eliminar</b> <FontAwesomeIcon icon={faTrash} className="trashIconProduct" /> </p></button>
                  </div>
                </div>
                <div className="info-producto">
                  <div className="info-titulo">
                    {producto.producto}
                  </div>
                  <div className="info-cont">
                    {keys.map(([key, value], index) => {
                      if (key !== "__v" && key !== "cantidadDisponible") {
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
          return null
        })
      }
    </div>
  );
};

export default Product;


