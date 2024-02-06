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
                <div className='divirSeccionesRecordModal'>
                    { (props.tiempoActual != null || props.tiempoRecord != null) ? (
                        <>
                            <p>⏰: {props.tiempoActual}</p>
                            <p>🏆: {props.tiempoRecord}</p>
                        </>
                    ) : null}
                </div>
                <button className={manejarClaseBotonReiniciar()} onClick={props.onClick}>Reiniciar juego</button>
            </div>
        </div>
    )
}

export default Modal;