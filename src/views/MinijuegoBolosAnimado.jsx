import React, { useState, useRef, useEffect } from "react";

// Vista para el minijuego de bolos animado. Se guarda la puntuación en localStorage y se muestra una tabla de mejores puntuaciones.

const NUM_BOLAS = 10;
const BOLA_ASSET = (
  <svg width="90" height="90" viewBox="0 0 90 90">
    <circle cx="45" cy="45" r="42" fill="#222" stroke="#0077cc" strokeWidth="6" />
    <circle cx="33" cy="33" r="6" fill="#fff" />
    <circle cx="57" cy="27" r="5" fill="#fff" />
    <circle cx="48" cy="57" r="5" fill="#fff" />
  </svg>
);
const BOLO_ASSET = (
  <svg width="90" height="90" viewBox="0 0 90 90">
    <ellipse cx="45" cy="65" rx="18" ry="10" fill="#bbb" />
    <rect x="33" y="25" width="24" height="40" rx="12" fill="#fff" stroke="#d22" strokeWidth="4" />
    <ellipse cx="45" cy="25" rx="12" ry="12" fill="#fff" stroke="#d22" strokeWidth="4" />
    <rect x="39" y="45" width="12" height="10" rx="6" fill="#d22" />
  </svg>
);

function getInitialPinos() {
  // Coloca los bolos en una fila
  return Array(NUM_BOLAS).fill(true);
}

const getBestScores = () => {
  const data = localStorage.getItem('mejoresPuntuacionesMinijuego');
  return data ? JSON.parse(data) : [];
};

const saveBestScore = (score) => {
  const scores = getBestScores();
  scores.push(score);
  scores.sort((a, b) => b.bolos - a.bolos || a.tiros - b.tiros); // Más bolos y menos tiros primero
  const top = scores.slice(0, 10);
  localStorage.setItem('mejoresPuntuacionesMinijuego', JSON.stringify(top));
};

