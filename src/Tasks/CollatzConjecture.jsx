import React from 'react';

export function testsName() {
  return [
    'המספר הנתון אי זוגי (1)',
    'המספר הנתון אי זוגי (2)',
    'המספר הנתון זוגי (1)',
    'המספר הנתון זוגי (2)',
    'המספר הנתון הוא 1',
  ];
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
            עבור המספר: {selectedValue.input.number + ','}
            <br />
            הסדרה הינה {selectedValue.fullAns + ', '}
            ולכן הסכום הוא {selectedValue.ans}
            <br />
            ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
          </p>
          {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}{' '}
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
  return ['3', '9', '60', '4', '1'];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['49', '339', '784', '7', '1'];
  const fullAns = [
    '3 10 5 16 8 4 2 1',
    '9 28 14 7 22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1',
    '60 30 15 46 23 70 35 106 53 160 80 40 20 10 5 16 8 4 2 1',
    '4 2 1',
    '1',
  ];

  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      number: parseInt(inputLines[0]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = output.includes(answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index], fullAns: fullAns[index] };
  });
}
// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['קאסטינג', 'תנאים', 'ביטוים בוליאנים', 'אופרטורים'];
}
export function desription() {
  return (
    <>
      <p>
        השערת קולץ היא תיאוריה שעד היום טובי המתמטיקאים לא הצליחו להוכיח אותה: <br />
        השערת קולץ אומרת שאם נתחיל ממספר שלם כלשהו ונבצע עליו את הפעולות הבאות שוב ושוב:
        <br />
        ● אם המספר זוגי - נחלק אותו ב-2 <br />
        ● אם המספר אי-זוגי - נכפיל אותו ב-3 ונוסיף 1 <br />
        אז בסופו של דבר נגיע תמיד למספר 1.
        <br />
        <br />
        <b>
          המשימה: קלטו מספר שלם מהמשתמש, בצעו את תהליך קולץ החל מהמספר שהתקבל מהמשתמש עד להגעה ל-1, והדפיסו את כל
          המספרים שנוצרו בתהליך
          <br />
          לאחר מכן הדפיסו את <u>סכום</u> כל המספרים שנוצרו בתהליך{' '}
        </b>
        <br />
        ניתן להניח שהמשתמש יזין מספר שלם חיובי
      </p>
    </>
  );
}
export function examples() {
  return (
    <>
      <p style={{ textAlign: 'left', dir: 'rtl' }}>
        <code>
          Please enter a number:
          <b>
            <span style={{ color: '#003061' }}> 11</span>
          </b>
          <br />
          34 <br />
          17 <br /> 52 <br /> 26 <br /> 13 <br /> 40 <br /> 20 <br /> 10 <br /> 5<br /> 16 <br /> 8<br /> 4<br /> 2
          <br /> 1<br /> The Collatz sum is 259
        </code>
      </p>
      <br />

      <p style={{ textAlign: 'right', dir: 'rtl' }}>
        נשים לב שעבור מספר אי זוגי (לדוגמה - 11), נכפיל ב3 ונוסיף אחד. עבור מספר זוגי (לדוגמה 34) נחלק ב2. <br />
        בסופו של דבר הגענו למספר 1<br />
        לאחר שחישבנו את הסכום של המספרים (כולל 11) הגענו למספר 259
      </p>
    </>
  );
}
