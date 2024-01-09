import React from 'react';

function Casilla({ x, y, esMina, numeroMinas, revelada, marcada, manejarClicCasilla, manejarClicDerecho }) {
  let clases = "casilla";
  let contenido = "";

  if (marcada) {
    contenido = "🚩";
  } else if (revelada) {
    if (esMina) {
      contenido = "💣";
    } else {
      contenido = numeroMinas > 0 ? numeroMinas : "";
    }
    clases += " casillaRevelada";
  }

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