export default function MinijuegoBolosAnimado() {
    const [pantallaPequena, setPantallaPequena] = useState(false);

    useEffect(() => {
      function checkSize() {
        setPantallaPequena(window.innerWidth < 1000);
      }
      checkSize();
      window.addEventListener('resize', checkSize);
      return () => window.removeEventListener('resize', checkSize);
    }, []);
  const [pinos, setPinos] = useState(getInitialPinos());
  const [bolaPos, setBolaPos] = useState(0); // posición de la bola
  const [lanzando, setLanzando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tiros, setTiros] = useState(0); // Contador de tiros
  const [finalizado, setFinalizado] = useState(false); // Estado de partida
  const intervalRef = useRef(null);
  const BOLA_SIZE = 1; // Mantener tamaño lógico, pero visualmente más grande
  const [nombreRecord, setNombreRecord] = useState("");
  const [mostrarRecord, setMostrarRecord] = useState(false);
  const [pleno, setPleno] = useState(false);

  // Mover la bola de izquierda a derecha rebotando en las paredes
  useEffect(() => {
    if (!lanzando) {
      let direction = 1;
      intervalRef.current = setInterval(() => {
        setBolaPos(pos => {
          if (pos + direction > NUM_BOLAS - BOLA_SIZE || pos + direction < 0) direction *= -1;
          return pos + direction;
        });
      }, 350); // Más lento
      return () => clearInterval(intervalRef.current);
    }
    return () => {};
  }, [lanzando]);

  // Lanzar la bola hacia adelante
  const handleLanzar = () => {
    if (lanzando || finalizado || tiros >= 2) return;
    setLanzando(true);
    clearInterval(intervalRef.current);
    let bolosTirar;
    // Si la bola está en la posición 4 o 5 (bolo 5 o 6), aumentar probabilidad de tirar más bolos, pero no marcar pleno automáticamente
    if (bolaPos === 4 || bolaPos === 5) {
      bolosTirar = Math.random() < 0.15 ? 10 : Math.floor(Math.random() * 10) + 1;
    } else {
      bolosTirar = Math.floor(Math.random() * 10) + 1;
    }
    setTimeout(() => {
      let nuevosPinos;
      // Calcula el rango de bolos a tirar hacia ambos lados
      const inicio = Math.max(0, bolaPos - Math.floor(bolosTirar / 2));
      const fin = Math.min(NUM_BOLAS - 1, bolaPos + Math.ceil(bolosTirar / 2) - 1);
      nuevosPinos = pinos.map((pino, idx) => {
        if (idx >= inicio && idx <= fin) return false;
        return pino;
      });
      setPinos(nuevosPinos);
      const bolosDerribados = pinos.filter(Boolean).length - nuevosPinos.filter(Boolean).length;
      let esPleno = false;
      let esSemipleno = false;
      // Solo es pleno si todos los bolos han sido derribados en el primer tiro
      if (nuevosPinos.every(p => !p) && tiros === 0) {
        esPleno = true;
        setPleno(true);
        setMensaje("¡PLENO! Has tirado todos los bolos de una vez. Puedes guardar tu nombre con una X.");
      } else if (nuevosPinos.every(p => !p) && tiros === 1) {
        esSemipleno = true;
        setMensaje("¡SEMIPLENO! Has tirado todos los bolos en dos tiros. ¡Enhorabuena!");
      } else {
        setMensaje(`Has tirado ${bolosDerribados} bolo(s) desde la posición ${bolaPos + 1} (del ${Math.max(1, inicio + 1)} al ${fin + 1})`);
      }
      setTiros(tiros + 1);
      setLanzando(false);
      // Si es pleno o semipleno, finalizar aunque sea el primer o segundo tiro
      if (esPleno || esSemipleno || tiros + 1 === 2) setFinalizado(true);
    }, 600);
  };

  const handleReset = () => {
    setPinos(getInitialPinos());
    setBolaPos(0);
    setMensaje("");
    setLanzando(false);
    setTiros(0);
    setFinalizado(false);
  };

  // Mensaje especial según resultado
  useEffect(() => {
    if (finalizado) {
      setMostrarRecord(true);
    }
  }, [finalizado]);

  const handleGuardarRecord = () => {
    const bolosDerribados = NUM_BOLAS - pinos.filter(Boolean).length;
    if (nombreRecord.trim()) {
      saveBestScore({ nombre: nombreRecord, bolos: bolosDerribados, tiros, pleno });
      setNombreRecord("");
      setMostrarRecord(false);
      setMejores(getBestScores());
      setPleno(false);
    }
  };

  const [mejores, setMejores] = useState(getBestScores());
  useEffect(() => {
    setMejores(getBestScores());
  }, [finalizado]);

  return (
    <section style={{textAlign:'center', marginTop:'2em'}}>
      <h2>Minijuego: Bolos animado</h2>
      {pantallaPequena && (
        <div style={{background:'#ffecb3', color:'#a66c00', padding:'1em', borderRadius:'8px', margin:'1em auto', maxWidth:'500px', fontWeight:'bold', fontSize:'1.1em', boxShadow:'0 1px 4px #0001'}}>
          Para jugar correctamente, amplía la ventana del navegador o cambia a modo pantalla completa. El minijuego necesita al menos 1000px de ancho para verse bien.
        </div>
      )}
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90px', marginBottom:'1em'}}>
        {pinos.map((pino, idx) => (
          <span key={idx} style={{width:'90px', height:'90px', display:'inline-block', margin:'0 0.2em', opacity: pino ? 1 : 0}}>
            {pino ? BOLO_ASSET : null}
          </span>
        ))}
      </div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'90px', marginBottom:'1em'}}>
        {Array(NUM_BOLAS).fill(0).map((_, idx) => (
          <span key={idx} style={{width:'90px', height:'90px', display:'inline-block', margin:'0 0.2em'}}>
            {idx === bolaPos ? BOLA_ASSET : null}
          </span>
        ))}
      </div>
      <button onClick={handleLanzar} disabled={lanzando || pinos.every(p => !p) || finalizado || tiros >= 2} style={{fontSize:'1.2em', marginRight:'1em'}}>Lanzar bola</button>
      <button onClick={handleReset} style={{fontSize:'1.2em'}}>Reiniciar</button>
      <p style={{marginTop:'1.5em', fontWeight:'bold'}}>{mensaje}</p>
      {finalizado && (
        <div style={{marginTop:'2em', fontWeight:'bold', fontSize:'1.2em', color:'#0077cc'}}>
          {pleno
            ? "¡PLENO! Has tirado todos los bolos de una vez."
            : `Resultado final: Has tirado ${NUM_BOLAS - pinos.filter(Boolean).length} bolos en ${tiros} tiro(s).`}
        </div>
      )}
      {mostrarRecord && (
        <div style={{marginTop:'2em', background:'#eaf2fb', padding:'1em', borderRadius:'8px', boxShadow:'0 1px 4px #0001'}}>
          <h3>Introduce tu nombre para la tabla de puntuaciones:</h3>
          <input
            type="text"
            value={nombreRecord}
            onChange={e => setNombreRecord(e.target.value)}
            placeholder="Tu nombre"
            style={{padding:'0.7em', borderRadius:'5px', border:'1px solid #b3c6e0', fontSize:'1em', marginRight:'1em' }}
          />
          <button onClick={handleGuardarRecord} style={{background:'#0077cc', color:'#fff', border:'none', borderRadius:'5px', padding:'0.7em 1.5em', fontWeight:'bold', fontSize:'1em', cursor:'pointer'}}>Guardar</button>
        </div>
      )}
      <div style={{marginTop:'2em'}}>
        <h3>Mejores puntuaciones</h3>
        <table style={{margin:'0 auto', background:'#f8fbff', borderRadius:'8px', boxShadow:'0 1px 4px #0001'}}>
          <thead>
            <tr>
              <th>Posición</th>
              <th>Nombre</th>
              <th>Bolos</th>
              <th>Tiros</th>
            </tr>
          </thead>
          <tbody>
            {mejores.length === 0 ? (
              <tr><td colSpan="4">Sin puntuaciones aún</td></tr>
            ) : (
              mejores.map((score, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{score.nombre}{score.pleno ? " ✖" : ""}</td>
                  <td>{score.bolos}</td>
                  <td>{score.tiros}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
