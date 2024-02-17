import Navbar from "./Navbar";
import './Home.css';
import Submenu from "./Submenu";
import { Link } from 'react-router-dom';
import './App.css'
import Flor from "./Flor";
import React, { useEffect, useState } from "react";
import { Suspense, lazy } from 'react';
const LazyImage = React.lazy(() => import('./LazyImagen.jsx')); // Asume que tienes un componente LazyImage

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
                    <Suspense fallback={<div>Cargando...</div>}>
                        <LazyImage src="webp/buscaminasFlor (3).webp" alt="" />
                    </Suspense>
                </div>
                </Link>
                <Link to="/Buscaminas/medium">
                <div className="contenedorNivel" >
                    <p> Medio </p> 
                    <Suspense fallback={<div>Cargando...</div>}>
                        <LazyImage src="webp/buscaminasFlor (2).webp" alt="" />
                    </Suspense>
                </div>  
                </Link>
                {esMovil==false && (
                    <Link to="/Buscaminas/hard">
                    <div className="contenedorNivel" id="parteDer">
                        <p> Dificil </p>
                        <Suspense fallback={<div>Cargando...</div>}>
                            <LazyImage src="webp/buscaminasFlor (1).webp" alt="" />
                        </Suspense>
                    </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Home;