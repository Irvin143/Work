import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./Principal";
import InicioSesion from "./InicioSesion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/principal/:usuario" element={<Principal />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;