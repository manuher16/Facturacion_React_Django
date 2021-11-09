import React from 'react';
import Facturacion from './views/Facturacion'
import Historial from './views/Historial'
import Navbar from './components/navbar'
import Footer from './components/footer'
import About from "./views/About"
import Home from './views/Home';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
function App() {


  return (
    <div className="App" >
      <Navbar />
      <Routes>
        <Route path="facturacion" element={<Facturacion />} />
        <Route path="" element={<Home />} />
        <Route path="historial" element={<Historial />} />
        <Route path="about" element={<About />} />
      </Routes>


    </div>
  );
}

export default App;
