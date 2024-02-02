import React from 'react';

function Casilla({ x, y, esMina, numeroMinas, revelada, marcada, manejarClicCasilla, manejarClicDerecho }) {
  let clases = "casilla";
  let contenido = "";
  let tonoClase = (x + y) % 2 === 0 ? "colorClaro" : "colorOscuro"; // Clase para el tono
  if (marcada) {
    contenido = "🚩";
  } else if (revelada) {
    if (esMina) {
      contenido = "💣";
    } else {
      contenido = numeroMinas > 0 ? numeroMinas : "";
    }
    clases += " casillaRevelada";
    tonoClase += "Revelada"; // Modificar el tono para las reveladas
  }

  clases += ` ${tonoClase}`; // Agregar la clase de tono

  return (
    <div
      className={clases}
      onClick={() => manejarClicCasilla(x, y)}
      onContextMenu={(e) => manejarClicDerecho(e, x, y)}
    >
      {contenido}
    </div>
  );
}

export default Casilla;
