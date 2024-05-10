import React, { useState, useEffect } from 'react';
import Flor from './Flor';
import Explosion from './Explosion';

function Casilla({ tamaño, x, y, esMina, numeroMinas, revelada, marcada, manejarClicCasilla, manejarClicDerecho, estadoJuego }) {
  let clases = tamaño;
  let contenido = "";
  let tonoClase = (x + y) % 2 === 0 ? "colorClaro" : "colorOscuro"; // Clase para el tono
  const [presionado, setPresionado] = useState(false);
  const [presionadoTiempo, setPresionadoTiempo] = useState(0);
  const [esMovil, setEsMovil] = useState(false);

  useEffect(() => {
    if(window.innerWidth < window.innerHeight){
        setEsMovil(true);
    }else{
      setEsMovil(false);
    }
  }, []);

  // Determina si es un toque prolongado
  const esToqueProlongado = () => Date.now() - presionadoTiempo > 500; // 500 ms para toque prolongado

  const manejarToqueInicio = () => {
    setPresionadoTiempo(Date.now());
    setPresionado(true);
  };

  const manejarToqueFin = (e) => {
    if (esToqueProlongado()) {
      e.preventDefault(); // Prevenir el evento de clic solo si es un toque prolongado
      manejarClicDerecho(e, x, y);
    } else if (esMovil) {
      manejarClicCasilla(x, y); // Manejar toque instantáneo como un clic izquierdo
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
  }, [presionado, esMovil]);

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
      onTouchEnd={manejarToqueFin} // Usar onTouchEnd para manejar clics y toques prolongados en móviles
      onContextMenu={(e) => {
        e.preventDefault(); // Prevenir el menú contextual predeterminado
        esMovil || manejarClicDerecho(e, x, y); // Manejar clic derecho solo si no es móvil
      }}
    >
      {contenido}
    </div>
  );
}

export default Casilla;
