const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const { crearProducto, eliminarProducto, crearCategoria, todosProductos, todasCategorias, obtenerProducto, editarProducto, crearModelo, todosModelos, obtenerModelo } = require('./controllers.js');
const multer  = require('multer')
const upload = multer({ dest: 'public/images/' })

app.use(cors());

app.use(express.json());

app.use(express.static('public'));
app.use('/images', express.static('images'));

URL = process.env.URL || 'http://localhost:5000';


// Productos
app.get("/productos", todosProductos);

app.get('/producto/:id', obtenerProducto);

app.post('/crear-producto',upload.single('imagen'), crearProducto);

app.put('/editar-producto', editarProducto);

app.delete('/eliminar-producto/:id', eliminarProducto);

// Categorias
app.get("/categorias", todasCategorias);

app.post('/nueva-categoria', crearCategoria);


// Modelos
app.get('/modelos', todosModelos);

app.get('/modelo/:nombre', obtenerModelo);

app.post('/crear-modelo', crearModelo);


const start = async () => {
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1:27017/stocked'
        );
        app.listen(process.env.PORT | 5000, () => console.log("Server started on port", process.env.PORT || 5000));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();