import React, { useState } from "react";
import { useJugadores } from "../context/JugadoresContext";

// Vista para el formulario de alta de jugadores, con validación
export default function FormularioJugador() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [error, setError] = useState("");
  const { jugadores, addJugador } = useJugadores();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !/^[0-9]+$/.test(edad) || Number(edad) < 1 || Number(edad) > 120) {
      setError("Introduce un nombre válido y una edad numérica entre 1 y 120");
      alert("Error: introduce un nombre válido y una edad numérica entre 1 y 120");
      return;
    }
    // Comprobar duplicados solo en localStorage
    const nombreLower = nombre.trim().toLowerCase();
    const existeLocal = jugadores && jugadores.some(j => j.nombre.toLowerCase() === nombreLower);
    if (existeLocal) {
      setError("Ese nombre ya existe, elige otro nombre para el jugador");
      alert("Error: ese nombre ya existe, elige otro nombre para el jugador");
      return;
    }
    setError("");
    addJugador({ nombre, edad: Number(edad) });
    alert("Jugador añadido correctamente");
    setNombre("");
    setEdad("");
  };

  return (
    <div>
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
        <h2 style={{textAlign:'center', textTransform:'uppercase', color:'#0077cc', marginBottom:'1em'}}>Nuevo Jugador</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          style={{padding:'0.7em', borderRadius:'5px', border:'1px solid #b3c6e0', fontSize:'1em' }}
        />
        <input
          type="text"
          placeholder="Edad"
          value={edad}
          onChange={e => setEdad(e.target.value.replace(/[^0-9]/g, ""))}
          inputMode="numeric"
          pattern="[0-9]*"
          style={{padding:'0.7em', borderRadius:'5px', border:'1px solid #b3c6e0', fontSize:'1em' }}
        />
        <button type="submit" style={{
          background:'#0077cc',
          color:'#fff',
          border:'none',
          cursor:'pointer',
          fontWeight:'bold',
          padding:'0.7em',
          borderRadius:'5px',
          fontSize:'1em',
          transition:'background 0.2s'
        }}>
          Añadir
        </button>
      </form>
      {error && <p style={{color:'red', textAlign:'center'}}>{error}</p>}
    </div>
  );
}
