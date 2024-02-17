import React, { useState } from 'react';
import Flor from './Flor';
import Explosion from './Explosion';

function Casilla({ tamaño, x, y, esMina, numeroMinas, revelada, marcada, manejarClicCasilla, manejarClicDerecho, estadoJuego }) {
  let clases = tamaño;
  let contenido = "";
  let tonoClase = (x + y) % 2 === 0 ? "colorClaro" : "colorOscuro";

  const [toqueInicio, setToqueInicio] = useState(0);
  const [toqueProlongado, setToqueProlongado] = useState(false);

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
  };

  const manejarFinToque = (e) => {
    e.preventDefault();
    const duracion = Date.now() - toqueInicio;
    if (duracion >= duracionToqueProlongado) {
      setToqueProlongado(true);
      manejarClicDerecho(e, x, y);
      setTimeout(() => setToqueProlongado(false), 10); // Restablecer toqueProlongado a false después de manejar el toque prolongado
    }
  };

  const manejarClic = (e) => {
    if (!toqueProlongado) {
      manejarClicCasilla(x, y);
    }
    // Asegurarse de restablecer toqueProlongado aquí también podría ser útil si encuentras problemas
    // Pero normalmente, debería ser manejado por manejarFinToque
  };

  return (
    <div
      className={clases}
      onClick={manejarClic}
      onContextMenu={(e) => {
        e.preventDefault();
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
