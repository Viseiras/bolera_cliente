// Vista para mostrar la tabla de horarios y reservas, con botones para reservar y quitar todas las reservas
const HORAS = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];
const PISTAS = [
  { id: 1, nombre: "Pista 1" },
  { id: 2, nombre: "Pista 2" },
  { id: 3, nombre: "Pista 3" }
];

export default function TablaHorarios({ reservas, onReservar, onQuitarTodas }) {
  return (
    <div>
      <h2 style={{textAlign:'center', textTransform:'uppercase', color:'#0077cc', marginBottom:'1em'}}>Horarios y Reservas de Pistas</h2>
      <table border="1" style={{borderCollapse:'collapse', width:'100%', background:'#f8fbff', borderRadius:'10px', boxShadow:'0 2px 8px #0001', marginBottom:'2em'}}>
        <thead>
          <tr style={{background:'#0077cc', color:'#fff'}}>
            <th>Hora</th>
            {PISTAS.map(pista => (
              <th key={pista.id}>{pista.nombre}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {HORAS.map(hora => (
            <tr key={hora} style={{background:'#fff'}}>
              <td style={{fontWeight:'bold', color:'#0077cc'}}>{hora}</td>
              {PISTAS.map(pista => {
                const reserva = reservas.find(r => r.hora === hora && r.pistaId === pista.id);
                return (
                  <td key={pista.id} style={{textAlign:'center', padding:'0.7em', borderRadius:'6px', background: reserva ? '#cce0ff' : '#eaf2fb'}}>
                    {reserva ? (
                      <span style={{color:'#0077cc', fontWeight:'bold'}}>Reservado por {reserva.jugador}</span>
                    ) : (
                      <button style={{background:'#0077cc', color:'#fff', border:'none', borderRadius:'5px', padding:'0.5em 1em', fontWeight:'bold', cursor:'pointer', fontSize:'1em', boxShadow:'0 1px 4px #0001'}} onClick={() => onReservar(pista.id, hora)}>
                        Reservar
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:'2em', textAlign:'center'}}>
        <button onClick={onQuitarTodas} style={{background:'#e74c3c', color:'#fff', fontWeight:'bold', fontSize:'1.1em', padding:'0.7em 2em', borderRadius:'8px', border:'none', cursor:'pointer', boxShadow:'0 2px 8px #e74c3c33'}}>Quitar todas las reservas</button>
      </div>
    </div>
  );
}
