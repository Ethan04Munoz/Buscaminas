import { useState } from "react";
import Modal from "./Modal";
import './Navbar.css';

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
                <div className="buscaminasHomeTitle"> <h1>Buscaminas</h1></div>
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