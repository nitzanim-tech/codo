import React, { useEffect, useState } from 'react';

import { PyodideProvider } from '../components/IDE/PyodideProvider';
import './Play.css';
import Terminal from '../components/IDE/Terminal';
import RunCodeButton from '../components/IDE/RunCodeButton';
import { useParams } from 'react-router-dom';
import SetGame from '../Games/SET/SetGame';

function Play() {
  const { task } = useParams();
  const code = localStorage.getItem(`${task}-code`) + '\nmain()';
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [inputCallback, setInputCallback] = useState('');

  const handleInput = (value) => {
    if (inputCallback) {
      inputCallback(value);
      setInputCallback(null);
    }
  };

  return (
    <>
      <PyodideProvider>
        <div className="container">
          {(task == '26846eef85c3' || task == '29a850aeee74') && (
            <SetGame output={output} inputCallback={inputCallback} handleInput={handleInput} />
          )}

          <div className="right-half" style={{ backgroundColor: '#2b2b2b' }}>
            <RunCodeButton code={code} setOutput={setOutput} setError={setError} setInputCallback={setInputCallback} />
            <Terminal
              height={'80vh'}
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
