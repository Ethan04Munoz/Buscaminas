import { Link } from 'react-router-dom';
import './Submenu.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import translations from '../redux/translations.js'; 

function Submenu(){
    const language = useSelector(state => state.language.language); // Accede al idioma actual desde el store de Redux

    const [esMovil, setEsMovil] = useState(false);
    useEffect(() => {
        console.log("Width heigth: ", window.innerHeight, window.innerWidth)
        if(window.innerWidth < window.innerHeight){
            setEsMovil(true);
        }
    }, [])
    return (
        <div className="submenu">
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/easy">{translations[language].dificultadFacilSubmenu}</Link>
            </div>
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/medium">{translations[language].dificultadMediaSubmenu}</Link>
            </div>
            {esMovil == false && (
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/hard">{translations[language].dificultadDificilSubmenu}</Link>
            </div>
            )}

            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/help">{translations[language].ayudaSubmenu}</Link>
            </div>
            <div className="contenedorEnlace">
                <Link className="enlaceSubmenu" to="/about">{translations[language].aboutSubmenu}</Link>
            </div>
        </div>
    )
}

export default Submenu;