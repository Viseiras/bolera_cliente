import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import NotFound from './views/NotFound';
import ListaJugadores from './views/ListaJugadores';
import FormularioJugador from './views/FormularioJugador';
import TablaHorarios from './views/TablaHorarios';
import FormularioReserva from './views/FormularioReserva';
import MinijuegoBolosAnimado from './views/MinijuegoBolosAnimado';
import DetalleJugadorView from './views/DetalleJugadorView';
import { fetchJugadores } from './api/boleraApi';
import useJugadoresAsync from './hooks/useJugadoresAsync';


function App() {
  // Leer jugadores de localStorage al iniciar
  const [jugadores, setJugadores] = useState(() => {
    const data = localStorage.getItem('jugadores');
    if (data) return JSON.parse(data);
    return [
      { nombre: 'Juan', edad: 25, puntuaciones: [] },
      { nombre: 'Ana', edad: 30, puntuaciones: [] }
    ];
  });

  const { jugadores: jugadoresAsync, loading: loadingJugadoresAsync, error: errorJugadoresAsync } = useJugadoresAsync();
  // Cuando los jugadores asíncronos se cargan, añadirlos al estado si no existen ya
  useEffect(() => {
    if (!loadingJugadoresAsync && !errorJugadoresAsync && Array.isArray(jugadoresAsync)) {
      const jugadoresNoExistentes = jugadoresAsync.filter(apiJ => !jugadores.some(localJ => localJ.nombre === apiJ.nombre));
      if (jugadoresNoExistentes.length > 0) {
        const actualizados = [...jugadores, ...jugadoresNoExistentes];
        setJugadores(actualizados);
        localStorage.setItem('jugadores', JSON.stringify(actualizados));
      }
    }
  }, [jugadoresAsync, loadingJugadoresAsync, errorJugadoresAsync]);

  // Solo una vez al entrar en la app, cargar jugadores de la API y guardarlos en localStorage si no existen
  useEffect(() => {
    fetchJugadores()
      .then(apiJugadores => {
        if (Array.isArray(apiJugadores) && apiJugadores.length > 0) {
          const data = localStorage.getItem('jugadores');
          let jugadoresLocal = data ? JSON.parse(data) : [];
          // Añadir solo los que no estén ya
          const nuevos = apiJugadores.filter(apiJ => !jugadoresLocal.some(localJ => localJ.nombre === apiJ.nombre));
          if (nuevos.length > 0) {
            const actualizados = [...jugadoresLocal, ...nuevos];
            localStorage.setItem('jugadores', JSON.stringify(actualizados));
            setJugadores(actualizados);
          }
        }
      })
      .catch(() => {});
  }, []);

  // useState para las reservas con función de inicialización para cargar desde localStorage
  const [reservas, setReservas] = useState(() => {
    const data = localStorage.getItem('reservas');
    return data ? JSON.parse(data) : [];
  });

  // Guardar en localStorage cuando cambian
  React.useEffect(() => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
  }, [jugadores]);
  React.useEffect(() => {
    localStorage.setItem('reservas', JSON.stringify(reservas));
  }, [reservas]);

  // Añade un nuevo jugador al estado y lo guarda en localStorage
  const handleAddJugador = (jugador) => {
    setJugadores([...jugadores, { ...jugador, puntuaciones: [] }]);
  };

  // Añade una nueva reserva al estado y la guarda en localStorage
  const handleReservar = ({ jugador, pistaId, hora }) => {
    if (reservas.some(r => r.pistaId === pistaId && r.hora === hora)) {
      alert('Esa pista ya está reservada a esa hora');
      return;
    }
    setReservas([...reservas, { jugador, pistaId, hora }]);
    alert('Reserva realizada correctamente');
  };

  // Función para manejar reservas desde la tabla de horarios, solicitando el nombre del jugador y validándolo antes de reservar
  const handleReservarDesdeTabla = (pistaId, hora) => {
    const jugador = prompt('Introduce el nombre del jugador para reservar:');
    if (!jugador) return;
    if (!jugadores.some(j => j.nombre === jugador)) {
      alert('Jugador no encontrado. Añádelo primero.');
      return;
    }
    handleReservar({ jugador, pistaId, hora });
  };

  // Elimina un jugador y todas sus reservas asociadas, solicitando confirmación antes de hacerlo
  const handleDeleteJugador = (idx) => {
    if (window.confirm('¿Seguro que quieres eliminar este jugador?')) {
      const jugadorEliminado = jugadores[idx].nombre;
      setJugadores(jugadores.filter((_, i) => i !== idx));
      setReservas(reservas.filter(r => r.jugador !== jugadorEliminado));
    }
  };

  // Función para quitar todas las reservas, solicitando confirmación antes de hacerlo
  const handleQuitarTodasReservas = () => {
    if (window.confirm('¿Seguro que quieres quitar todas las reservas?')) {
      setReservas([]);
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <div className="nav-wrapper">
        <nav className="main-nav">
          <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Inicio</NavLink>
          <NavLink to="/jugadores" className={({isActive}) => isActive ? "active" : ""}>Jugadores</NavLink>
          <NavLink to="/nuevo-jugador" className={({isActive}) => isActive ? "active" : ""}>Nuevo Jugador</NavLink>
          <NavLink to="/horarios" className={({isActive}) => isActive ? "active" : ""}>Horarios y Reservas</NavLink>
          <NavLink to="/reservar" className={({isActive}) => isActive ? "active" : ""}>Reservar Pista</NavLink>
          <NavLink to="/jugar-animado" className={({isActive}) => isActive ? "active" : ""}>Minijuego Animado</NavLink>
        </nav>
      </div>
      <main className="main-content" style={{ maxWidth: '1050px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jugadores" element={<ListaJugadores jugadores={jugadores} onDelete={handleDeleteJugador} />} />          
          <Route path="/jugadores/:nombre" element={<DetalleJugadorView jugadores={jugadores} />} />
          <Route path="/nuevo-jugador" element={<FormularioJugador onAdd={handleAddJugador} jugadores={jugadores} />} />
          <Route path="/horarios" element={<TablaHorarios reservas={reservas} onReservar={handleReservarDesdeTabla} onQuitarTodas={handleQuitarTodasReservas} />} />
          <Route path="/reservar" element={<FormularioReserva jugadores={jugadores} onReservar={handleReservar} />} />
          <Route path="/jugar-animado" element={<MinijuegoBolosAnimado />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
