import Navbar from "../componentes/Navbar.jsx";
import './Home.css';
import Submenu from "../componentes/Submenu.jsx";
import { Link } from 'react-router-dom';
import '../App.css'
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import translations from '../redux/translations.js'; 
import GestorAtajos from "../componentes/GestorAtajos.jsx";

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
            <GestorAtajos/>
            <div className="gridDificultades">
                <Link to="/easy">
                <div className="contenedorNivel" id="parteIzq">
                    <p> {translations[language].dificultadFacilHome} </p>
                    <img src="webp/buscamina flor (2).webp" alt="" />
                </div>
                </Link>
                <Link to="/medium">
                <div className="contenedorNivel" >
                    <p> {translations[language].dificultadMediaHome} </p> 
                    <img src="webp/buscamina flor (1).webp" alt="" />
                </div>  
                </Link>
                {esMovil==false && (
                    <Link to="/hard">
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