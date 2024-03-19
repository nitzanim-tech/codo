import React, { useEffect, useState } from 'react';

import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import './Play.css';
import Board from '../Games/SET/Board';
import Terminal from '../components/IDE/Terminal';
import RunCodeButton from '../components/IDE/RunCodeButton';
import woodBackground from '../assets/svg/wood.svg';

function Play() {
  const code = localStorage.getItem('code');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [inputCallback, setInputCallback] = useState('');
  const [relevatOutput, setRelevatOutput] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [lastMassage, setLastMassage] = useState('');

  const handleInput = (value) => {
    if (inputCallback) {
      setLastMassage('');
      inputCallback(value);
      setInputCallback(null);
    }
  };

  useEffect(() => {
    setRelevatOutput(getLastBoardFromOutput(output));
  }, [output]);

  useEffect(() => {
    handleInput(clickedCards[clickedCards.length - 1]);
  }, [clickedCards]);

  const getLastBoardFromOutput = (output) => {
    const lines = output.split('\n');
    const boardLines = [];
    for (let i = lines.length - 1; i >= 0; i--) {
      if (['color', 'shape', 'shading', 'striped'].some((word) => lines[i].includes(word))) {
        boardLines.push(lines[i]);
      } else if (boardLines.length != 0) {
        if (i > 0) setLastMassage(lines[i]);
        break;
      }
    }
    return boardLines.reverse().join('\n') || '';
  };

  return (
    <>
      <NavBar />
      <PyodideProvider>
        <div className="container">
          <div className="left-half" style={{ backgroundImage: `url(${woodBackground})` }}>
            <h2>
              <b>{lastMassage}</b>
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Board boardText={relevatOutput} clickedCards={clickedCards} setClickedCards={setClickedCards} />
            </div>
          </div>
          <div className="right-half" style={{ backgroundColor: '#2b2b2b' }}>
            <RunCodeButton code={code} setOutput={setOutput} setError={setError} setInputCallback={setInputCallback} />
            <Terminal
              height={'480px'}
              output={output}
              error={error}
              onInput={handleInput}
              waitingForInput={!!inputCallback}
            />
          </div>
        </div>
      </PyodideProvider>
    </>
  );
}

export default Play;
