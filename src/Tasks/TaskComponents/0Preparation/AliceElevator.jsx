import React, { useState, useEffect } from 'react';
import { Divider } from '@nextui-org/react';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import elevatorImg from '../../../assets/img/elevator/elevator.png';
import childImg from '../../../assets/img/elevator/child.png';

const ElevatorTable = ({ test }) => {
  const input = test.input;
  const minRow = Math.min(input.A, input.B, input.P) - 1;
  const maxRow = Math.max(input.A, input.B, input.P) + 1;
  const rows = Array.from({ length: Math.abs(maxRow - minRow) + 1 }, (_, i) => maxRow - i);
  const columns = Array.from({ length: 4 }, (_, i) => i);

  return (
    <Table>
      {rows.map((row) => (
        <Row key={row}>
          {columns.map((column) => (
            <Cell key={column} column={column}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {column === 0 && row.toString()}
              </div>
              {column === 1 && row === input.A && (
                <>
                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ElevatorImg src={elevatorImg} alt="elevator" />
                    <Letter glow={test.ans === 'A'}>A </Letter>
                  </div>
                </>
              )}
              {column === 3 && row === input.B && (
                <>
                  <div style={{ position: 'relative' }}>
                    <ElevatorImg src={elevatorImg} alt="elevator" />
                    <Letter glow={test.ans === 'B'}>B</Letter>
                  </div>
                </>
              )}
              {column === 2 && row === input.P && (
                <>
                  <div style={{ position: 'relative' }}>
                    <img src={childImg} alt="child" style={{ width: '100%' }} />
                  </div>
                </>
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </Table>
  );
};

export default ElevatorTable;

const Table = styled.div`
  display: table;
  border-collapse: collapse;
  width: 100%;
`;
const Cell = styled.div`
  display: table-cell;
  border-left: ${(props) => (props.column === 0 || props.column === 3 ? '1px solid black' : 'none')};
  border-right: ${(props) => (props.column === 0 ? '1px solid black' : 'none')};
  width: 25%;
  height: 35px;
`;

const Row = styled.div`
  display: table-row;

  &:first-child ${Cell} {
    border-top: 1px solid black;
  }

  &:last-child ${Cell} {
    border-bottom: 1px solid black;
  }
`;

const Letter = styled.div`
  position: absolute;
  top: 50%;
  left: 43%;
  transform: translate(-50%, -50%);
  color: ${(props) => (props.glow ? 'rgba(0, 70, 0, 1.0)' : 'balck')};
  font-weight: bold;
  text-shadow: ${(props) => (props.glow ? '0 0px 5px rgba(0, 200, 100, 1.0)' : 'none')};
  z-index: 1;
`;

const ElevatorImg = styled.img`
  width: 100%;
`;

export function getTaskExplanation(selectedValue) {
  return (
    <Grid container spacing={2} columns={3} rows={1}>
      <Grid item style={{ width: '30%' }}>
        <ElevatorTable test={selectedValue} />
      </Grid>
      <Grid item style={{ width: '70%' }}>
        {selectedValue.input && (
          <div dir="rtl">
            <p>
              עבור המצב: <br />
              מעלית A בקומה {selectedValue.input.A + ','} <br />
              מעלית B בקומה {selectedValue.input.B + ','} <br />
              אליס ובוב בקומה {selectedValue.input.P} <br />
            </p>
            <Divider />
            <p>
              המרחק בין אליס ובוב למעלית A הוא
              {' ' + Math.abs(selectedValue.input.A - selectedValue.input.P) + ','} <br />
              המרחק בין אליס ובוב למעלית B הוא
              {' ' + Math.abs(selectedValue.input.B - selectedValue.input.P) + ','} <br />
              לכן המעלית שתבחר היא {selectedValue.ans} <br />
            </p>
            <Divider />
            <p>
              ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"} <br />
            </p>
            {selectedValue.correct ? (
              <p>מכילה את התשובה. כל הכבוד!</p>
            ) : (
              <p>
                לא מכילה את התשובה הנכונה.
                <br /> נסו שוב :)
              </p>
            )}
          </div>
        )}
      </Grid>
    </Grid>
  );
}


export function processTestsOutputs({ taskTests, testsOutputs }) {
  const isCorect = (output, ans) => {
    if (ans == 'A או B') return output.includes('A') || output.includes('B');
    if (ans == 'A') return output.includes('A') && !output.includes('B');
    return output.includes('B') && !output.includes('A ');
  };
  const names = taskTests.map((test) => test.name);
  const answers = ['A', 'B', 'B', 'B', 'A או B', 'A'];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = { A: parseInt(inputLines[0]), B: parseInt(inputLines[1]), P: parseInt(inputLines[2]) };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = isCorect(output, answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}