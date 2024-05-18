import './Flor.css';
import React from 'react';

function Flor() {
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

    const getColorAleatorio = () => coloresPetalo[Math.floor(Math.random() * coloresPetalo.length)];
    const getTipoPetaloAleatorio = () => tiposPetalo[Math.floor(Math.random() * tiposPetalo.length)];

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
            {[...Array(5)].map((_, i) => (
                <div key={i} className={`petal ${tipoPetalo} ${colorFlor}`} style={{ transform: `rotate(${i * 72}deg)` }}></div>
            ))}
            <div className={`center ${claseCentro}`}></div>
        </div>
    );
}

export default Flor;
