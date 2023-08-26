import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Terminal = ({ output, onInput, waitingForInput }) => {
  const [input, setInput] = useState('');
  const [inputIndexes, setInputIndexes] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (waitingForInput) {
      inputRef.current.focus();
    }
  }, [waitingForInput]);

  const handleInput = (event) => {
    if (event.key === 'Enter') {
      onInput(input);
      setInputIndexes((prevInputIndexes) => [...prevInputIndexes, output.split('\n').length]);
      setInput('');
    }
  };

  return (
    <MainDiv>
      <OutputDiv>
        {output
          ? output.split('\n').map((line, index) => (
              <div
                key={index}
                style={{
                  color: inputIndexes.includes(index) ? '#0b7309' : '#cad2d8',
                  fontWeight: inputIndexes.includes(index) ? 'bold' : 'normal',
                }}
              >
                {line}
              </div>
            ))
          : ''}
      </OutputDiv>
      {waitingForInput && (
        <CommandDiv>
          <input
            ref={inputRef}
            type="text"
            style={{ marginLeft: '10px', marginTop: '-10px' }}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleInput}
          />
        </CommandDiv>
      )}
    </MainDiv>
  );
};

export default Terminal;

const MainDiv = styled.div`
  background-color: #2b2b2b;
  color: #cad2d8;
  text-align: left;
  margin-top: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  height: 150px;
  overflow-y: scroll;
  font-family: 'DejaVuSansMono', Courier, monospace;
  width: 100%;
`;

const CommandDiv = styled.div`
  margin-left: 10px;
  background-color: #2b2b2b;
  color: #0b7309;
  margin: 2px;
  font-weight: bold;

  input {
    background-color: #2b2b2b;
    outline: none !important;
  }

  input:focus {
    outline: none !important;
  }
`;

const OutputDiv = styled.div`
  margin-left: 10px;
  font-family: 'DejaVuSansMono', Courier, monospace;
  outline: none !important;
`;
