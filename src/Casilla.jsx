import React, { useState } from 'react';
import Flor from './Flor';
import Explosion from './Explosion';

function Casilla({ tamaño, x, y, esMina, numeroMinas, revelada, marcada, manejarClicCasilla, manejarClicDerecho, estadoJuego }) {
  let clases = tamaño;
  let contenido = "";
  let tonoClase = (x + y) % 2 === 0 ? "colorClaro" : "colorOscuro";

  const [toqueInicio, setToqueInicio] = useState(0);

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
    setToqueInicio(Date.now());
  };

  const manejarFinToque = (e) => {
    const duracion = Date.now() - toqueInicio;
    if (duracion >= 500) {
      e.preventDefault(); 
      manejarClicDerecho(e, x, y);
    }
  };

  const manejarClic = (e) => {
    const duracion = Date.now() - toqueInicio;
    if (duracion < 500) { 
      manejarClicCasilla(x, y);
    }
  };

  return (
    <div
      className={clases}
      onClick={manejarClic}
      onContextMenu={(e) => {
        e.preventDefault(); // Prevenir el menú contextual del navegador
        manejarClicDerecho(e, x, y);
      }}
      onTouchStart={manejarInicioToque}
      onTouchEnd={manejarFinToque}
    >
      {contenido}
    </div>
  );
}

export default Casilla;
