import {useState} from "react"
import './inputs.css'

const NewProduct = () => {

    const [producto ,setProducto] = useState(null)

    const subirProducto = (e) => {
        console.log("ENVIADO")
    }

    return (
        <div className="new-product">
            <div className="input-div">
                <label htmlFor="producto">Nombre del producto:</label>
                <input className='input' type="text" name="producto"/>
            </div>
            <div className="input-div">
                <label htmlFor="categoria">Categoría</label>
                <select name="categoria" id='categoria'>
                    <option selected disabled>Categoría</option>
                    <option value="lg">lg</option>
                </select>
            </div>
            <div className="input-div">
                <label htmlFor="producto">Cantidad del producto:</label>
                <input className='input' type="number" name="cantidad"/>
            </div>
            <div className="input-div">
                <label htmlFor="precio">Precio:</label>
                <input className='input' type="number" name="precio"/>
            </div>
            <div className="input-div">
                <label htmlFor="producto">Subir imagen:</label>
                <input className='' type="file" name="producto"/>
            </div>
            <button className='btn' onClick={subirProducto}>Subir producto</button>
        </div>
    )
}

export default NewProduct