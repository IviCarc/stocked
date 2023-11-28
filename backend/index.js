
const { register, login, logout, profile, verifyToken, resetPasswordRequest,resetPassword, changePassword} = require('./controllers/auth.controller.js');
const { authRequired } = require('./middlewares/validarToken.js')
const { validateSchema } = require('./middlewares/validarMiddleware.js')
const { registerSchema, loginSchema, productoSchema, modeloSchema, categoriaSchema } = require('./schemas/auth.schema.js')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const { crearProducto, eliminarProducto, crearCategoria, todosProductos, todasCategorias, obtenerProducto, editarProducto, crearModelo, todosModelos, obtenerModelo, obtenerModelosCategoria } = require('./controllers/controllers.js');
const cookieParser = require('cookie-parser');


const multer = require('multer')
const upload = multer({ dest: 'public/images/' })

// app.use(cors());1

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


app.use(express.json());
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(cookieParser());
URL = process.env.URL || 'http://localhost:5000';

// LogIn

app.post("/api/register", validateSchema(registerSchema), register)
app.post("/api/login", validateSchema(loginSchema), login)
app.post("/api/logout", logout)
app.get("/api/verifyToken",verifyToken)
app.get("/api/profile",authRequired ,profile)

app.post('/api/reset-password-request', resetPasswordRequest);
app.post('/api/reset-password/:token', resetPassword);
app.post('/api/reset-password',resetPassword);

app.post('/api/changePassword',authRequired, changePassword);

// Productos

app.get("/productos", authRequired, todosProductos);

app.get('/producto/:id', authRequired, obtenerProducto);

app.post('/crear-producto', authRequired, upload.single('imagen'), validateSchema(productoSchema), crearProducto);

app.put('/editar-producto', authRequired, editarProducto);

app.delete('/eliminar-producto/:id/:categoria', authRequired, eliminarProducto);

// Categorias
app.get("/categorias", authRequired, todasCategorias);

app.post('/crear-categoria', authRequired, validateSchema(categoriaSchema),crearCategoria);


// Modelos
app.get('/modelos', authRequired, todosModelos);

app.get('/modelo/:nombre', authRequired, obtenerModelo);

app.get('/categoriaModelo/:categoria', authRequired, obtenerModelosCategoria);

app.post('/crear-modelo', authRequired, validateSchema(modeloSchema),crearModelo);


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