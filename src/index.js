import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// ESTA LÍNEA ES LA CLAVE: Importa el archivo de estilos de Tailwind
import './index.css';

// Usamos el ID 'root' definido en public/index.html
const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
