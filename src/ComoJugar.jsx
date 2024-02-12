import Navbar from "./Navbar";
import './App.css';
import Submenu from "./Submenu";

function ComoJugar(){
    return(
        <div className="ComoJugar">
            <Navbar/>
            <Submenu/>
            <div className="centrar50">
                <h1>¿Cómo jugar al buscaminas?</h1>
                <p>
                    Al abrir el buscaminas, te encontrarás con un tablero cubierto de cuadros. 
                    El objetivo del juego es descubrir todos los cuadros que no contienen minas. Las minas están escondidas aleatoriamente bajo los cuadros.
                </p>
                <p>Cómo despejar cuadros</p>
                <ul>
                    <li>
                        Click izquierdo: Al hacer clic en un cuadro, este se despejará. Si hay una mina debajo, pierdes el juego. Si no hay mina, aparecerá un número, que indica la cantidad de minas en los ocho cuadros circundantes.
                    </li>
                    <li>
                    Marcando minas: Si crees que hay una mina bajo un cuadro en particular, puedes marcarlo con un click derecho (o un click largo en dispositivos táctiles) para colocar una bandera. Esto te ayuda a llevar un registro de dónde crees que están las minas.
                    </li>
                </ul>
                <p>
                    Cuando despejas un cuadro y aparece un número, este te indica cuántas minas hay en los ocho cuadros que lo rodean. 
                    Usando esta información, puedes deducir dónde es seguro clickear a continuación y dónde podría haber minas escondidas.
                </p>
                <p>
                    La estrategia básica consiste en usar los números para deducir la ubicación de las minas. Por ejemplo, si un cuadro dice "1", sabes que de los cuadros circundantes, solo uno es una mina. 
                    Con práctica, aprenderás a reconocer patrones que te ayudarán a despejar áreas más grandes del tablero de manera segura.
                </p>
                <p>
                    Para ganar, debes despejar todos los cuadros que no tienen minas. 
                    No es necesario colocar banderas en todas las minas para ganar; simplemente, debes evitar detonar cualquier mina. ¡Mucha suerte!
                </p>
            </div>
        </div>
    )
}

export default ComoJugar;