import React, { useState, useEffect } from 'react';
import Flor from './Flor';
import Explosion from './Explosion';

function Casilla({ tamaño, x, y, esMina, numeroMinas, revelada, marcada, manejarClicCasilla, manejarClicDerecho, estadoJuego }) {
  let clases = tamaño;
  let contenido = "";
  let tonoClase = (x + y) % 2 === 0 ? "colorClaro" : "colorOscuro"; // Clase para el tono

  // Nuevo estado para manejar el inicio del toque
  const [toqueInicio, setToqueInicio] = useState(0);

  // Constante para la duración mínima del toque (en milisegundos) para considerarlo como toque prolongado
  const duracionToqueProlongado = 500; // 0.5 segundos

  if (estadoJuego === "ganado" && !revelada) {
    contenido = <Flor/>; // Mostrar el componente Flor
  } else if (marcada) {
    contenido = "🚩";
  } else if (revelada) {
    if (esMina) {
      contenido = "💣";
      if (estadoJuego === "perdido" && esMina) {
        contenido = <>{contenido}<Explosion/></>;
      }
    } else {
      contenido = numeroMinas > 0 ? numeroMinas : "";
    }
    clases += " casillaRevelada";
    tonoClase += "Revelada"; // Modificar el tono para las reveladas
  }

  clases += ` ${tonoClase}`; // Agregar la clase de tono

  // Manejadores para el toque prolongado
  const manejarInicioToque = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del toque
    setToqueInicio(Date.now()); // Registrar el inicio del toque
  };

  const manejarFinToque = (e, x, y) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto al finalizar el toque
    const duracion = Date.now() - toqueInicio; // Calcular la duración del toque
    if (duracion >= duracionToqueProlongado) {
      // Si la duración supera el umbral, se considera toque prolongado
      manejarClicDerecho(e, x, y);
    } else {
      // Si no, se maneja como un toque normal
      manejarClicCasilla(x, y);
    }
  };

  return (
    <div
      className={clases}
      onClick={() => manejarClicCasilla(x, y)}
      onContextMenu={(e) => manejarClicDerecho(e, x, y)}
      onTouchStart={manejarInicioToque}
      onTouchEnd={(e) => manejarFinToque(e, x, y)}
    >
      {contenido}
    </div>
  );
}

export default Casilla;
