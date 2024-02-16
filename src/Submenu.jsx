import { Link } from 'react-router-dom';
import './Submenu.css';
import { useEffect, useState } from 'react';

function Submenu(){
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
                <Link className="enlaceSubmenu" to="/Buscaminas/easy">Buscaminas facil</Link>
            </div>
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/Buscaminas/medium">Buscaminas medio</Link>
            </div>
            {esMovil == false && (
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/Buscaminas/hard">Buscaminas dificil</Link>
            </div>
            )}

            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/Buscaminas/help">Ayuda?</Link>
            </div>
        </div>
    )
}

export default Submenu;