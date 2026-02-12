// Clase Partida para la aplicación de bolera

export class Partida {
  constructor(jugadores, fecha = new Date()) {
    this.jugadores = jugadores; // array de Jugador
    this.fecha = fecha;
    this.finalizada = false;
  }

  finalizar() {
    this.finalizada = true;
  }
}
