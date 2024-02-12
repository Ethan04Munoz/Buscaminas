import { Link } from 'react-router-dom';
import './Submenu.css';

function Submenu(){
    return (
        <div className="submenu">
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/easy">Buscaminas facil</Link>
            </div>
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/medium">Buscaminas medio</Link>
            </div>
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/hard">Buscaminas dificil</Link>
            </div>
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/help">Ayuda?</Link>
            </div>
        </div>
    )
}

export default Submenu;