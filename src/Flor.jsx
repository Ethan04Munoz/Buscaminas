import './Flor.css';
import React from 'react';

function Flor() {
    // Lista de clases para los colores de los pétalos
    const coloresPetalo = ['petalo-rosa', 'petalo-azul', 'petalo-rojo', 'petalo-violeta', 'petalo-tinto'];

    // Función para obtener un color aleatorio de la lista
    const getColorAleatorio = () => {
        const indiceAleatorio = Math.floor(Math.random() * coloresPetalo.length);
        return coloresPetalo[indiceAleatorio];
    };
    const colorFlor = getColorAleatorio();
    return (
        <div className="flower">
            {/* Aplicar el color aleatorio a cada pétalo */}
            <div className={`petal ${colorFlor}`}></div>
            <div className={`petal ${colorFlor}`}></div>
            <div className={`petal ${colorFlor}`}></div>
            <div className={`petal ${colorFlor}`}></div>
            <div className={`petal ${colorFlor}`}></div>
            <div className="center"></div>
        </div>
    )
}

export default Flor;
