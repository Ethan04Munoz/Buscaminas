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
                <Link className="enlaceSubmenu" to="/easy">Buscaminas facil</Link>
            </div>
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/medium">Buscaminas medio</Link>
            </div>
            {esMovil == false && (
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/hard">Buscaminas dificil</Link>
            </div>
            )}

            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/help">Ayuda?</Link>
            </div>
        </div>
    )
}

export default Submenu;