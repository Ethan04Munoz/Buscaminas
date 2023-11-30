import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  function obtenerNumeroAleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [ubicacionesMinas, setUbicacionesMinas] = useState([]);

  function generarMinasAleatorias(eX, eY) {
    let nuevasUbicacionesMinas = [];
    while (nuevasUbicacionesMinas.length < 10) {
        let x = obtenerNumeroAleatorioEntre(0, 9);
        let y = obtenerNumeroAleatorioEntre(0, 9);
        if ((x !== eX || y !== eY) && !nuevasUbicacionesMinas.some(mina => mina.x === x && mina.y === y)) {
            nuevasUbicacionesMinas.push({ x, y });
        }
    }
    setUbicacionesMinas(nuevasUbicacionesMinas);
  }

  function contarMinasAlrededor(tableroSize, ubicacionesMinas) {
    let contadorMinas = Array.from({ length: tableroSize }, () => 
      Array(tableroSize).fill(0));
  
    for (let x = 0; x < tableroSize; x++) {
      for (let y = 0; y < tableroSize; y++) {
        // Comprobar cada una de las 8 direcciones alrededor de la casilla
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) {
              // Salta la casilla actual
              continue;
            }
  
            let newX = x + dx;
            let newY = y + dy;
  
            // Verifica si la casilla está dentro del tablero
            if (newX >= 0 && newX < tableroSize && newY >= 0 && newY < tableroSize) {
              // Comprobar si hay una mina en la casilla adyacente
              if (ubicacionesMinas.some(mina => mina.x === newX && mina.y === newY)) {
                contadorMinas[x][y]++;
              }
            }
          }
        }
      }
    }
  
    return contadorMinas;
  }
  
  const [primerClic, setPrimerClic] = useState(true);
  const [casillasReveladas, setCasillasReveladas] = useState(new Set());
  const [casillasMarcadas, setCasillasMarcadas] = useState(new Set());
  const manejarClicCasilla = (x, y) => {
    if (primerClic) {
      generarMinasAleatorias(x, y);
      setPrimerClic(false);
    }
    setCasillasReveladas(new Set(casillasReveladas).add(`${x}-${y}`));
  };

  const manejarClicDerecho = (e, x, y) => {
    e.preventDefault();
    setCasillasMarcadas(new Set(casillasMarcadas).add(`${x}-${y}`));
  }

  function Casilla({ x, y, esMina, numeroMinas }) {
    const revelada = casillasReveladas.has(`${x}-${y}`);
    const marcada = casillasMarcadas.has(`${x}-${y}`);
    let clases = "casilla"
    let contenido = "";
    if (marcada) {
      contenido = "🚩"; // Bandera roja
    } else if (revelada) {
        if (esMina) {
            contenido = "💣"; // Bomba
        } else {
            contenido = numeroMinas > 0 ? numeroMinas : "";
        }
        clases = clases + " casillaRevelada";
    }
    return (
      <div className={clases}
           onClick={() => manejarClicCasilla(x, y)}
           onContextMenu={(e) => {manejarClicDerecho(e, x, y)}}> {/* Agregar manejo del clic derecho */}
        {contenido}
      </div>
    );
  }

  const tableroSize = 10;
  const contadorMinas = contarMinasAlrededor(tableroSize, ubicacionesMinas);

  return (
    <div className="tablero">
      {contadorMinas.map((fila, x) =>
        fila.map((minaCount, y) => {
          const esMina = ubicacionesMinas.some(mina => mina.x === x && mina.y === y);
          return <Casilla key={`${x}-${y}`} x={x} y={y} esMina={esMina} numeroMinas={minaCount} />;
        })
      )}
    </div>
  );
}

export default App
