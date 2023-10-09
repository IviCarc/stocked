const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    categorias: [{
        categoria: String,
        productos: [{ type: Schema.Types.ObjectId, ref: "Producto" }],
        modelos: [{ type: Schema.Types.ObjectId, ref: "Modelo" }]
    }]
}, {
    timestamps: true
}
)

const ProductosSchema = new Schema({
    producto: String,
    precio: Number,
    descripcion: String,
    cantidadDisponible: Number,
    imagen: String
}, { strict: false });

const ModelosSchema = new Schema({
    nombreModelo: String,
    caracteristicas: []
})


const Producto = mongoose.model("Producto", ProductosSchema);
// const Categoria = mongoose.model("Categoria", CategoriaSchema);
const Modelo = mongoose.model("Modelo", ModelosSchema);
const User = mongoose.model('User', userSchema)

module.exports = { User, Producto, Modelo }