import './Flor.css';
import React from 'react';

function Flor() {
    // Lista de clases para los colores de los pétalos
    const coloresPetalo = [
        'petalo-rosa', 
        'petalo-azul', 
        'petalo-rojo', 
        'petalo-violeta', 
        'petalo-tinto', 
        'petalo-naranja', 
        'petalo-fuschia', 
        'petalo-azulCielo', 
        'petalo-azul2'
    ];
    const tiposPetalo = ['petalo-redondo', 'petalo-ovalo10', 'petalo-pentagono'];
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

    const getClaseCentro = (colorPetalo) => {
        const centroColorMap = {
            'petalo-rosa': 'centro-rosa',
            'petalo-azul': 'centro-azul',
            'petalo-rojo': 'centro-rojo',
            'petalo-violeta': 'centro-violeta',
            'petalo-tinto': 'centro-tinto',
            'petalo-naranja': 'centro-naranja',
            'petalo-fuschia': 'centro-fuschia',
            'petalo-azulCielo': 'centro-azulCielo',
            'petalo-azul2': 'centro-azul2'
        };

        return centroColorMap[colorPetalo] || 'centro-default';
    };

    const claseCentro = getClaseCentro(colorFlor);

    return (
        <div className="flower">
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className={`petal ${tipoPetalo} ${colorFlor}`}></div>
            <div className={`center ${claseCentro}`}></div>
        </div>
    )
}

export default Flor;
