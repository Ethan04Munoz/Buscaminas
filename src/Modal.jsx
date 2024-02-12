import React, { useState } from 'react';
import './Modal.css';
import InputRadio from './componentes/InputRadio';

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
                        <div className='gridInterruptor'>Español <InputRadio tipoSlider="bandera"/> Inglés</div>
                        <div><img src="musica-Dark.png" alt="" /></div>
                        <div className='gridInterruptor'>No <InputRadio/> Si </div>
                        <div><img src="bocina-Dark.png" alt="" /></div>   
                        <div className='gridInterruptor'>No <InputRadio/> Si </div>
                        <a className='github' href="https://github.com/Ethan04Munoz"><div className=''><img src="github-Dark.svg" alt="" /></div>   </a>
                    </div>
                )}
                {props.onClick && (
                    <button className={manejarClaseBotonReiniciar()} onClick={props.onClick}>Reiniciar juego</button>
                )}
            </div>
        </div>
    )
}

export default Modal;