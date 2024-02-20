const translations = {
    es: {
        comojugarH1: `¿Cómo jugar al buscaminas?`,
        comojugarParrafo1: `Al abrir el buscaminas, te encontrarás con un tablero cubierto de cuadros de césped. 
            El objetivo del juego es descubrir todos los cuadros que no contienen minas. 
            Las minas están escondidas aleatoriamente bajo los cuadros.`,
        comojugarParrafo2: `Cómo despejar cuadros`,
        comojugarElementoLista1: `Clic izquierdo: Al hacer clic en un cuadro, este se despejará. 
            Si hay una mina debajo, pierdes el juego. 
            Si no hay mina, aparecerá un número, que indica la cantidad de minas en los ocho cuadros circundantes.`,
        comojugarElementoLista2: `Marcando minas: Si crees que hay una mina bajo un cuadro en particular, 
            puedes marcarlo con un clic derecho (o un click largo en dispositivos táctiles) 
            para colocar una bandera. Esto te ayuda a llevar un registro de dónde crees que están las minas.`,
        comojugarParrafo3: `Cuando despejas un cuadro y aparece un número, este te indica cuántas minas hay en los ocho cuadros que lo rodean. 
            Usando esta información, puedes deducir dónde es seguro clickear a continuación y dónde podría haber minas escondidas.`,
        comojugarParrafo4: `La estrategia básica consiste en usar los números para deducir la ubicación de las minas. 
            Por ejemplo, si un cuadro dice "1", sabes que de los cuadros circundantes, solo uno es una mina. 
            Con práctica, aprenderás a reconocer patrones que te ayudarán a despejar áreas más grandes del tablero de manera segura.`,
        comojugarParrafo5: `Para ganar, debes despejar todos los cuadros que no tienen minas. 
            No es necesario colocar banderas en todas las minas para ganar; 
            simplemente, debes evitar detonar cualquier mina. ¡Mucha suerte!`,

    },
    en: {
        comojugarH1: `How to play Minesweeper?`,
        comojugarParrafo1: `When you open The Minesweeper Game, you'll find a board covered by grass squares.
            The goal of this game is to uncover all the squares that do not contain mines.
            the mines are randomly hidden beneath the squares.`,
        comojugarParrafo2: `How to uncover the grass squares`,
        comojugarElementoLista1: `Left-clicking: When you click on a square, it will be uncovered. 
            If there is a mine underneath, you lose the game. 
            If there is no mine, a number will be revealed, indicating the number of mines in the eight surrounding squares.`,
        comojugarElementoLista2: `Marking mines: If you think there's a mine under a particular square, 
            you can mark it with a right-click (or a long press on touch devices) to place a flag. 
            This helps you keep track of where you think the mines are.`,
        comojugarParrafo3: `When you clear a square and a number appears, it tells you how many mines are in the eight squares surrounding it. 
            Using this information, you can deduce where it's safe to click next and where there might be hidden mines.`,
        comojugarParrafo4: `The basic strategy involves using the numbers to deduce the locations of the mines. 
            For example, if a square says "1", you know that of the surrounding squares, only one is a mine. 
            With practice, you'll learn to recognize patterns that will help you clear larger areas of the board safely.`,
        comojugarParrafo5: `To win, you must clear all the squares that do not contain mines. 
            It's not necessary to place flags on all the mines to win; 
            simply, you must avoid detonating any mine. Good luck!`,
    },
}

export default translations;