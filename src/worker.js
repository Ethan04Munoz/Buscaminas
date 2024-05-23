self.onmessage = function (e) {
    const { type, data } = e.data;
    
    if (type === 'generateMines') {
        const { eX, eY, cantidadMinas, tableroSize, obtenerNumeroAleatorioEntreStr, estaEnAreaProhibidaStr } = data;
        const ubicacionesMinas = new Set();

        const obtenerNumeroAleatorioEntre = new Function(`return ${obtenerNumeroAleatorioEntreStr}`)();
        const estaEnAreaProhibida = new Function(`return ${estaEnAreaProhibidaStr}`)();

        while (ubicacionesMinas.size < cantidadMinas) {
            const x = obtenerNumeroAleatorioEntre(0, tableroSize - 1);
            const y = obtenerNumeroAleatorioEntre(0, tableroSize - 1);

            if (!estaEnAreaProhibida(x, y, eX, eY)) {
                ubicacionesMinas.add(`${x},${y}`);
            }
        }

        const minasArray = Array.from(ubicacionesMinas).map(coordenada => {
            const [x, y] = coordenada.split(',').map(Number);
            return { x, y };
        });

        self.postMessage({ type: 'minesGenerated', data: minasArray });
    } else if ( type === 'countMines' ) {
        const { tableroSize, ubicacionesMinas } = data;
        console.log("Trabajando en el worker")
        function contarMinasAlrededor(tableroSize, ubicacionesMinas) {
            let contadorMinas = Array.from({ length: tableroSize }, () => 
              Array(tableroSize).fill(0));
    
            for (let x = 0; x < tableroSize; x++) {
                for (let y = 0; y < tableroSize; y++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            if (dx === 0 && dy === 0) {
                                continue;
                            }
    
                            let newX = x + dx;
                            let newY = y + dy;
    
                            if (newX >= 0 && newX < tableroSize && newY >= 0 && newY < tableroSize) {
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
    
        const resultado = contarMinasAlrededor(tableroSize, ubicacionesMinas);
        self.postMessage({type: 'minesCounted', data: resultado});
    } else if ( type === 'calculateNeighborMines' ) {
        const { x, y, ubicacionesMinas, tableroSize } = data;

        function calcularMinasVecinas(x, y, ubicacionesMinas, tableroSize) {
            let contadorMinas = 0;
            console.log("Ubicaciones minas: ", ubicacionesMinas);
            
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (dx === 0 && dy === 0) continue;
                    const newX = x + dx;
                    const newY = y + dy;
    
                    if (newX >= 0 && newX < tableroSize && newY >= 0 && newY < tableroSize) {
                        if (ubicacionesMinas.some(mina => mina.x === newX && mina.y === newY)) {
                            contadorMinas++;
                        }
                    }
                }
            }
            console.log("Contador minas", contadorMinas);
            return contadorMinas;
        }
    
        const resultado = calcularMinasVecinas(x, y, ubicacionesMinas, tableroSize);
        self.postMessage({type: 'neighborMinesCalculated', data: resultado});
    }
};