import { Link } from 'react-router-dom';
import './Submenu.css';

function Submenu(){
    return (
        <div className="submenu">
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/easy">Facil</Link>
            </div>
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/medium">Medio</Link>
            </div>
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/hard">Dificil</Link>
            </div>
            <div className='contenedorEnlace'>
                <Link className="enlaceSubmenu" to="/help">Ayuda?</Link>
            </div>
        </div>
    )
}

export default Submenu;