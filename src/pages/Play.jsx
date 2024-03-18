import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

import NavBar from '../components/NavBar/NavigateBar';
import { Grid } from '@mui/material';
import { PyodideProvider } from '../components/IDE/PyodideProvider';
// import { useFirebase } from '../util/FirebaseProvider';
// import getTaskById from '../requests/tasks/getTaskById';
import './Submit.css';
import Board from '../Games/SET/Board';
import Terminal from '../components/IDE/Terminal';
import RunCodeButton from '../components/IDE/RunCodeButton';

function Play() {
  const code=localStorage.getItem('code');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [inputCallback, setInputCallback] = useState('');

  const [relevatOutput, setRelevatOutput] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);

  const handleInput = (value) => {
    if (inputCallback) {
      // setInputValue('');
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
    for (let i = lines.length-1; i >= 0; i--) {
      if (['color', 'shape', 'shading', 'striped'].some((word) => lines[i].includes(word))) {
        boardLines.push(lines[i]);
      } else if (boardLines.length != 0) break;
    }
  return boardLines.reverse().join('\n') || '';
  };

  return (
    <>
      <NavBar />
      <PyodideProvider>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={1} columns={3} rows={1} style={{ padding: '1.5%' }}>
            <Grid item style={{ width: '50%' }}>
              <h2>
                <b>שלום</b>
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Board boardText={relevatOutput} clickedCards={clickedCards} setClickedCards={setClickedCards} />
              </div>
            </Grid>
            <Grid item style={{ width: '50%' }}>
              <RunCodeButton
                code={code}
                setOutput={setOutput}
                setError={setError}
                setInputCallback={setInputCallback}
              />
              <Terminal
                height={'480px'}
                output={output}
                error={error}
                onInput={handleInput}
                waitingForInput={!!inputCallback}
              />
            </Grid>
          </Grid>
        </div>
      </PyodideProvider>
    </>
  );
}

export default Play;
