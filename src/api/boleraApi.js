// Simulación de API asíncrona para partidas y jugadores

export async function fetchJugadores() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { nombre: 'Juan', edad: 25, puntuaciones: [120, 150] },
        { nombre: 'Ana', edad: 30, puntuaciones: [100, 180] }
      ]);
    }, 800);
  });
}

export async function fetchPartidas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { fecha: '2026-02-10', jugadores: ['Juan', 'Ana'], finalizada: true },
        { fecha: '2026-02-11', jugadores: ['Juan'], finalizada: false }
      ]);
    }, 800);
  });
}

export async function crearJugador(jugador) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!jugador.nombre) reject(new Error('Nombre requerido'));
      resolve({ ...jugador, id: Date.now() });
    }, 500);
  });
}
