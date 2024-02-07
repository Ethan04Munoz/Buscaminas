import './Flor.css';
import React from 'react';

function Flor() {
    // Lista de clases para los colores de los pétalos
    const coloresPetalo = ['petalo-rosa', 'petalo-azul', 'petalo-rojo', 'petalo-violeta', 'petalo-tinto'];
    const tiposPetalo = ['petalo-redondo', 'petalo-ovalo10'];
    // Función para obtener un color aleatorio de la lista
    const getColorAleatorio = () => {
        const indiceAleatorio = Math.floor(Math.random() * coloresPetalo.length);
        return coloresPetalo[indiceAleatorio];
    };

    const getTipoPetaloAleatorio = () => {
        const indiceAleatorio = Math.floor(Math.random() * tiposPetalo.length);
        return tiposPetalo[indiceAleatorio];
    }
    const colorFlor = getColorAleatorio();
    const tipoPetalo = getTipoPetaloAleatorio();
    return (
        <div className="flower">
            {/* Generar una cantidad aleatoria de petalos entre 2 y 10 */}
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className="center"></div>
        </div>
    )
}

export default Flor;
