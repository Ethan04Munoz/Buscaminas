import React, { useState } from 'react';
import Flor from './Flor';
import Explosion from './Explosion';

function Casilla({ tamaño, x, y, esMina, numeroMinas, revelada, marcada, manejarClicCasilla, manejarClicDerecho, estadoJuego }) {
  let clases = tamaño;
  let contenido = "";
  let tonoClase = (x + y) % 2 === 0 ? "colorClaro" : "colorOscuro";

  const [toqueInicio, setToqueInicio] = useState(0);
  const [toqueProlongado, setToqueProlongado] = useState(false); // Nuevo estado para identificar un toque prolongado

  const duracionToqueProlongado = 500;

  if (estadoJuego === "ganado" && !revelada) {
    contenido = <Flor/>;
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
    tonoClase += "Revelada";
  }

  clases += ` ${tonoClase}`;

  const manejarInicioToque = (e) => {
    e.preventDefault();
    setToqueInicio(Date.now());
    setToqueProlongado(false); // Reiniciar el estado de toque prolongado
  };

  const manejarFinToque = (e) => {
    e.preventDefault();
    const duracion = Date.now() - toqueInicio;
    if (duracion >= duracionToqueProlongado) {
      setToqueProlongado(true); // Marcar el toque como prolongado
      manejarClicDerecho(e, x, y);
    } else {
      // Verificar si el toque no fue prolongado antes de manejar como clic normal
      if (!toqueProlongado) {
        manejarClicCasilla(x, y);
      }
    }
  };

  return (
    <div
      className={clases}
      onClick={() => !toqueProlongado && manejarClicCasilla(x, y)} // Solo manejar clic si no fue un toque prolongado
      onContextMenu={(e) => manejarClicDerecho(e, x, y)}
      onTouchStart={manejarInicioToque}
      onTouchEnd={manejarFinToque}
    >
      {contenido}
    </div>
  );
}

export default Casilla;
