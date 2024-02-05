import React, { useState } from 'react';
import './Modal.css';

function Modal(props){
    return(
        <div className="modal">
            <div className='modalAdv'>
                <h2>{props.tituloModal}</h2>
                <div className='divirSeccionesRecordModal'>
                    { (props.tiempoActual != null || props.tiempoRecord != null) ? (
                        <>
                            <p>⏰: {props.tiempoActual}</p>
                            <p>🏆: {props.tiempoRecord}</p>
                        </>
                    ) : null}
                </div>
                <button onClick={props.onClick}>Reiniciar juego</button>
            </div>
        </div>
    )
}

export default Modal;