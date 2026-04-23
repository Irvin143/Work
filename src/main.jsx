import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Camara from './Camara.jsx'
import Principal from './Principal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Principal />
    <Camara />
  </StrictMode>,
)
