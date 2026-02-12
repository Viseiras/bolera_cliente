import React, { useState } from "react";
import { useJugadores } from "../context/JugadoresContext";

// Vista para el formulario de reserva de pistas, con validación
export default function FormularioReserva({ onReservar }) {
  const { jugadores } = useJugadores();
  const [jugador, setJugador] = useState("");
  const [pistaId, setPistaId] = useState(1);
  const [hora, setHora] = useState("10:00");
  const [error, setError] = useState("");

  const HORAS = [
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
  ];
  const PISTAS = [
    { id: 1, nombre: "Pista 1" },
    { id: 2, nombre: "Pista 2" },
    { id: 3, nombre: "Pista 3" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jugador) {
      setError("Selecciona un jugador");
      return;
    }
    setError("");
    onReservar({ jugador, pistaId, hora });
  };

  return (
    <form onSubmit={handleSubmit} style={{
      marginTop: '2em',
      background: '#f8fbff',
      padding: '2em 1.5em',
      borderRadius: '10px',
      boxShadow: '0 1px 6px #0001',
      maxWidth: '420px',
      margin: '2em auto 1em auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2em',
      border: '1px solid #b3c6e0'
    }}>
      <h2 style={{textAlign:'center', textTransform:'uppercase', color:'#0077cc', marginBottom:'1em'}}>Reservar Pista</h2>
      <label style={{fontWeight:'bold', marginBottom:'0.5em'}}>Jugador:</label>
      <select value={jugador} onChange={e => setJugador(e.target.value)} style={{padding:'0.7em', borderRadius:'5px', border:'1px solid #b3c6e0', fontSize:'1em', marginBottom:'1em'}}>
        <option value="">Selecciona</option>
        {jugadores && jugadores.map((j, idx) => (
          <option key={idx} value={j.nombre}>{j.nombre}</option>
        ))}
      </select>
      <label style={{fontWeight:'bold', marginBottom:'0.5em'}}>Pista:</label>
      <select value={pistaId} onChange={e => setPistaId(Number(e.target.value))} style={{padding:'0.7em', borderRadius:'5px', border:'1px solid #b3c6e0', fontSize:'1em', marginBottom:'1em'}}>
        {PISTAS.map(p => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>
      <label style={{fontWeight:'bold', marginBottom:'0.5em'}}>Hora:</label>
      <select value={hora} onChange={e => setHora(e.target.value)} style={{padding:'0.7em', borderRadius:'5px', border:'1px solid #b3c6e0', fontSize:'1em', marginBottom:'1em'}}>
        {HORAS.map(h => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>
      <button type="submit" style={{background:'#0077cc', color:'#fff', border:'none', cursor:'pointer', fontWeight:'bold', padding:'0.7em', borderRadius:'5px', fontSize:'1em', transition:'background 0.2s'}}>
        Reservar
      </button>
      {error && <p style={{color:'red', textAlign:'center'}}>{error}</p>}
    </form>
  );
}
