import React from 'react';
import Navbar from "../componentes/Navbar.jsx";
import '../App.css';
import Submenu from "../componentes/Submenu.jsx";
import { Suspense } from 'react';
const LazyImage = React.lazy(() => import('../componentes/LazyImagen.jsx')); // Asume que tienes un componente LazyImage
import { useSelector } from 'react-redux';
import translations from '../redux/translations.js'; 

function ComoJugar(){
    const language = useSelector(state => state.language.language); // Accede al idioma actual desde el store de Redux

    return(
        <div className="ComoJugar">
            <Navbar/>
            <Submenu/>
            <div className="centrar50">
                <h1>{translations[language].comojugarH1}</h1>
                <p>
                    {translations[language].comojugarParrafo1}
                </p>
                <p>{translations[language].comojugarParrafo2}</p>
                <ul>
                    <li>
                        {translations[language].comojugarElementoLista1}
                    </li>
                    <Suspense fallback={<div>Cargando...</div>}>
                        <LazyImage src="img ayuda (2).png" />
                    </Suspense>
                    <li>
                        {translations[language].comojugarElementoLista2}
                    </li>
                    <Suspense fallback={<div>Cargando...</div>}>
                        <LazyImage src="img ayuda (1).png"/>
                    </Suspense>
                </ul>
                <p>
                    {translations[language].comojugarParrafo3}
                </p>
                <p>
                    {translations[language].comojugarParrafo4}
                </p>
                <p>
                    {translations[language].comojugarParrafo5}
                </p>
                <Suspense fallback={<div>Cargando...</div>}>
                    <LazyImage src="img ayuda (3).png"/>
                </Suspense>
            </div>
            <div className="espacio"></div>
        </div>
    )
}

export default ComoJugar;