import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  function obtenerNumeroAleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const tableroSize = 8;

  const [ubicacionesMinas, setUbicacionesMinas] = useState([]);

  function estaEnAreaProhibida(x, y, eX, eY) {
    return x >= eX - 1 && x <= eX + 1 && y >= eY - 1 && y <= eY + 1;
  }

  function generarMinasAleatorias(eX, eY) {
    let nuevasUbicacionesMinas = [];
    while (nuevasUbicacionesMinas.length < 10) {
        let x = obtenerNumeroAleatorioEntre(0, tableroSize-1);
        let y = obtenerNumeroAleatorioEntre(0, tableroSize-1);
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
    //Pendiente mejorar esta función
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
    //Modificar esta función: Se debe ganar cuando se liberan todas las casillas sin minas, no cuando se marcan correctamente todas las bombas;
    // Paso 1: Verificar si los arreglos tienen la misma longitud
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Paso 2: Ordenar ambos arreglos
    arr1.sort((a, b) => {
      // Primero, comparamos las coordenadas X
      if (a.x < b.x) return -1;
      if (a.x > b.x) return 1;

      // Si las coordenadas X son iguales, comparamos las coordenadas Y
      if (a.y < b.y) return -1;
      if (a.y > b.y) return 1;

      // Si ambas coordenadas son iguales, no cambia el orden
      return 0;
    });
    arr2.sort((a, b) => {
      // Primero, comparamos las coordenadas X
      if (a.x < b.x) return -1;
      if (a.x > b.x) return 1;

      // Si las coordenadas X son iguales, comparamos las coordenadas Y
      if (a.y < b.y) return -1;
      if (a.y > b.y) return 1;

      // Si ambas coordenadas son iguales, no cambia el orden
      return 0;
    });
    console.log("Arreglos: ", arr1, arr2)
    return arr1.every((objeto, index) => 
        Object.keys(objeto).length === Object.keys(arr2[index]).length &&
        Object.keys(objeto).every(key => objeto[key] === arr2[index][key])
    );
}

  const manejarClicCasilla = (x, y) => {
    if (primerClic) {
      generarMinasAleatorias(x, y);
      setPrimerClic(false);
      revelarCasillas(x, y);
    }
    if(ubicacionesMinas.some(mina => mina.x === x && mina.y === y)){
      setCasillasReveladas(new Set(casillasReveladas).add(`${x}-${y}`));
    } else {
      if(bombaRevelada == false){
        if(volado()==1){
          revelarCasillas(x, y);
        }else{
          setCasillasReveladas(new Set(casillasReveladas).add(`${x}-${y}`));
        }
      }
    }
  }

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

  useEffect(() => {
    let casillasMarcadasArray = Array.from(casillasMarcadas);
    console.log("CasillasMarcadasArray: ", casillasMarcadasArray);
    if(casillasMarcadasArray.length == 10){
      const arrayObjetos = casillasMarcadasArray.map(cadena => {
        const partes = cadena.split('-'); // Dividimos la cadena por el guion
        return {
            x: parseInt(partes[0], tableroSize), // Convertimos la primera parte a número y asignamos a x
            y: parseInt(partes[1], tableroSize) // Convertimos la segunda parte a número y asignamos a y
        };
      });
      let arreglos = arreglosIguales(arrayObjetos, ubicacionesMinas);
      console.log("Arreglos iguales: ", arreglos)
      if(arreglos==true){
        //Ganaste
        setTimeout(() => {
          alert("GANASTE!!!!!!")
        }, 0);
      }
    }
  }, [ubicacionesMinas, casillasMarcadas])
  

  const manejarClicDerecho = (e, x, y) => {
    e.preventDefault();
    if(bombaRevelada == false){
      if(casillasMarcadas.has(`${x}-${y}`)){
        const nuevaMarcacion = new Set(casillasMarcadas);
        const clave = `${x}-${y}`;
    
        if (nuevaMarcacion.has(clave)) {
          nuevaMarcacion.delete(clave);
        } else {
          nuevaMarcacion.add(clave);
        }
        setCasillasMarcadas(nuevaMarcacion);
      }else{
        setCasillasMarcadas(new Set(casillasMarcadas).add(`${x}-${y}`));
      }
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

  function reiniciarJuego() {
    setUbicacionesMinas([]);
    setPrimerClic(true);
    setCasillasReveladas(new Set());
    setCasillasMarcadas(new Set());
    setBombaRevelada(false);
    console.log("Ubicaciones minas: ", ubicacionesMinas)
  }
  

  const contadorMinas = contarMinasAlrededor(tableroSize, ubicacionesMinas);

  return (
    <>
      <button onClick={reiniciarJuego}>Reiniciar Juego</button>
      <div className="tablero">
        {contadorMinas.map((fila, x) =>
          fila.map((minaCount, y) => {
            const esMina = ubicacionesMinas.some(mina => mina.x === x && mina.y === y);
            return <Casilla key={`${x}-${y}`} x={x} y={y} esMina={esMina} numeroMinas={minaCount} />;
          })
        )}
      </div>
    </>
  );
}

export default App
