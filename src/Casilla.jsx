import React, { useState, useEffect } from 'react';
import Flor from './Flor';
import Explosion from './Explosion';

function Casilla({ tamaño, x, y, esMina, numeroMinas, revelada, marcada, manejarClicCasilla, manejarClicDerecho, estadoJuego }) {
  let clases = tamaño;
  let contenido = "";
  let tonoClase = (x + y) % 2 === 0 ? "colorClaro" : "colorOscuro"; // Clase para el tono
  const [presionado, setPresionado] = useState(false);
  const [presionadoTiempo, setPresionadoTiempo] = useState(0);

  // Determina si es un toque prolongado
  const esToqueProlongado = () => Date.now() - presionadoTiempo > 500; // 500 ms para toque prolongado

  const manejarToqueInicio = () => {
    setPresionadoTiempo(Date.now());
    setPresionado(true);
  };

  const manejarToqueFin = (e) => {
    e.preventDefault(); // Prevenir el evento de clic
    if (presionado && esToqueProlongado()) {
      manejarClicDerecho(e, x, y);
    }
    setPresionado(false);
  };

  useEffect(() => {
    if (presionado) {
      window.addEventListener('mouseup', manejarToqueFin);
      window.addEventListener('touchend', manejarToqueFin);
    } else {
      window.removeEventListener('mouseup', manejarToqueFin);
      window.removeEventListener('touchend', manejarToqueFin);
    }

    return () => {
      window.removeEventListener('mouseup', manejarToqueFin);
      window.removeEventListener('touchend', manejarToqueFin);
    };
  }, [presionado]);

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

  return (
    <div
      className={clases}
      onMouseDown={manejarToqueInicio}
      onTouchStart={manejarToqueInicio}
      onClick={() => manejarClicCasilla(x, y)}
      onContextMenu={(e) => e.preventDefault()} // Prevenir el menú contextual predeterminado
    >
      {contenido}
    </div>
  );
}

export default Casilla;
