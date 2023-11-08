import React from 'react';

import BottleIcon from '../assets/svg/tasks/bottle.svg';

export function testsName() {
  return ['ניתן לייצר משולש', 'a+b>c', 'a+c>b', 'c+b>a', 'a+b=c'];
}

// TestsList.jsx
export function getTaskExplanation() {
  return { generateExplanation: (selectedValue) => generateExplanation(selectedValue) };
}
export function generateExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            עבור המצב: <br />
            גודל צלע- A {selectedValue.input.A + ','} <br />B {selectedValue.input.B + ','} צלע
            <br />C{selectedValue.input.C} <br />
            הפלט הנדרש אמור להכיל {selectedValue.ans} <br />
            ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
          </p>
          {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}{' '}
          <RecycleTable initial={100} />
        </div>
      )}
    </>
  );
}

// RunTestButton.jsx
export function getTaskTests() {
  return { generateInputList, processTestsOutputs: (testsOutputs) => processTestsOutputs(testsOutputs) };
}
export function generateInputList() {
  return ['3\n4\n5\n', '3\n3\n10\n', '3\n11\n1\n', '9\n2\n3\n', '5\n5\n5\n'];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['can ', 'cannot', 'cannot ', 'cannot ', 'can '];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      A: parseInt(inputLines[0]),
      B: parseInt(inputLines[1]),
      C: parseInt(inputLines[2]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = output.includes(answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}

// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['קאסטינג', 'תנאים', 'ביטוים בוליאנים'];
}
export function desription() {
  return (
    <>
      <p>
        במתמטיקה, "אי שוויון המשולש" מתאר את העובדה כי אורכה של צלע במשולש בהכרח קטנה מסכום אורכי שתי הצלעות האחרות.
        <br />
        כלומר, בהינתן משולש בעל צלעות a, b ו c בהכרח מתקיים: <br />● a+b&gt;c <br />● b+c&gt;a <br />● a+c&gt;b
        <br /> <br />
        <b>כתבו תכנית המקבלת 3 אורכים של צלעות b, a ו-c, וקובעת האם ניתן לבנות מהן משולש.</b>
        <br />
        בתשובתכם, יש להשתמש במילה 'can' או 'cannot'
      </p>
    </>
  );
}
export function examples() {
  return (
    <>
      <p style={{ textAlign: 'left', dir: 'rtl' }}>
        <code>
          Please enter A side:{' '}
          <span style={{ color: '#003061' }}>
            <b> 11</b>
          </span>
          <br />
          Please enter B side:{' '}
          <span style={{ color: '#003061' }}>
            <b> 4</b>
          </span>
          <br />
          Please enter C side:{' '}
          <span style={{ color: '#003061' }}>
            <b> 7</b>
          </span>
          <br />
          The triangle cannot be constructed
        </code>
      </p>
      <br />
      <p style={{ textAlign: 'right', dir: 'rtl' }}>
        בדוגמה זו לא מתקיים 3+4&gt;7, ולכן לא ניתן לייצר משולש מצלעות אלו
        <br />
        לעומת זאת, אם הקלט היה 3,4,5 כל שלושת התנאים היו מתקיימים וניתן ליצור משולש
      </p>
    </>
  );
}

function RecycleTable({ initial }) {
  const Bottel = ({ index }) => {
    return <img key={`full-${index}`} src={BottleIcon} alt="BottleIcon" style={{ height: '20px' }} />;
  };
  function TableHeader({ title }) {
    return <th style={{ border: '1px solid black', padding: '3px', width: '80px' }}>{title}</th>;
  }

  const rows = [];
  let freshBottles = initial;
  let total = 0;
  let rest = 0;
  while (freshBottles >= 3) {
    total += Math.floor(freshBottles / 3);
    rest = freshBottles % 3;
    rows.push(
      <tr key={`row-${freshBottles}`}>
        <td style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            x {freshBottles}
            <Bottel index={rows.length} />
          </div>
        </td>
        <td style={{ textAlign: 'center' }}>{freshBottles - rest}</td>
        <td style={{ textAlign: 'center' }}>{rest}</td>
        <td style={{ textAlign: 'center' }}>{total}</td>
      </tr>,
    );
    freshBottles = Math.floor(freshBottles / 3) + rest;
  }

  return (
    <table>
      <thead>
        <tr>
          <TableHeader title={'בקבוקים'} />
          <TableHeader title={'נשתמש ב'} />
          <TableHeader title={'נשארו'} />
          <TableHeader title={'סה"כ'} />
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

