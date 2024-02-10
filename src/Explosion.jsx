import './Explosion.css';
import React, { useEffect, useRef } from 'react';

function Explosion(){
      // Utiliza useRef para crear una referencia al elemento DOM
  const cenizaRef = useRef(null);

  useEffect(() => {
    // Accede al elemento actual de la referencia
    const ceniza = cenizaRef.current;
    
    // Genera valores aleatorios para translateY y rotate
    const translateY = Math.random() * 20; // Ajusta el 20 al rango que desees
    const rotate = Math.random() * -360; // Ajusta para el giro
    
    // Aplica los estilos directamente, incluyendo el valor aleatorio
    if (ceniza) {
      ceniza.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
    }
  }, []); // Dependencias vacías para que solo se ejecute una vez al montar

    return (
        <div class="explosion">
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>
            <div class="parte"></div>

            <div ref={cenizaRef} class="ceniza"       style={{
        animation: 'cenizas 5s infinite',
        // Aquí podrías añadir más estilos si es necesario
      }}></div>
            <div ref={cenizaRef} class="ceniza"      style={{
        animation: 'cenizas 5s infinite',
        // Aquí podrías añadir más estilos si es necesario
      }}></div>
            <div ref={cenizaRef} class="ceniza"      style={{
        animation: 'cenizas 5s infinite',
        // Aquí podrías añadir más estilos si es necesario
      }}></div>
            <div ref={cenizaRef} class="ceniza"      style={{
        animation: 'cenizas 5s infinite',
        // Aquí podrías añadir más estilos si es necesario
      }}></div>
            <div ref={cenizaRef} class="ceniza"      style={{
        animation: 'cenizas 5s infinite',
        // Aquí podrías añadir más estilos si es necesario
      }}></div>
            <div ref={cenizaRef} class="ceniza"      style={{
        animation: 'cenizas 5s infinite',
        // Aquí podrías añadir más estilos si es necesario
      }}></div>
        </div>
    )
}

export default Explosion;