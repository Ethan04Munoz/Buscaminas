import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Tablero from './Tablero'
import './App.css'

function App() {
  function obtenerNumeroAleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const tableroSize = 8;

  const [ubicacionesMinas, setUbicacionesMinas] = useState([]);
  const [minasGeneradas, setMinasGeneradas] = useState(false);
  const [estadoXY, setEstadoXY] = useState(null);

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
    setMinasGeneradas(true);
    setUbicacionesMinas(nuevasUbicacionesMinas);
  }

  useEffect(() => {
    if(estadoXY!= null){
      let x = estadoXY.x;
      let y = estadoXY.y;
      if(minasGeneradas==true){
        revelarCasillas(x, y);
      }
    }
  }, [minasGeneradas])

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
    console.log("Ubicaciones minas: ", ubicacionesMinas)
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
    console.log("Contador minas", contadorMinas)
    return contadorMinas;
  };

const revelarCasillas = (x, y) => {
  if (ubicacionesMinas.some(mina => mina.x === x && mina.y === y)) {
    return; // No hacer nada si es una mina
  }

  let casillasARevisar = [[x, y]];
  let casillasRevisadas = new Set();
  const claveInicial = `${x}-${y}`;
  casillasReveladas.add(claveInicial);
  casillasRevisadas.add(claveInicial);

  while (casillasARevisar.length > 0) {
    let [currentX, currentY] = casillasARevisar.pop();

    if (calcularMinasVecinas(currentX, currentY) === 0) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          let newX = currentX + dx;
          let newY = currentY + dy;
          const nuevaClave = `${newX}-${newY}`;

          if (newX >= 0 && newX < tableroSize && newY >= 0 && newY < tableroSize && !casillasRevisadas.has(nuevaClave) && !ubicacionesMinas.some(mina => mina.x === newX && mina.y === newY)) {
            casillasARevisar.push([newX, newY]);
            casillasReveladas.add(nuevaClave);
            casillasRevisadas.add(nuevaClave);
          }
        }
      }
    }
  }

  console.log("Casillas reveladas: ", casillasReveladas);
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

  const manejarClicCasilla = async (x, y) => {
    if (primerClic) {
      setEstadoXY({x:x, y:y});
      generarMinasAleatorias(x,y);
      setPrimerClic(false);
    }
    if(ubicacionesMinas.some(mina => mina.x === x && mina.y === y)){
      setCasillasReveladas(new Set(casillasReveladas).add(`${x}-${y}`));
    } else {
      if(bombaRevelada == false){
        setCasillasReveladas(new Set(casillasReveladas).add(`${x}-${y}`));
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
      <Tablero
        tableroSize={tableroSize}
        ubicacionesMinas={ubicacionesMinas}
        casillasReveladas={casillasReveladas}
        casillasMarcadas={casillasMarcadas}
        manejarClicCasilla={manejarClicCasilla}
        manejarClicDerecho={manejarClicDerecho}
        contadorMinas={contadorMinas}
      />
    </>
  );
}

export default App
