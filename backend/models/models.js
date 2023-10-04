const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductosSchema = new Schema({
    producto : String,
    precio : Number,
    descripcion : String,
    // categoria : {type:Schema.Types.ObjectId, ref: "Categoria"},
    cantidadDisponible : Number,
    imagen : String
}, {strict : false});

const ModelosSchema = new Schema ({
    nombreModelo : String,
    caracteristicas : []
})

const CategoriaSchema  = new Schema ({
    categoria : String,
    productos : [{type : Schema.Types.ObjectId, ref: "Producto"}],
    modelos : [{type : Schema.Types.ObjectId, ref: "Modelo"}]
})

const Producto = mongoose.model("Producto", ProductosSchema);
const Categoria = mongoose.model("Categoria", CategoriaSchema);
const Modelo = mongoose.model("Modelo", ModelosSchema);

module.exports = {Categoria, Producto, Modelo}