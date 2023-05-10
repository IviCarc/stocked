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
             {/* ACA HACER LA PAGINA DEL PRODUCTO CON PROPS */}
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
