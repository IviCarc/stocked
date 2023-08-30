import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';

import './App.css';
import Login from './components/login';
import StockView from './components/stockView'
import Header from './components/header'
import NewModel from "./components/newModel";
import Product from "./components/product";
import NewProduct from './components/newProduct';
import Register from './components/register';
import ChangePassword from './components/changePassword';

const App = () => {
  const [productos, setProductos] = useState(null);
  
  useEffect(() => {
    const fetchProductos = async () => {
      let res = await axios.get(process.env.REACT_APP_BASE_URL + 'todos-productos');
      setProductos(res.data)
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
        <Route path= 'ChangePassword' element={<ChangePassword/>}/>
        <Route path='register' element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
