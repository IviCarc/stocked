import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom" 


import './App.css';
import Login from './components/login';
import StockView from './components/stockView'
import Header from './components/header'
import NewModel from "./components/newModel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route path='stock' element={<StockView/>}/>
          <Route path='new-model' element={<NewModel  />}/>
          
        </Route>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
