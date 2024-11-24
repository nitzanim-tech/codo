import React, { useEffect, useState } from 'react';

import Board from './Board';
import woodBackground from '../../assets/svg/wood.svg';

function SetGame({ output, handleInput }) {
  const [relevatOutput, setRelevatOutput] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [lastMassage, setLastMassage] = useState('');

  useEffect(() => {
    setRelevatOutput(getLastBoardFromOutput(output));
    if (!output) {
      setClickedCards([]);
      setLastMassage('');
    }
  }, [output]);

  useEffect(() => {
    const lastClickedCard = clickedCards[clickedCards.length - 1];
    if (!isNaN(lastClickedCard)) {
      handleInput(lastClickedCard);
    }
  }, [clickedCards]);

  const getLastBoardFromOutput = (output) => {
    const lines = output.split('\n');
    const boardLines = [];
    for (let i = lines.length - 1; i >= 0; i--) {
      if (['color', 'shape', 'shading', 'striped'].some((word) => lines[i].includes(word))) {
        boardLines.push(lines[i]);
      } else if (boardLines.length != 0) {
        if (i > 0 && clickedCards.length > 2) {
          setLastMassage(lines[i]);
          if (lines[i].toLowerCase().includes('great')) setClickedCards([]);
        } else setLastMassage('');
        break;
      }
    }
    return boardLines.reverse().join('\n') || '';
  };

  return (
    <div className="left-half" style={{ backgroundImage: `url(${woodBackground})` }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Board boardText={relevatOutput} clickedCards={clickedCards} setClickedCards={setClickedCards} />
      </div>
    </div>
  );
}

export default SetGame;
