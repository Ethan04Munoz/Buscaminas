import Navbar from "./Navbar";
import './Home.css';
import Submenu from "./Submenu";
import { Link } from 'react-router-dom';
import './App.css'
import React, { useEffect, useState } from "react";

function Home(){
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
                    <p> Facil </p>
                    <img src="webp/buscaminasFlor (3).webp" alt="" />
                </div>
                </Link>
                <Link to="/Buscaminas/medium">
                <div className="contenedorNivel" >
                    <p> Medio </p> 
                    <img src="webp/buscaminasFlor (2).webp" alt="" />
                </div>  
                </Link>
                {esMovil==false && (
                    <Link to="/Buscaminas/hard">
                    <div className="contenedorNivel" id="parteDer">
                        <p> Dificil </p>
                        <img src="webp/buscaminasFlor (1).webp" alt="" />
                    </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Home;