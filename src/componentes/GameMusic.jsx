import React, { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useSelector } from 'react-redux';

const GameMusic = ({ gameState }) => {
    const howlers = useRef({
        jugando: new Howl({ src: ["musica/com/normal.mp3"], preload: true, loop: true, volume: 0.5 }),
        ganado: new Howl({ src: ["musica/com/feliz.mp3"], preload: true, loop: true, volume: 0.25 }),
        perdido: new Howl({ src: ["musica/com/triste2.mp3"], preload: true, loop: true, volume: 0.6 })
        //perdido: new Howl({ src: ["musica/triste2.mp3"], preload: true, loop: true, volume: 0.5 })
    });

    useEffect(() => {
        const stopAllSounds = () => {
            Object.values(howlers.current).forEach(howl => howl.stop());
        };

        if (gameState === "no jugando") {
            stopAllSounds();
        } else {
            stopAllSounds();
            if (howlers.current[gameState]) {
                howlers.current[gameState].play();
            }
        }

        // Cleanup function que se ejecuta cuando el componente se desmonta
        return () => {
            stopAllSounds();
        };
    }, [gameState]); 

    return null; 
};

export default GameMusic;
