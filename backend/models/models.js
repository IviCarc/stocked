const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductosSchema = new Schema({
    producto : String,
    precio : Number,
    descripcion : String,
    categoria : String,
    cantidadDisponible : Number,
    imagenes : Buffer
})

const CategoriaSchema  = new Schema ({
    categoria : String,
    productos : [ProductosSchema]
})

const Producto = mongoose.model("Producto", ProductosSchema);
const Categoria = mongoose.model("Categoria", CategoriaSchema);

module.exports = {Categoria, Producto}