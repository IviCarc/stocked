const mongoose = require('mongoose');
const fs = require('fs');

const {Producto, Categoria} = require('./models/models.js');


// MULTER
const multer = require('multer');

const storage = multer.diskStorage({})

const upload = multer({ storage: storage }).single('imagenes')

const controller = {}

controller.todosProductos = async (req, res) => {
    const todosProductos = await Producto.find();
    console.log("H")
    res.send(todosProductos)
}

// Funcion de la pagina principal
controller.todasCategorias = async (req, res) => {
    const todasCategorias = await Categoria.find();
    res.send(todasCategorias);
}

controller.obtenerProducto = async (req, res) => {
    const {categoria, id} = req.params;
    const producto = await Producto.findOne({_id : id});
    // const categoria = await Categoria.findOne({categoria:categoria});
    // const producto = Categoria
    res.send(producto);
}

// getAllProducts es la prueba que utiliza la página

// Por ahora, el producto es agregado a cada categoria sin importar si ya fue agregado una vez, es decir hay repetidos.
// Hay que agregar la funcionalidad de la cantidad en el producto y utilizar la peticion PUT para editar esta.

controller.nuevoProducto = async (req,res ) => {
    upload(req, res, async (err) => {
        if (err) {
          res.sendStatus(500);
        }
        const categoriaProducto = req.body.categoria;
        const nuevoProducto = new Producto(
            {
                ...req.body, 
                // imagenes : fs.readFileSync(`${req.file.path}`)
            });
        const productoInsertado = await nuevoProducto.save();
        const categoria =  await Categoria.findOne({ categoria: categoriaProducto}).exec();
        categoria.productos.push(nuevoProducto);
        const  categoriaGuardada = await categoria.save();
        return res.status(201).json(categoria);
      });
}

controller.nuevaCategoria = async (req, res ) => {
    console.log(req.body)
    const nuevaCategoria = new Categoria(req.body);
    const categoriaInsertada = await nuevaCategoria.save();
    return res.status(201).json(categoriaInsertada);
}

controller.editarProducto = async (req, res ) => {

}


module.exports = controller