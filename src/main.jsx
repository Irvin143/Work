import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Camara from './Camara.jsx'
import Principal from './Principal.jsx'
import InicioSesion from './InicioSesion.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <InicioSesion /> */}
    {/* <Principal/> */}
    {/* <Camara /> */}
  </StrictMode>,
)
