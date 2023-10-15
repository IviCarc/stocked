const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Producto, Categoria, Modelo } = require('./models/models.js');

const controller = {}

controller.todosProductos = async (req, res) => {
    const todosProductos = await Producto.find();
    res.send(todosProductos)
}

// Funcion de la pagina principal
controller.todasCategorias = async (req, res) => {
    const todasCategorias = await Categoria.find().populate('productos');
    res.send(todasCategorias);
}

controller.obtenerProducto = async (req, res) => {
    const { categoria, id } = req.params;
    const producto = await Producto.findOne({ _id: id });
    res.send(producto);
}

controller.crearProducto = async (req, res, next) => {
    const nuevoProducto = new Producto(
        {
            ...req.body,
                imagen: req.file.filename
            })

    await nuevoProducto.save()

    const categoria = await Categoria.findOne({ categoria: req.body.categoria }).exec()
    categoria.productos.push(nuevoProducto._id);
    await categoria.save()
    return res.status(201).json(nuevoProducto);
};

controller.crearCategoria = async (req, res) => {
    const nuevaCategoria = new Categoria(req.body);
    await nuevaCategoria.save() 
    return res.status(201).json(nuevaCategoria);
}

controller.editarProducto = async (req, res) => {
    const id = req.body._id;
    console.log(id)
    const producto = await Producto.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    console.log(producto)
    await producto.save();
    return res.status(201).json(producto);
}

controller.eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOneAndDelete({ _id: id });

    const categoria = await Categoria.findOneAndUpdate({ productos: producto._id }, { $pull: { productos: producto._id } });

    await categoria.save();
    
    return res.status(204).json();
}

// Modelos

controller.crearModelo = async (req, res) => {
    const data = {
        nombreModelo: req.body.nombreModelo,
        caracteristicas: req.body.caracteristicas
    }
    const nuevoModelo = new Modelo(data);
    await nuevoModelo.save()
    const categoria = await Categoria.findOne({ categoria: req.body.categoria }).exec()
    categoria.modelos.push(nuevoModelo._id)
    await categoria.save()
    return res.status(201).json(nuevoModelo);
}

controller.todosModelos = async (req, res) => {
    const modelos = await Modelo.find();
    const newArray = modelos.map(modelo => modelo.nombreModelo)
    return res.status(201).json(newArray)
}

controller.obtenerModelosCategoria = async (req, res) => {
    const {categoria} = req.params;
    
    const populated = await Categoria.findOne({categoria : categoria}).populate('modelos').exec()
    
    try {
        modelos = populated.modelos.map(modelo => modelo.nombreModelo)
    
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

    console.log(modelos)
    return res.status(201).json(modelos)
}

controller.obtenerModelo = async (req, res) => {
    const { nombre } = req.params
    const modelo = await Modelo.findOne({ nombreModelo: nombre });
    res.send(modelo.caracteristicas)
}

module.exports = controller