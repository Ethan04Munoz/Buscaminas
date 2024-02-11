import React, { useState } from 'react';
import './Modal.css';

function Modal(props){
    function manejarClaseBotonReiniciar(){
        if (props.motivoModal == "g") {
            return 'btnReiniciarJuegoGoodEnding';
        }else if (props.motivoModal == "b") {
            return 'btnReiniciarJuegoBadEnding';
        }
    }
    return(
        <div className="modal">
            <div className='modalAdv'>
                { (props.onClickX != null) ? (
                    <div className="aLaDerechaConGrid">
                        <button className='btnCerrarModal' onClick={props.onClickX}>X</button>
                    </div>
                ) : null}
                <h2>{props.tituloModal}</h2>
                { (props.tiempoActual != null || props.tiempoRecord != null) ? (
                    <div className='divirSeccionesRecordModal'>
                                <p>⏰: {props.tiempoActual}</p>
                                <p>🏆: {props.tiempoRecord}</p>
                    </div>
                ) : null}
                {(props.tituloModal=="Configuración" || props.tituloModal == "Settings") && (
                    <div className='gridConfiguracion'>
                        <div>Idioma:</div>
                        <div></div>
                        <div>Música:</div>
                        <div></div>
                        <div>Efectos de sonido:</div>   
                        <div></div>
                        <div>Github</div>   
                    </div>
                )}
                <button className={manejarClaseBotonReiniciar()} onClick={props.onClick}>Reiniciar juego</button>
            </div>
        </div>
    )
}

export default Modal;