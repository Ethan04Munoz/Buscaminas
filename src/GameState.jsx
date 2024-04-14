import { useState } from 'react'
import { useEffect } from 'react'
import Tablero from './Tablero'
import './App.css'
import Modal from './Modal'
import Navbar from './Navbar'
import Submenu from './Submenu'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import translations from './translations.js'; 
import GameMusic from './componentes/GameMusic.jsx'

function GameState(props){
    const navigate = useNavigate();

    const language = useSelector(state => state.language.language); // Accede al idioma actual desde el store de Redux

    const [tableroSize, setTableroSize] = useState(8);
    const [cantidadMinas, setCantidadMinas] = useState(10);
    const [claseTablero, setClaseTablero] = useState('tablero');
    const [tamañoCasillas, setTamañoCasillas] = useState('casilla');

    const [esMovil, setEsMovil] = useState(false);
    useEffect(() => {
        console.log("Width heigth: ", window.innerHeight, window.innerWidth)
        if(window.innerWidth < window.innerHeight){
            setEsMovil(true);
        }else{
          setEsMovil(false);
        }
    }, [])
    useEffect(() => {
        const difficulty = props.difficulty;
        console.log("Dificultad y es movil:", difficulty, esMovil)
        if(difficulty == "facil" || difficulty == "principal"){
            setTableroSize(8);
            setCantidadMinas(10);
            setClaseTablero("tablero tableroFacil");
            setTamañoCasillas('casilla casillaGrande');
        }
        if(difficulty == "medio"){
            setTableroSize(16);
            setCantidadMinas(40);
            setClaseTablero("tablero tableroMedio");
            setTamañoCasillas('casilla casillaMediana');
        }
        if(difficulty == "dificil" && esMovil == false){
            setTableroSize(25);
            setCantidadMinas(90);
            setClaseTablero("tablero tableroDificil");
            setTamañoCasillas('casilla casillaChica');
        }
        reiniciarJuego();
    }, [props.difficulty])

    useEffect(() => {
      const difficulty = props.difficulty;
      if(difficulty == "dificil" && esMovil){
        navigate("/medium");
      }
    }, [esMovil, props])

    function obtenerNumeroAleatorioEntre(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    
      const [estadoJuego, setEstadoJuego] = useState("no iniciado");
      const [duracionPartidaActual, setDuracionPartidaActual] = useState(0);
      const [ubicacionesMinas, setUbicacionesMinas] = useState([]);
      const [minasGeneradas, setMinasGeneradas] = useState(false);
      const [estadoXY, setEstadoXY] = useState(null);
    
      function estaEnAreaProhibida(x, y, eX, eY) {
        return x >= eX - 1 && x <= eX + 1 && y >= eY - 1 && y <= eY + 1;
      }
    
      function generarMinasAleatorias(eX, eY) {
        let nuevasUbicacionesMinas = [];
        while (nuevasUbicacionesMinas.length < cantidadMinas) {
            let x = obtenerNumeroAleatorioEntre(0, tableroSize-1);
            let y = obtenerNumeroAleatorioEntre(0, tableroSize-1);
            if (!estaEnAreaProhibida(x, y, eX, eY) && !nuevasUbicacionesMinas.some(mina => mina.x === x && mina.y === y)) {
              nuevasUbicacionesMinas.push({ x, y });
          }
        }
        console.log("Cantidad de minas: ", nuevasUbicacionesMinas.length)
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
      const [encenderModalReiniciarJuego, setEncenderModalReiniciarJuego] = useState(false);
    
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
    
      const manejarClicCasilla = async (x, y) => {
        if (primerClic) {
          setEstadoXY({x:x, y:y});
          generarMinasAleatorias(x,y);
          setPrimerClic(false);
          setEstadoJuego("jugando");
          const audio = new Audio('efectosSonido/desentierro.mp3');
          audio.play().catch(error => console.error('Error al reproducir el audio:', error));
        }else {
          if(ubicacionesMinas.some(mina => mina.x === x && mina.y === y)){
            setCasillasReveladas(new Set(casillasReveladas).add(`${x}-${y}`));
          } else {
            if(bombaRevelada == false){
              revelarCasillas(x, y); 
              const audio = new Audio('efectosSonido/primer clic.mp3');
              audio.play().catch(error => console.error('Error al reproducir el audio:', error));
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
              setEstadoJuego("perdido");
              setBombaRevelada(true);
            }, 0);
          }
        });
      }, [casillasReveladas, ubicacionesMinas]);
    
      useEffect(() => {
        let casillasReveladasArray = Array.from(casillasReveladas);
        console.log("Array casillas reveladas lol: ", casillasReveladasArray)
        if(casillasReveladasArray.length == (tableroSize*tableroSize-cantidadMinas)){
          setTimeout(() => {
            setDuracionPartidaActual(cronometro);
            setEstadoJuego("ganado");
          }, 0);
        }
      }, [ubicacionesMinas, casillasReveladas])
      
    
      const manejarClicDerecho = (e, x, y) => {
        e.preventDefault();
        
        if (casillasReveladas.has(`${x}-${y}`)) {
          return;
        }
        if (!bombaRevelada) {
          const clave = `${x}-${y}`;
          const marcacionActual = new Set(casillasMarcadas);
    
          // Cargar y reproducir el audio cuando se agrega una nueva marca
          const audio = new Audio('efectosSonido/bandera.mp3');
          audio.play().catch(error => console.error('Error al reproducir el audio:', error));

          if (marcacionActual.has(clave)) {
            marcacionActual.delete(clave);
          } else {
            marcacionActual.add(clave);
          }
          setCasillasMarcadas(marcacionActual);
        }
    }
    
    
      function reiniciarJuego() {
        setUbicacionesMinas([]);
        setPrimerClic(true);
        setCasillasReveladas(new Set());
        setCasillasMarcadas(new Set());
        setBombaRevelada(false);
        setEstadoXY(null);
        setMinasGeneradas(false);
        setCronometro(0);
        setEstadoJuego("no iniciado");
        setDuracionPartidaActual(0);
        setEncenderModalReiniciarJuego(false);
        console.log("Ubicaciones minas: ", ubicacionesMinas)
      }
      const [cronometro, setCronometro] = useState(0);
    
      useEffect(() => {
        let intervalo;
    
        if (!primerClic && estadoJuego=="jugando") {
          // Configurar el intervalo solo si primerClic es falso
          intervalo = setInterval(() => {
            setCronometro(contadorActual => {
              if(contadorActual >= 999) {
                clearInterval(intervalo); 
                return contadorActual; 
              } else {
                return contadorActual + 1; 
              }
            });
          }, 1000);
        }
    
        // Limpiar el intervalo cuando el componente se desmonte o cuando primerClic cambie
        return () => {
          if (intervalo || estadoJuego=="ganado") {
            clearInterval(intervalo);
          }
        };
      }, [primerClic, estadoJuego]);
    
      const contadorMinas = contarMinasAlrededor(tableroSize, ubicacionesMinas);
    
      const [mostrarModalPerdido, setMostrarModalPerdido] = useState(false);
      const [mostrarModalGanado, setMostrarModalGanado] = useState(false);
      // Efecto para manejar el estado "perdido"
      useEffect(() => {
        if (estadoJuego == "perdido") {
          const timer = setTimeout(() => {
            manejarRecord();
            setMostrarModalPerdido(true);
          }, 2000); // Espera 2 segundos
          return () => clearTimeout(timer); // Limpieza al desmontar
        } else {
          setMostrarModalPerdido(false);
        }
      }, [estadoJuego]);
    
      // Efecto para manejar el estado "ganado"
      useEffect(() => {
        if (estadoJuego == "ganado") {
          const timer = setTimeout(() => {
            manejarRecord();
            setMostrarModalGanado(true);
          }, 4000); // Espera 2 segundos
          return () => clearTimeout(timer);
        } else {
          setMostrarModalGanado(false);
        }
      }, [estadoJuego]);
    
      function funcionEncenderModalReiniciarJuego(){
        setEncenderModalReiniciarJuego(true);
      }
    
      function funcionApagarModalReiniciarJuego(){
        setEncenderModalReiniciarJuego(false);
      }
    
      function renderizarCronometro(){
        if(duracionPartidaActual > 0){
          return duracionPartidaActual
        }else{
          return cronometro;
        }
      }
    
      function manejarRecord(){
        const recordAnteriorSinParse = localStorage.getItem(`record${tableroSize}`);
        console.log("Record sin parsear: ", recordAnteriorSinParse)
        const recordAnterior = parseInt(localStorage.getItem(`record${tableroSize}`));
        
        console.log("Record: ", recordAnterior, duracionPartidaActual);
        if((duracionPartidaActual < recordAnterior && estadoJuego=="ganado") ||( recordAnterior == 0 && estadoJuego == "ganado" || (recordAnteriorSinParse == null && estadoJuego == "ganado" ))){
          localStorage.setItem(`record${tableroSize}`, duracionPartidaActual);
        }
      }
    
      function getRecord(){
        return localStorage.getItem(`record${tableroSize}`);
      }
    
      return (
        <>
          <Navbar/>
          <Submenu/>
          <GameMusic gameState={estadoJuego}/>
          <div className='centrarHijos'>
            <div className='divirSeccionesRecord'>
              <p>🚩 {cantidadMinas-casillasMarcadas.size}</p>
              <p>⏰ {renderizarCronometro()}</p>
            </div>
            <Tablero
                tamañoCasillas={tamañoCasillas}
                claseTablero={claseTablero}
                tableroSize={tableroSize}
                ubicacionesMinas={ubicacionesMinas}
                casillasReveladas={casillasReveladas}
                casillasMarcadas={casillasMarcadas}
                manejarClicCasilla={manejarClicCasilla}
                manejarClicDerecho={manejarClicDerecho}
                contadorMinas={contadorMinas}
                estadoJuego={estadoJuego}
            />
            <div className='btnReiniciarJuegos' onClick={funcionEncenderModalReiniciarJuego}>☹️</div>
          </div>
          {mostrarModalPerdido && (
            <Modal tituloModal={translations[language].modalPerdiste} tiempoActual={"---"} tiempoRecord={getRecord()} onClick={reiniciarJuego} motivoModal="b"/>
          )}
          {mostrarModalGanado&& (
            <Modal tituloModal={translations[language].modalGanaste} tiempoActual={duracionPartidaActual} tiempoRecord={getRecord()} onClick={reiniciarJuego} motivoModal="g"/>
          )}
          {encenderModalReiniciarJuego && (
            <Modal tituloModal={translations[language].modalReiniciarJuego} onClick={reiniciarJuego} onClickX={funcionApagarModalReiniciarJuego} motivoModal="b"/>
          )}
        </>
      );
}

export default GameState;