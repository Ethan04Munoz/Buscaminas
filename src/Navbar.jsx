import { useState } from "react";
import Modal from "./Modal";

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
            <div>Buscaminas</div>
            <div><img src="config.png" alt="" onClick={encenderModalConfiguracion}/></div>
            </div>
            <div></div>
            {modalConfiguracion == true && (
                <Modal tituloModal="Configuración" onClickX={apagarModalConfiguracion}/>
            )}
        </div>
    )
}

export default Navbar;