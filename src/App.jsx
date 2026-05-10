import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./Principal";
import InicioSesion from "./InicioSesion";
import Camara from "./Camara";
import Estadisticas  from "./Estadisticas";
import SubirVideo from "./SubirVideo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/principal/:usuario" element={<Principal />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/camara" element={<Camara />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/subir-video" element={<SubirVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;