import { useLocation } from "react-router";
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
            <div>
              <div className="about-producto">
              <div className="img-product">
                <img src={require("../imgs/libro.avif")} alt="adawd" />
                {/* props.img */}
              </div>
              <div className="price-producto">
                <p><b>${props.precio}</b> </p>
                <hr />
                <p><b>Editar</b> </p>
                <hr />
                <p><b>Eliminar</b> </p>  
              </div>
             </div>
              <div className="info-producto">

              </div>
             </div>
             }
                {obj.producto}
             </>
            )
          }
        })
      }

    </div>
  );
};

export default Product;
