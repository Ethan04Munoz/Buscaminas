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
    }
};