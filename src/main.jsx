import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/main.css'; // Sistema de estilos unificado PRIMERO
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/mcpapers-clon">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
