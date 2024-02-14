import Navbar from "./Navbar";
import './Home.css';
import Submenu from "./Submenu";
import { Link } from 'react-router-dom';
import './App.css'
import Flor from "./Flor";
import React from "react";
import { Suspense, lazy } from 'react';
const LazyImage = React.lazy(() => import('./LazyImagen.jsx')); // Asume que tienes un componente LazyImage

function Home(){
  
    return (
        <div className="home">
            <Navbar/>
            <Submenu/>
            <div className="gridDificultades">
                <Link to="/easy">
                <div className="contenedorNivel" id="parteIzq">
                    <p> Facil </p>
                    <Suspense fallback={<div>Cargando...</div>}>
                        <LazyImage src="buscaminas(3).png" alt="" />
                    </Suspense>
                </div>
                </Link>
                <Link to="/medium">
                <div className="contenedorNivel" >
                    <p> Medio </p> 
                    <Suspense fallback={<div>Cargando...</div>}>
                        <LazyImage src="buscaminas(2).png" alt="" />
                    </Suspense>
                </div>  
                </Link>
                <Link to="/hard">
                <div className="contenedorNivel" id="parteDer">
                    <p> Dificil </p>
                    <Suspense fallback={<div>Cargando...</div>}>
                        <LazyImage src="buscaminas(1).png" alt="" />
                    </Suspense>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Home;