import { createContext, useContext, useState, useEffect } from "react";

const JugadoresContext = createContext();

export function JugadoresProvider({ children }) {
  const [jugadores, setJugadores] = useState(() => {
    const data = localStorage.getItem('jugadores');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
  }, [jugadores]);

  const addJugador = (jugador) => {
    setJugadores((prev) => [...prev, jugador]);
  };

  const removeJugador = (idx) => {
    setJugadores((prev) => {
      const nuevos = prev.filter((_, i) => i !== idx);
      localStorage.setItem('jugadores', JSON.stringify(nuevos));
      return nuevos;
    });
  };

  return (
    <JugadoresContext.Provider value={{ jugadores, addJugador, removeJugador }}>
      {children}
    </JugadoresContext.Provider>
  );
}

export function useJugadores() {
  return useContext(JugadoresContext);
}
