import React, { useState } from 'react';
import './Modal.css';
import InputRadio from './componentes/InputRadio';
import { Suspense, lazy } from 'react';
const LazyImage = React.lazy(() => import('./LazyImagen.jsx')); // Asume que tienes un componente LazyImage
const InputRadioLazy = React.lazy(() => import('./componentes/InputRadio'));
import { useSelector, useDispatch } from 'react-redux';
import translations from './translations.js'; 


function Modal(props){
    const language = useSelector(state => state.language.language);
    const dispatch = useDispatch();

    function manejarClaseBotonReiniciar(){
        if (props.motivoModal == "g") {
            return 'btnReiniciarJuegoGoodEnding';
        }else if (props.motivoModal == "b") {
            return 'btnReiniciarJuegoBadEnding';
        }
    }

    const cambiarIdioma = () => {
        dispatch({ type: 'CHANGE_LANGUAGE' });
    };
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
                        
                    
                        <div>{translations[language].idioma}</div>
                        <Suspense fallback={<div>Cargando...</div>}>
                            <div className='gridInterruptor'>
                                {translations[language].espanol}
                                <InputRadioLazy tipoSlider="sliderColores" onChangeProp={cambiarIdioma}/> 
                                {translations[language].ingles}
                            </div>
                        </Suspense>
{/*
                        <Suspense fallback={<div>Cargando...</div>}>
                            <div>
                                <LazyImage src="musica-Dark.png" alt="" />
                            </div>
                        </Suspense>
                        <Suspense fallback={<div>Cargando...</div>}>
                            <div className='gridInterruptor'>No <InputRadioLazy/> Si </div>
                        </Suspense>

                        <Suspense fallback={<div>Cargando...</div>}>
                            <div>
                                <LazyImage src="bocina-Dark.png" alt="" />
                            </div> 
                        </Suspense>
                        <Suspense fallback={<div>Cargando...</div>}>
                            <div className='gridInterruptor'>No <InputRadioLazy/> Si </div>
                        </Suspense>
                    */}
                        
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    <div></div>
                            <a className='github' href="https://github.com/Ethan04Munoz">
                                <div className=''>
                                    <Suspense fallback={<div>Cargando...</div>}>
                                        <LazyImage src="github-Dark.svg" alt="" />
                                    </Suspense>
                                </div>   
                            </a>

                    </div>
                )}
                {props.onClick && (
                    <button className={manejarClaseBotonReiniciar()} onClick={props.onClick}>
                        {translations[language].botonReiniciarJuego}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Modal;