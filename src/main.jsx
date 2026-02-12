import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { JugadoresProvider } from './context/JugadoresContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JugadoresProvider>
      <App />
    </JugadoresProvider>
  </StrictMode>,
);
