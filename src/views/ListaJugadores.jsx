import { useNavigate } from "react-router-dom";
import { useJugadores } from "../context/JugadoresContext";
// Vista para mostrar la lista de jugadores, con botones para ver detalle y eliminar cada jugador
export default function ListaJugadores() {
  const navigate = useNavigate();
  const { jugadores, removeJugador } = useJugadores();

  return (
    <section>
      <h2>Jugadores</h2>
      <ul style={{listStyle:'none', padding:0}}>
        {jugadores.map((jugador, idx) => (
          <li key={idx} style={{marginBottom:'0.5em', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f0f8ff', borderRadius:'6px', padding:'0.5em 1em'}}>
            <span>
              {jugador.nombre} (Edad: {jugador.edad})
            </span>
            <div>
              <button style={{background:'#3498db', color:'#fff', border:'none', borderRadius:'4px', padding:'0.3em 0.7em', cursor:'pointer', marginRight:'0.5em'}} onClick={() => navigate(`/jugadores/${encodeURIComponent(jugador.nombre)}`)}>
                Ver Detalle
              </button>
              <button
                style={{background:'#e74c3c', color:'#fff', border:'none', borderRadius:'4px', padding:'0.3em 0.7em', cursor:'pointer'}}
                onClick={() => {
                  removeJugador(idx);
                  alert(`Jugador eliminado: ${jugador.nombre}`);
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}