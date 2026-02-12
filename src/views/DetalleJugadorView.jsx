import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Vista para mostrar el detalle de un jugador seleccionado, con botón para volver a la lista
export default function DetalleJugadorView({ jugadores }) {
  const navigate = useNavigate();
  const { nombre } = useParams();
  // Buscar en localStorage
  const jugadoresLocal = JSON.parse(localStorage.getItem('jugadores')) || [];
  const jugador = jugadoresLocal.find(j => j.nombre === nombre);

  if (!jugador) {
    return (
      <section style={{textAlign:'center', marginTop:'2em'}}>
        <h2>Jugador no encontrado</h2>
        <button onClick={() => navigate(-1)} style={{background:'#3498db', color:'#fff', border:'none', borderRadius:'4px', padding:'0.5em 1.2em', fontWeight:'bold', fontSize:'1em', cursor:'pointer', marginTop:'1em'}}>Volver</button>
      </section>
    );
  }

  return (
    <section className="detalle-jugador" style={{
      background: '#f0f8ff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px #0002',
      padding: '2em',
      margin: '2em auto',
      maxWidth: '400px',
      textAlign: 'center',
      position: 'relative'
    }}>
      <h3 style={{color:'#0077cc', marginBottom:'1em'}}>Detalle del jugador</h3>
      <p><strong>Nombre:</strong> {jugador.nombre}</p>
      <p><strong>Edad:</strong> {jugador.edad}</p>
      <p><strong>Puntuación total:</strong> {jugador.puntuaciones?.reduce((a,b)=>a+b,0) ?? 0}</p>
      <div style={{marginTop:'2em', display:'flex', justifyContent:'center', gap:'1em'}}>
        <button
          style={{background:'#3498db', color:'#fff', border:'none', borderRadius:'4px', padding:'0.5em 1.2em', fontWeight:'bold', fontSize:'1em', cursor:'pointer'}}
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
    </section>
  );
}
