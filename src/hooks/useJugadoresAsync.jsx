import { useState, useEffect } from "react";
import { fetchJugadores } from "../api/boleraApi";

export default function useJugadoresAsync() {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchJugadores()
      .then(data => setJugadores(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { jugadores, loading, error };
}
