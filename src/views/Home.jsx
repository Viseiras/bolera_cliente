// Vista de inicio con bienvenida, imagen y descripción de la aplicación
export default function Home() {
  return (
    <section style={{textAlign:'center', marginTop:'2em'}}>
      <h2>Bienvenido a la Bolera React</h2>
      <img src="/bolos.svg" alt="Bolera" style={{width:'180px', margin:'1em auto'}} />
      <div style={{maxWidth:'600px', margin:'0 auto', fontSize:'1.15em', color:'#222', background:'#f8fbff', borderRadius:'8px', padding:'1.2em', boxShadow:'0 1px 4px #0001'}}>
        <p>
          Esta aplicación te permite gestionar una bolera de forma sencilla y visual:
        </p>
        <ul style={{textAlign:'left', margin:'1em auto', maxWidth:'500px'}}>
          <li>Registrar y administrar jugadores con sus datos y puntuaciones.</li>
          <li>Reservar pistas y consultar horarios disponibles.</li>
          <li>Visualizar y eliminar reservas fácilmente.</li>
          <li>Jugar a un minijuego de bolos animado, con tabla de mejores puntuaciones.</li>
          <li>Todo el historial se guarda en tu navegador para que no pierdas nada.</li>
        </ul>
        <p>
          Navega por el menú superior para acceder a cada sección. ¡Disfruta gestionando y jugando en la bolera!
        </p>
      </div>
    </section>
  );
}
