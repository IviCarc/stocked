const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const { nuevoProducto, nuevaCategoria, todosProductos, todasCategorias, obtenerProducto } = require('./controllers.js');


app.use(cors());

app.use(express.json());

URL = process.env.URL || 'http://localhost:5000';

app.get("/todos-productos", todosProductos);

app.get("/todas-categorias", todasCategorias);

app.get('/get/:id', obtenerProducto);

app.post('/nuevo-producto', nuevoProducto);

app.post('/nueva-categoria', nuevaCategoria);


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