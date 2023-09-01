import React, { useState, useEffect } from 'react';
import { Divider } from '@nextui-org/react';
import ElevatorTable from './ElevatorVisualTest';
import { Grid } from '@mui/material';

export function testsName() {
  return [
    'אליס קרובה למעלית A',
    'אליס קרובה למעלית B',
    'אליס מעל שתי המעליות',
    'אליס מתחת לשתי המעליות',
    'אליס בדיוק באמצע',
    'קומת חניון',
  ];
}

export function getTaskExplanation() {
  return { generateExplanation: (selectedValue) => generateExplanation(selectedValue) };
}
export function generateExplanation(selectedValue) {
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

// RunTestButton.jsx
export function getTaskTests() {
  return { generateInputList, processTestsOutputs: (testsOutputs) => processTestsOutputs(testsOutputs) };
}

const range = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export function generateInputList() {
  // A, B, P
  const closeToA = [range(6, 8), range(1, 2), range(6, 6)].join('\n'); // A
  const closeToB = [range(1, 2), range(6, 8), range(5, 6)].join('\n'); // B
  const aboveBoth = [range(1, 3), range(4, 5), range(6, 8)].join('\n'); //B
  const underBoth = [range(6, 8), range(4, 5), range(1, 3)].join('\n'); // B
  const randomLocation = range(3, 5);
  const middle = [randomLocation - 2, randomLocation + 2, randomLocation].join('\n'); // A || B
  const underground = [range(-3, 0), range(4, 5), range(-1, -1)].join('\n'); // A

  return [closeToA, closeToB, aboveBoth, underBoth, middle, underground];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['A', 'B', 'B', 'B', 'A או B', 'A'];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      A: parseInt(inputLines[0]),
      B: parseInt(inputLines[1]),
      P: parseInt(inputLines[2]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = index != 4 ? output.includes(answers[index]) : output.includes('A') || output.includes('B');
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}

// instruction.jsx

export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['משתנים', 'ביטויים בוליאניים', 'תנאים'];
}
export function desription() {
  return (
    <>
      <p>
        בבניין רב קומות יש שתי מעליות- מעלית A ומעלית B. המעליות נמצאות בקומות שונות <br />
        כשאדם קורא למעלית, תגיע המעלית הקרובה אליו ביותר . <br />
      </p>
      <Divider />
      <p>
        קלטו מהמשתמש את הקומה של שבה המעלית A נמצאת, ואת הקומה שבה B נמצאת.
        <br />
        לאחר מכן קלטו את הקומה בה אליס נמצאת. הדפיסו את שם המעלית הקרובה ביותר לאליס - A או B. אם שתיהן קרובות באותה
        המידה הדפיסו אחת מהן (שתי הבחירות נכונות)
      </p>
    </>
  );
}
export function examples() {
  return (
    <p style={{ textAlign: 'right', dir: 'rtl' }}>
      נקלוט את המיקום של המעליות ושל אליס מהמשתמש. <br />
      נניח שהוזן: מעלית A נמצאת בקומה 3,
      <br />
      מעלית B נמצאת בקומה 7 ואליס נמצאת בקומה 4. המרחק של אליס מקומה A הוא 1, המרחק שלה ממעלית B הוא 3, לכן נבחר את
      מעלית A <br />
      נדפיס: <code>A</code> <br />
    </p>
  );
}
