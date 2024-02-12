import { useState } from "react";
import Modal from "./Modal";
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar(props){
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
                <Link to="/"><div className="buscaminasHomeTitle"> <h1>Buscaminas</h1></div></Link>
                <div></div>
                <img className="" src="config.png" alt="" onClick={encenderModalConfiguracion}/>
            </div>
            {modalConfiguracion == true && (
                <Modal tituloModal="Configuración" onClickX={apagarModalConfiguracion}/>
            )}
        </div>
    )
}

export default Navbar;