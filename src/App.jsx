import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  function obtenerNumeroAleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const tableroSize = 10;

  const [ubicacionesMinas, setUbicacionesMinas] = useState([]);

  function estaEnAreaProhibida(x, y, eX, eY) {
    return x >= eX - 1 && x <= eX + 1 && y >= eY - 1 && y <= eY + 1;
  }

  function generarMinasAleatorias(eX, eY) {
    let nuevasUbicacionesMinas = [];
    while (nuevasUbicacionesMinas.length < 10) {
        let x = obtenerNumeroAleatorioEntre(0, 9);
        let y = obtenerNumeroAleatorioEntre(0, 9);
        if (!estaEnAreaProhibida(x, y, eX, eY) && !nuevasUbicacionesMinas.some(mina => mina.x === x && mina.y === y)) {
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

  const calcularMinasVecinas = (x, y) => {
    let contadorMinas = 0;
  
    // Recorrer todas las casillas vecinas
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue; // Saltar la casilla actual
        const newX = x + dx;
        const newY = y + dy;
  
        // Verificar si las nuevas coordenadas están dentro del tablero
        if (newX >= 0 && newX < tableroSize && newY >= 0 && newY < tableroSize) {
          if (ubicacionesMinas.some(mina => mina.x === newX && mina.y === newY)) {
            contadorMinas++;
          }
        }
      }
    }
  
    return contadorMinas;
  };

  const revelarCasillas = (x, y) => {
    let contador = 0;
  
    // Función para revelar una casilla individual
    const revelarCasilla = (x, y) => {
      const clave = `${x}-${y}`;
      if (casillasReveladas.has(clave) || ubicacionesMinas.some(mina => mina.x === x && mina.y === y)) {
        return; // Si la casilla ya está revelada o es una bomba, no hacer nada
      }
  
      casillasReveladas.add(clave);
      contador++;
    };
  
    // Revelar la casilla clickeada
    revelarCasilla(x, y);
  
    // Si no hay minas alrededor de la casilla clickeada, revelar las casillas adyacentes
    if (calcularMinasVecinas(x, y) === 0) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue; // Saltar la casilla actual
          const newX = x + dx;
          const newY = y + dy;
  
          if (newX >= 0 && newX < tableroSize && newY >= 0 && newY < tableroSize) {
            revelarCasilla(newX, newY);
          }
  
          if (contador >= 10) break; // Detener si se han revelado 10 casillas
        }
        if (contador >= 10) break;
      }
    }
  
    setCasillasReveladas(new Set(casillasReveladas));
  };
  
  function volado(){
    let numero = Math.round(Math.random(0,2));
    return numero;
  }

  function arreglosIguales(arr1, arr2) {
    // Paso 1: Verificar si los arreglos tienen la misma longitud
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Paso 2: Ordenar ambos arreglos
    arr1.sort();
    arr2.sort();

    // Paso 3: Comparar los elementos de los arreglos
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

  const manejarClicCasilla = (x, y) => {
    if (primerClic) {
      generarMinasAleatorias(x, y);
      setPrimerClic(false);
      revelarCasillas(x, y);
    }
    if(bombaRevelada == false){
      if(volado()==1){
        revelarCasillas(x, y);
      }else{
        setCasillasReveladas(new Set(casillasReveladas).add(`${x}-${y}`));
      }
    }
    if(Array.from(casillasMarcadas).length == 10){

    }
  };

  const [bombaRevelada, setBombaRevelada] = useState(false);

  useEffect(() => {
    casillasReveladas.forEach(casilla => {
      const [x, y] = casilla.split('-').map(Number);
      if (ubicacionesMinas.some(mina => mina.x === x && mina.y === y)) {
        setTimeout(() => {
          alert("Perdiste!");
          setBombaRevelada(true);
        }, 0);
      }
    });
  }, [casillasReveladas, ubicacionesMinas]);
  

  const manejarClicDerecho = (e, x, y) => {
    e.preventDefault();
    if(bombaRevelada == false){
      setCasillasMarcadas(new Set(casillasMarcadas).add(`${x}-${y}`));
    }
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
