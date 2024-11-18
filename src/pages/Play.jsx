import React, { useEffect, useState } from 'react';

import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
import './Play.css';
import Board from '../Games/SET/Board';
import Terminal from '../components/IDE/Terminal';
import RunCodeButton from '../components/IDE/RunCodeButton';
import woodBackground from '../assets/svg/wood.svg';
import { useParams } from 'react-router-dom';

function Play() {
  const { task } = useParams();
  const code = localStorage.getItem(`${task}-code`) + '\nmain()';

  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [inputCallback, setInputCallback] = useState('');
  const [relevatOutput, setRelevatOutput] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [lastMassage, setLastMassage] = useState('');

  const handleInput = (value) => {
    if (inputCallback) {
      // setLastMassage('');
      inputCallback(value);
      setInputCallback(null);
    }
  };

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
    <>
      <PyodideProvider>
        <div className="container">
          <div className="left-half" style={{ backgroundImage: `url(${woodBackground})` }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <Board boardText={relevatOutput} clickedCards={clickedCards} setClickedCards={setClickedCards} />
            </div>

            <span style={{ color: '#6B240C', fontFamily: 'Courier', fontSize: '40px' }}>
              <b>{lastMassage}</b>
            </span>
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
