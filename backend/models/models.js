const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductosSchema = new Schema({
    producto : String,
    precio : Number,
    descripcion : String,
    categoria : String,
    cantidadDisponible : Number,
    imagen : String
}, {strict : false});

const CategoriaSchema  = new Schema ({
    categoria : String,
    productos : [ProductosSchema]
})

const ModelosSchema = new Schema ({
    nombreModelo : String,
    caracteristicas : []
})

const Producto = mongoose.model("Producto", ProductosSchema);
const Categoria = mongoose.model("Categoria", CategoriaSchema);
const Modelo = mongoose.model("Modelo", ModelosSchema);

module.exports = {Categoria, Producto, Modelo}