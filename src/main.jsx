import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/main.css'; // Sistema de estilos unificado PRIMERO
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// 🎯 FASE 3.2.3 - Service Worker Registration
import './utils/serviceWorkerManager.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/mcpapers-clon">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
