import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import { useSelector } from 'react-redux';
import translations from "../redux/translations";

function GestorAtajos() {
    const [estaCerrado, setEstaCerrado] = useState(false);

    const language = useSelector(state => state.language.language);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            console.log("Clic en tecla, ", event, event.key)
            if (event.key === 'Escape') {
                setEstaCerrado(true);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    useEffect(() => {
        console.log("Esta cerrado: ", estaCerrado)
    }, [estaCerrado])

    return (
        <div>
            {estaCerrado && (
                <Modal tituloModal={translations[language].configuracion} onClickX={() => setEstaCerrado(false)}/>
            )}
        </div>
    );
}

export default GestorAtajos;