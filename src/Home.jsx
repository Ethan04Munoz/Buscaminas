import Navbar from "./Navbar";
import './Home.css';
import Submenu from "./Submenu";
import { Link } from 'react-router-dom';
import './App.css'
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import translations from './translations.js'; 

function Home(){
    const language = useSelector(state => state.language.language); // Accede al idioma actual desde el store de Redux

    const [esMovil, setEsMovil] = useState(false);
    useEffect(() => {
        console.log("Width heigth: ", window.innerHeight, window.innerWidth)
        if(window.innerWidth < window.innerHeight){
            setEsMovil(true);
        }else{
          setEsMovil(false);
        }
    }, [])
    return (
        <div className="home">
            <Navbar/>
            <Submenu/>
            <div className="gridDificultades">
                <Link to="/Buscaminas/easy">
                <div className="contenedorNivel" id="parteIzq">
                    <p> {translations[language].dificultadFacilHome} </p>
                    <img src="webp/buscamina flor (2).webp" alt="" />
                </div>
                </Link>
                <Link to="/Buscaminas/medium">
                <div className="contenedorNivel" >
                    <p> {translations[language].dificultadMediaHome} </p> 
                    <img src="webp/buscamina flor (1).webp" alt="" />
                </div>  
                </Link>
                {esMovil==false && (
                    <Link to="/Buscaminas/hard">
                    <div className="contenedorNivel" id="parteDer">
                        <p> {translations[language].dificultadDificilHome} </p>
                        <img src="webp/buscamina flor (3).webp" alt="" />
                    </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Home;