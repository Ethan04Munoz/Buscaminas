import React, { useState, useEffect } from 'react';
import ReactHowler from 'react-howler';

const GameMusic = () => {
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'

  // Función para simular el cambio de estado del juego
  const changeGameState = (newState) => {
    setGameState(newState);
  };


  return (
    <div>
      {gameState === 'playing' && <ReactHowler src="musica/com/epica.mp3" loop={true} preload={true} />}
      {gameState === 'won' && <ReactHowler src="musica/com/feliz.mp3"  loop={true} preload={true} />}
      {gameState === 'lost' && <ReactHowler src="musica/com/triste.mp3"  loop={true} preload={true} />}

      {/* Botones para simular cambios de estado del juego */}
      <button onClick={() => changeGameState('playing')}>Start Game</button>
      <button onClick={() => changeGameState('won')}>Win Game</button>
      <button onClick={() => changeGameState('lost')}>Lose Game</button>
    </div>
  );
};

export default GameMusic;
