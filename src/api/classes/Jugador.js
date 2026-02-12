// Clase Jugador para la aplicación de bolera

export class Jugador {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this.puntuaciones = [];
  }

  agregarPuntuacion(puntos) {
    this.puntuaciones.push(puntos);
  }

  getPuntuacionTotal() {
    return this.puntuaciones.reduce((a, b) => a + b, 0);
  }
}
