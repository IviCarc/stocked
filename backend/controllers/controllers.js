const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Producto, Categoria, Modelo, User } = require('../models/models');

const controller = {}

controller.todosProductos = async (req, res) => {
    const todosProductos = await Producto.find({
        user: req.user.id
    });
    return res.send(todosProductos)
}

// Funcion de la pagina principal
controller.todasCategorias = async (req, res) => {
    const usuario = await User.findById(req.user.id).populate({path: 'categorias', populate: {path: 'productos'}}).exec();
    return res.send(usuario.categorias);
}

controller.obtenerProducto = async (req, res) => {
    const { categoria, id } = req.params;
    const producto = await Producto.findOne({ _id: id });
    console.log("h")
    return res.send(producto);
}

// getAllProducts es la prueba que utiliza la página 

// Por ahora, el producto es agregado a cada categoria sin importar si ya fue agregado una vez, es decir hay repetidos.
// Hay que agregar la funcionalidad de la cantidad en el producto y utilizar la peticion PUT para editar esta.

controller.crearProducto = async (req, res, next) => {
    const usuario = await User.findOne({ _id: req.user.id }).exec();
    const nuevoProducto = new Producto(
        {
            ...req.body,
            imagen: req.file.filename
        })

    await nuevoProducto.save()

    for (const categoria of usuario.categorias) {
        if (categoria.categoria == req.body.categoria) {
            categoria.productos.push(nuevoProducto._id);
        }
    }

    // const categoria = await usuario.findOne({ categorias: { $elemMatch: { categoria: req.body.categoria } } }).exec()
    // console.log(categoria)
    // const categoria = await Categoria.findOne({ categoria: req.body.categoria }).exec()
    // categoria.productos.push(nuevoProducto._id);
    await usuario.save()
    return res.status(201).json(nuevoProducto);
};

controller.crearCategoria = async (req, res) => {
    const usuarioActualizado = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { categorias: req.body } });
    await usuarioActualizado.save();
    return res.status(201).json(req.body);
}

controller.editarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    await producto.save();
    return res.status(201).json(producto);
}

controller.eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOneAndDelete({ _id: id });

    const categoria = await Categoria.findOneAndUpdate({ productos: producto._id }, { $pull: { productos: producto._id } });

    await categoria.save();

    return res.status(201).json(producto);
}

// Modelos

controller.crearModelo = async (req, res) => {
    const data = {
        nombreModelo: req.body.nombreModelo,
        caracteristicas: req.body.caracteristicas,
    }
    const nuevoModelo = new Modelo(data)

    const usuario = await User.findOne({ _id: req.user.id }).exec()

    usuario.categorias.map((categoria, i) => {
        if (categoria.categoria == req.body.categoria) {
            categoria.modelos.push(nuevoModelo)
        }
    })

    await nuevoModelo.save();

    await usuario.save();

    return res.status(201).json(nuevoModelo);
}

// NO SE USA
controller.todosModelos = async (req, res) => {
    const modelos = await Modelo.find();
    const newArray = modelos.map(modelo => modelo.nombreModelo)
    return res.status(201).json(newArray)
}

controller.obtenerModelosCategoria = async (req, res) => {
    const categoriaEntrante = req.params.categoria;

    const usuario = await User.findOne({ _id: req.user.id, categorias: { $elemMatch: { categoria: categoriaEntrante } } }).populate('categorias.modelos').exec();

    let modelos;

    for (categoria of usuario.categorias) {
        if (categoria.categoria == categoriaEntrante) {
            modelos = categoria.modelos.map((modelo) => {
                return modelo.nombreModelo
            })
        }
    }

    return res.status(201).json(modelos);

}

controller.obtenerModelo = async (req, res) => {
    const { nombre } = req.params
    const modelo = await Modelo.findOne({ nombreModelo: nombre });
    res.send(modelo.caracteristicas)
}

module.exports = controller