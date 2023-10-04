import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './App.css';
import Login from './components/login';
import StockView from './components/stockView'
import Header from './components/header'
import NewModel from "./components/newModel";
import Product from "./components/product";
import NewProduct from './components/newProduct';

const App = () => {
  const [productos, setProductos] = useState(null);
  
  useEffect(() => {
    const fetchProductos = async () => {
      // let data = await axios.get('http://169.254.40.154:5000/todos-productos');
      let data = await fetch('http://localhost:5000/productos')
        .then(res => res.json())
        .then(datos => {  
          setProductos(datos);
        })
    }
    fetchProductos();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route path='stock' element={<StockView productos={productos} />} />
          <Route path="productos/:id" element={<Product productos={productos} />} />
          <Route path='new-model' element={<NewModel />} />
          <Route path='new-product' element={<NewProduct />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
