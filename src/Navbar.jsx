import { useState } from "react";
import Modal from "./Modal";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import translations from './translations.js'; 

function Navbar(props){
    const language = useSelector(state => state.language.language); // Accede al idioma actual desde el store de Redux


    const [modalConfiguracion, setModalConfiguracion] = useState(false);
    function encenderModalConfiguracion(){
        setModalConfiguracion(true);
    }

    function apagarModalConfiguracion(){
        setModalConfiguracion(false)
    }

    return(
        <div className="navbar">
            <div className="gridNavBar">
                <Link to="/Buscaminas/"><div className="buscaminasHomeTitle"> <h1>{translations[language].tituloPrincipalNavbar}</h1></div></Link>
                <div></div>
                <img className="" src="webp/config.webp" alt="" onClick={encenderModalConfiguracion}/>
            </div>
            {modalConfiguracion == true && (
                <Modal tituloModal="Configuración" onClickX={apagarModalConfiguracion}/>
            )}
        </div>
    )
}

export default Navbar;