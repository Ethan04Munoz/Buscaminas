import React from 'react';
import Casilla from './Casilla';

function Tablero({ tamañoCasillas, claseTablero, tableroSize, ubicacionesMinas, casillasReveladas, casillasMarcadas, manejarClicCasilla, manejarClicDerecho, contadorMinas, estadoJuego }) {
  return (
    <div className={claseTablero}>
      {contadorMinas.map((fila, x) =>
        fila.map((minaCount, y) => {
          const esMina = ubicacionesMinas.some(mina => mina.x === x && mina.y === y);
          return (
            <Casilla
              tamaño={tamañoCasillas}
              key={`${x}-${y}`}
              x={x}
              y={y}
              esMina={esMina}
              numeroMinas={minaCount}
              revelada={casillasReveladas.has(`${x}-${y}`)}
              marcada={casillasMarcadas.has(`${x}-${y}`)}
              manejarClicCasilla={manejarClicCasilla}
              manejarClicDerecho={manejarClicDerecho}
              estadoJuego= {estadoJuego}
            />
          );
        })
      )}
    </div>
  );
}

export default Tablero;
