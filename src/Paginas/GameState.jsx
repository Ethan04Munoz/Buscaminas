import { useState } from "react";
import { useEffect } from "react";
import Tablero from "../componentes/Tablero.jsx";
import "../App.css";
import Modal from "../componentes/Modal.jsx";
import Navbar from "../componentes/Navbar.jsx";
import Submenu from "../componentes/Submenu.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import translations from "../redux/translations.js";
import GameMusic from "../componentes/GameMusic.jsx";
import { useRef } from "react";
import GestorAtajos from "../componentes/GestorAtajos.jsx";
const worker = new Worker(new URL("../worker.js", import.meta.url));

function GameState(props) {
  const navigate = useNavigate();

  const language = useSelector((state) => state.language.language);
  const soundEffectValueConfig = useSelector(
    (state) => state.soundEffect.soundEffect
  );

  const [tableroSize, setTableroSize] = useState(8);
  const [cantidadMinas, setCantidadMinas] = useState(10);
  const [claseTablero, setClaseTablero] = useState("tablero");
  const [tamañoCasillas, setTamañoCasillas] = useState("casilla");
  const [esMovil, setEsMovil] = useState(false);
  const [estadoJuego, setEstadoJuego] = useState("no iniciado");
  const [duracionPartidaActual, setDuracionPartidaActual] = useState(0);
  const [ubicacionesMinas, setUbicacionesMinas] = useState([]);
  const [minasGeneradas, setMinasGeneradas] = useState(false);
  const [estadoXY, setEstadoXY] = useState(null);
  const [primerClic, setPrimerClic] = useState(true);
  const [casillasReveladas, setCasillasReveladas] = useState(new Set());
  const [casillasMarcadas, setCasillasMarcadas] = useState(new Set());
  const [encenderModalReiniciarJuego, setEncenderModalReiniciarJuego] =
    useState(false);
  const [bombaRevelada, setBombaRevelada] = useState(false);
  const [cronometro, setCronometro] = useState(0);
  const [mostrarModalPerdido, setMostrarModalPerdido] = useState(false);
  const [mostrarModalGanado, setMostrarModalGanado] = useState(false);

  const soundEffects = useRef({
    desentierro: new Howl({
      src: ["efectosSonido/desentierro.mp3"],
      preload: true,
    }),
    primerClic: new Howl({
      src: ["efectosSonido/primer clic.mp3"],
      preload: true,
    }),
    bandera: new Howl({ src: ["efectosSonido/bandera.mp3"], preload: true }),
  });

  useEffect(() => {
    console.log("Width heigth: ", window.innerHeight, window.innerWidth);
    if (window.innerWidth < window.innerHeight) {
      setEsMovil(true);
    } else {
      setEsMovil(false);
    }
  }, []);
  useEffect(() => {
    const difficulty = props.difficulty;
    console.log("Dificultad y es movil:", difficulty, esMovil);
    if (difficulty == "facil" || difficulty == "principal") {
      setTableroSize(8);
      setCantidadMinas(10);
      setClaseTablero("tablero tableroFacil");
      setTamañoCasillas("casilla casillaGrande");
    }
    if (difficulty == "medio") {
      setTableroSize(16);
      setCantidadMinas(40);
      setClaseTablero("tablero tableroMedio");
      setTamañoCasillas("casilla casillaMediana");
    }
    if (difficulty == "dificil" && esMovil == false) {
      setTableroSize(25);
      setCantidadMinas(90);
      setClaseTablero("tablero tableroDificil");
      setTamañoCasillas("casilla casillaChica");
    }
    reiniciarJuego();
  }, [props.difficulty]);

  useEffect(() => {
    const difficulty = props.difficulty;
    if (difficulty == "dificil" && esMovil) {
      navigate("/medium");
    }
  }, [props]);

  function obtenerNumeroAleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function estaEnAreaProhibida(x, y, eX, eY) {
    return x >= eX - 1 && x <= eX + 1 && y >= eY - 1 && y <= eY + 1;
  }

  async function generarMinasAleatorias(eX, eY) {
    worker.postMessage({
      type: "generateMines",
      data: {
        eX,
        eY,
        cantidadMinas,
        tableroSize,
        obtenerNumeroAleatorioEntreStr: obtenerNumeroAleatorioEntre.toString(),
        estaEnAreaProhibidaStr: estaEnAreaProhibida.toString(),
      },
    });

    worker.onmessage = function (e) {
      const { type, data } = e.data;
      if (type == "minesGenerated") {
        const minasArray = data;
        setUbicacionesMinas(minasArray);
        setMinasGeneradas(true);
      }
    };
  }

  useEffect(() => {
    if (estadoXY != null) {
      let x = estadoXY.x;
      let y = estadoXY.y;
      if (minasGeneradas == true) {
        revelarCasillas(x, y);
      }
    }
  }, [minasGeneradas]);

  function contarMinasAlrededor(tableroSize, ubicacionesMinas) {
    return new Promise((resolve, reject) => {
      worker.postMessage({
        type: "countMines",
        data: {
          tableroSize,
          ubicacionesMinas,
        },
      });

      worker.onmessage = function (e) {
        const { type, data } = e.data;
        if (type === "minesCounted") {
          console.log("Contarminasworker:", type, data);
          resolve(data);
        }
      };

      worker.onerror = function (error) {
        reject(error);
      };
    });
  }

  const calcularMinasVecinas = (x, y) => {
    return new Promise((resolve, reject) => {
      const handleMessage = function (e) {
        const { type, data } = e.data;
        if (type === "neighborMinesCalculated") {
          console.log("Calcular minas worker:", type, data);
          worker.removeEventListener("message", handleMessage);
          resolve(data);
        }
      };

      worker.addEventListener("message", handleMessage);

      worker.postMessage({
        type: "calculateNeighborMines",
        data: {
          x,
          y,
          tableroSize,
          ubicacionesMinas,
        },
      });

      worker.onerror = function (e) {
        worker.removeEventListener("message", handleMessage); // Eliminar el manejador temporal
        reject(e);
      };
    });
  };

  const revelarCasillas = async (x, y) => {
    if (ubicacionesMinas.some((mina) => mina.x === x && mina.y === y)) {
      return; // No hacer nada si es una mina
    }

    let casillasARevisar = [[x, y]];
    let casillasRevisadas = new Set();
    const claveInicial = `${x}-${y}`;
    casillasReveladas.add(claveInicial);
    casillasRevisadas.add(claveInicial);

    while (casillasARevisar.length > 0) {
      let [currentX, currentY] = casillasARevisar.pop();
      const calculoMinasVecinas = await calcularMinasVecinas(
        currentX,
        currentY
      );
      console.log("Minas en revelarcasillas: ", calculoMinasVecinas);
      if (calculoMinasVecinas === 0) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            let newX = currentX + dx;
            let newY = currentY + dy;
            const nuevaClave = `${newX}-${newY}`;

            if (
              newX >= 0 &&
              newX < tableroSize &&
              newY >= 0 &&
              newY < tableroSize &&
              !casillasRevisadas.has(nuevaClave) &&
              !ubicacionesMinas.some(
                (mina) => mina.x === newX && mina.y === newY
              )
            ) {
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

  const manejarClicCasilla = async (e, x, y) => {
    if (primerClic) {
      setEstadoXY({ x: x, y: y });
      generarMinasAleatorias(x, y);
      setPrimerClic(false);
      setEstadoJuego("jugando");
      if (soundEffectValueConfig == "1") soundEffects.current.primerClic.play();
    } else {
      if (ubicacionesMinas.some((mina) => mina.x === x && mina.y === y)) {
        setCasillasReveladas(new Set(casillasReveladas).add(`${x}-${y}`));
      } else {
        if (bombaRevelada == false) {
          revelarCasillas(x, y);
          if (soundEffectValueConfig == "1")
            soundEffects.current.desentierro.play();
        }
      }
    }
  };

  const manejarClicDerecho = (e, x, y) => {
    e.preventDefault();

    if (casillasReveladas.has(`${x}-${y}`)) return;

    if (!bombaRevelada) {
      const clave = `${x}-${y}`;
      const marcacionActual = new Set(casillasMarcadas);

      if (soundEffectValueConfig == "1") soundEffects.current.bandera.play();

      if (marcacionActual.has(clave)) {
        marcacionActual.delete(clave);
      } else {
        marcacionActual.add(clave);
      }
      setCasillasMarcadas(marcacionActual);
    }
  };

  useEffect(() => {
    // Verificar si alguna de las casillas reveladas es una mina
    casillasReveladas.forEach((casilla) => {
      const [x, y] = casilla.split("-").map(Number);
      if (ubicacionesMinas.some((mina) => mina.x === x && mina.y === y)) {
        setTimeout(() => {
          setEstadoJuego("perdido");
          setBombaRevelada(true);
        }, 0);
      }
    });

    // Verificar si se han revelado todas las casillas que no son minas
    if (casillasReveladas.size === tableroSize * tableroSize - cantidadMinas) {
      setTimeout(() => {
        setDuracionPartidaActual(cronometro);
        setEstadoJuego("ganado");
      }, 0);
    }
  }, [casillasReveladas, ubicacionesMinas]);

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
    console.log("Ubicaciones minas: ", ubicacionesMinas);
  }

  useEffect(() => {
    let intervalo;

    if (!primerClic && estadoJuego == "jugando") {
      // Configurar el intervalo solo si primerClic es falso
      intervalo = setInterval(() => {
        setCronometro((contadorActual) => {
          if (contadorActual >= 999) {
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
      if (intervalo || estadoJuego == "ganado") {
        clearInterval(intervalo);
      }
    };
  }, [primerClic, estadoJuego]);

  const [contadorMinasState, setContadorMinasState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const contadorProv = await contarMinasAlrededor(
        tableroSize,
        ubicacionesMinas
      );
      console.log("ContadorMinas: ", contadorProv);
      setContadorMinasState(contadorProv);
    };

    fetchData();
  }, [tableroSize, ubicacionesMinas]);

  useEffect(() => {
    if (estadoJuego == "perdido") {
      const timer = setTimeout(() => {
        manejarRecord();
        setMostrarModalPerdido(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (estadoJuego == "ganado") {
      setMostrarModalPerdido(false);
      const timer = setTimeout(() => {
        manejarRecord();
        setMostrarModalGanado(true);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setMostrarModalPerdido(false);
      setMostrarModalGanado(false);
    }
  }, [estadoJuego]);

  function funcionEncenderModalReiniciarJuego() {
    setEncenderModalReiniciarJuego(true);
  }

  function funcionApagarModalReiniciarJuego() {
    setEncenderModalReiniciarJuego(false);
  }

  function renderizarCronometro() {
    if (duracionPartidaActual > 0) {
      return duracionPartidaActual;
    } else {
      return cronometro;
    }
  }

  function manejarRecord() {
    const recordAnteriorSinParse = getRecord();
    const recordAnterior = parseInt(recordAnteriorSinParse);
    const esNuevoRecord =
      duracionPartidaActual < recordAnterior ||
      recordAnterior === 0 ||
      recordAnteriorSinParse === null;
    if (esNuevoRecord && estadoJuego === "ganado") {
      localStorage.setItem(`record${tableroSize}`, duracionPartidaActual);
    }
  }

  function getRecord() {
    return localStorage.getItem(`record${tableroSize}`);
  }

  const music = useSelector(state => state.music.music);

  return (
    <>
      <Navbar />
      <Submenu />
      <GestorAtajos/>
      {music == '1' && (
        <GameMusic gameState={estadoJuego} />
      )}
      <div className="contenedorJuego">
        <div className="centrarHijos">
          <div className="divirSeccionesRecord">
            <p>🚩 {cantidadMinas - casillasMarcadas.size}</p>
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
            contadorMinas={contadorMinasState}
            estadoJuego={estadoJuego}
          />
          <div
            className="btnReiniciarJuegos"
            onClick={funcionEncenderModalReiniciarJuego}
          >
            ☹️
          </div>
        </div>
      </div>
      <div className="espacio"></div>
      {mostrarModalPerdido && (
        <Modal
          tituloModal={translations[language].modalPerdiste}
          tiempoActual={"---"}
          tiempoRecord={getRecord()}
          onClick={reiniciarJuego}
          motivoModal="b"
        />
      )}
      {mostrarModalGanado && (
        <Modal
          tituloModal={translations[language].modalGanaste}
          tiempoActual={duracionPartidaActual}
          tiempoRecord={getRecord()}
          onClick={reiniciarJuego}
          motivoModal="g"
        />
      )}
      {encenderModalReiniciarJuego && (
        <Modal
          tituloModal={translations[language].modalReiniciarJuego}
          onClick={reiniciarJuego}
          onClickX={funcionApagarModalReiniciarJuego}
          motivoModal="b"
        />
      )}
    </>
  );
}

export default GameState;
