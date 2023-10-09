
const {register, login, logout, profile } = require('./controllers/auth.controller.js');
const {authRequired} = require('./middlewares/validarToken.js')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const { crearProducto, eliminarProducto, crearCategoria, todosProductos, todasCategorias, obtenerProducto, editarProducto, crearModelo, todosModelos, obtenerModelo, obtenerModelosCategoria } = require('./controllers/controllers.js');
const cookieParser = require('cookie-parser');

const multer  = require('multer')
const upload = multer({ dest: 'public/images/' })

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(cookieParser());
URL = process.env.URL || 'http://localhost:5000';

app.post("/api/register",register)
app.post("/api/login", login)
app.post("/api/logout", logout)
app.get("/api/profile",authRequired ,profile)

app.get("/todos-productos", authRequired, todosProductos);

// Productos
app.get("/productos", authRequired, todosProductos);

app.get('/producto/:id', authRequired, obtenerProducto);

app.post('/crear-producto', authRequired,upload.single('imagen'),
crearProducto);

app.put('/editar-producto', authRequired, editarProducto);

app.delete('/eliminar-producto/:id', authRequired, eliminarProducto);

// Categorias
app.get("/categorias", authRequired, todasCategorias);

app.post('/crear-categoria', authRequired, crearCategoria);


// Modelos
app.get('/modelos', authRequired, todosModelos);

app.get('/modelo/:nombre', authRequired, obtenerModelo);

app.get('/categoriaModelo/:categoria', authRequired, obtenerModelosCategoria);

app.post('/crear-modelo', authRequired, crearModelo);


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