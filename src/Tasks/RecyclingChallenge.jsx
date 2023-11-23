import React from 'react';
import BottleIcon from '../assets/svg/tasks/bottle.svg';

export function testsName() {
  return ['3 בקבוקים', '12 בקבוקים', '100 בקבוקים', '2048 בקבוקים', 'פחות מ3 בקבוקים'];
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
            <br />
            עבור הקלט - {selectedValue.input.number} בקבוקים,
            <br />
            הפתרון הוא {selectedValue.ans} <br />
            ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
          </p>
          {selectedValue.correct ? <p>מכילה את הפתרון. כל הכבוד!</p> : <p>איננה מכילה את הפתרון. נסו שוב :)</p>} <br />
          <p>
            תוכלו להיעזר באלגוריתם הבא: אם ניתן, נשתמש במספר בקבוקים המתחלק ב3, ונוסיף לבקבוקים החדשים שייצרנו מהם את
            הבקבוקים שלא השתמשנו בהם עדיין (השארית)
          </p>
          <RecycleTable initial={selectedValue.input.number} />
          <p>
            <br />
            כלומר, סה"כ (שומשו עד כה + הבקבוקים שטרם שומשו) {selectedValue.ans} <br />
          </p>
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
  return ['3\n', '12\n', '100\n', '2048\n', '1\n'];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['4', '17', '149', '3071', '1'];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      number: parseInt(inputLines[0]),
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
  return ['while', 'אלגוריתמיקה'];
}
export function desription() {
  return (
    <>
      <p>
        בחנות 'לחם חביתה' (בנתניה) מוכרים בין השאר בקבוקי שתיה. איכות הסביבה חשובה לצוות החנות ולכן הם פועלים למחזר את
        הבקבוקים הריקים.
        <br />
        מכל שלושה בקבוקים ריקים, צוות החנות מייצר בקבוק אחד חדש.
        <br /> <br />
        <b>
          כתבו תוכנית המקבלת כקלט את מספר הבקבוקים המלאים, ומחשבת מהו המספר הכולל של הבקבוקים שניתן להשתמש בהם, לאחר
          מחזור הבקבוקים הריקים.
        </b>
        <br />
        בתשובתכם, יש להדפיס מספר
      </p>
    </>
  );
}
export function examples() {
  return (
    <>
      <p style={{ textAlign: 'left', dir: 'rtl' }}>
        <code>
          Enter the quantity of new bottles:{' '}
          <span style={{ color: '#003061' }}>
            <b> 12</b>
          </span>
          <br />
          You can use 17 bottles{' '}
        </code>
      </p>
      <br />
      <p style={{ textAlign: 'right', dir: 'rtl' }}>
        המשתמש הזין שקיימים 12 בקבוקים חדשים, נשתמש בהם.
        <br />
        כרגע יש לנו 12 בקבוקים משומשים. מהם נוכל לייצר 12/3=4 בקבוקים חדשים, נשתמש גם בהם.
        <br />
        כרגע יש לנו 4 בקבוקים משומשים שמהם נוכל ליצור עוד בקבוק אחד.
        <br />
        כלומר סה"כ השתמשנו ב12+4+1=17 בקבוקים.
        <br />
        <br />
        ודאו שהבנתם - בכמה בקבוקים סה"כ נוכל להשתמש מ 100 בקבוקים חדשים?
        <br /> <b>תשובה</b> (סמנו את הטקסט):
        <span style={{ color: 'white' }}>
          <b> 149</b>
        </span>
      </p>
    </>
  );
}

function RecycleTable({ initial }) {
  const Bottle = ({ index }) => {
    return <img key={`full-${index}`} src={BottleIcon} alt="BottleIcon" style={{ height: '20px' }} />;
  };
  function TableHeader({ title }) {
    return <th style={{ border: '1px solid black', padding: '3px', width: '150px' }}>{title}</th>;
  }

  const rows = [];
  let freshBottles = initial;
  let total = 0;
  let rest = 0;
  while (freshBottles > 0) {
    rest = freshBottles >= 3 ? freshBottles % 3 : 0;
    total += freshBottles - rest;
    rows.push(
      <tr key={`row-${freshBottles}`}>
        <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            x {freshBottles}
            <Bottle index={rows.length} />
          </div>
        </td>
        <td style={{ textAlign: 'center' }}>{freshBottles - rest}</td>
        <td style={{ textAlign: 'center' }}>{rest}</td>
        <td style={{ textAlign: 'center' }}>{Math.floor(freshBottles / 3)}</td>
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
          <TableHeader title={'בקבוקים חדשים שיוצרו'} />
          <TableHeader title={'סה"כ שומשו'} />
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

