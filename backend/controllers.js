const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Producto, Categoria } = require('./models/models.js');

const controller = {}

controller.todosProductos = async (req, res) => {
    const todosProductos = await Producto.find();
    res.send(todosProductos)
}

// Funcion de la pagina principal
controller.todasCategorias = async (req, res) => {
    const todasCategorias = await Categoria.find();
    res.send(todasCategorias);
}

controller.obtenerProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOne({ _id: id });
    res.send(producto);
}

// getAllProducts es la prueba que utiliza la página

// Por ahora, el producto es agregado a cada categoria sin importar si ya fue agregado una vez, es decir hay repetidos.
// Hay que agregar la funcionalidad de la cantidad en el producto y utilizar la peticion PUT para editar esta.

controller.nuevoProducto = async (req, res, next) => {
    const categoriaProducto = req.body.categoria;
    console.log(req.file);
    const nuevoProducto = new Producto(
        {
            ...req.body,
            imagen: req.file.filename
        })
    await nuevoProducto.save();
    const categoria = await Categoria.findOne({ categoria: categoriaProducto }).exec();
    categoria.productos.push(nuevoProducto);
    await categoria.save();
    return res.status(201).json(categoria);
};

controller.nuevaCategoria = async (req, res) => {
    const nuevaCategoria = new Categoria(req.body);
    const categoriaInsertada = await nuevaCategoria.save();
    return res.status(201).json(categoriaInsertada);
}

controller.editarProducto = async (req, res ) => {

}

controller.editarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    console.log(producto)
    await producto.save();
    return res.status(201).json(producto);
}

controller.eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOneAndDelete({ _id: id });
    return res.status(204).json();
}

// BLUEPRINTS

controller.crearModelo = async (req, res) => {
    console.log(req.body);
    const temp = { modelo: String }
    req.body.caracteristicas.forEach(caracteristica => {
        temp[caracteristica] = "String"
    });
    console.log(temp)
    const nuevoModeloSchema = new Schema(temp)
    console.log(nuevoModeloSchema)
    const nuevoModelo = mongoose.model(req.body.nombreModelo, nuevoModeloSchema);
    res.send(req.body);
}

controller.getAllModels = async (req, res) => {
    const modelos =  (await mongoose.connection.db.listCollections().toArray()).flatMap(e => {
        if (e.name == 'categorias' || e.name == 'productos') {
            return []
        } else return e.name
    })
    res.send(modelos);
}

controller.getModelo = async (req, res) => {
    const { nombre } = req.params
    const modelo = mongoose.model(nombre)
    const caracteristicas = Object.keys(modelo.schema.obj)
    res.send(caracteristicas);
}

module.exports = controller