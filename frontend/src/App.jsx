import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


import './App.css';
import Login from './components/login';
import StockView from './components/stockView'
import Header from './components/header'
import NewModel from "./components/newModel";
import Product from "./components/product";
import NewProduct from './components/newProduct';
import Register from './components/register';
import CrearCategoria from './components/crearCategoria';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import ResetPasswordRequest from './components/resetPasswordRequest';
import CambiarContraseña from './components/cambiarContraseña';
import ResetPassword from './components/resetPassword';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='resetPasswordRequest' element={<ResetPasswordRequest />} />
          <Route path='resetPassword' element={<ResetPassword />} />
          <Route path='reset-password/:token' element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Header />}>
              <Route path='' element={<StockView />} />
              <Route path="producto/:id" element={<Product />} />
              <Route path='new-product' element={<NewProduct />} />
              <Route path='new-model' element={<NewModel />} />
              <Route path='new-category' element={<CrearCategoria />} />
              <Route path='cambiarContraseña' element={<CambiarContraseña />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
