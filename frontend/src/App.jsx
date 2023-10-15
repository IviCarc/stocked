import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './App.css';
import Login from './components/login';
import StockView from './components/stockView'
import Header from './components/header'
import NewModel from "./components/newModel";
import Product from "./components/product";
import NewProduct from './components/newProduct';
import CrearCategoria from './components/crearCategoria';

const App = () => {
  const [categorias, setCategorias] = useState(null);
  
  useEffect(() => {
    const fetchCategorias = async () => {
      let data = await fetch('http://localhost:5000/categorias')
        .then(res => res.json())
        .then(datos => {  
          setCategorias(datos);
        })
    }
    fetchCategorias();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route path='' element={<StockView categorias={categorias} />} />
          <Route path="productos/:id" element={<Product />} />
          <Route path='new-model' element={<NewModel />} />
          <Route path='new-product' element={<NewProduct />} />
          <Route path='new-category' element={<CrearCategoria />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
