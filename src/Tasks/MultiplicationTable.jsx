import React from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

export function testsName() {
  return ['כמו בדוגמה', 'מספר אחר', '1', 'מספר שלילי'];
}

// TestsList.jsx
export function getTaskExplanation() {
  return { generateExplanation: (selectedValue) => generateExplanation(selectedValue) };
}

function CompareLinesTable({ size, output }) {
  const multiTable = generateMultiTable(size);
  const rows = multiTable.map((value, index) => {
    const expected = value.toString();
    const actual = output[index] || '';
    const result = actual.includes(expected) ? (
      <CheckCircleRoundedIcon sx={{ color: '#005395' }} />
    ) : (
      <CancelRoundedIcon sx={{ color: '#BF1E2E' }} />
    );
    return (
      <tr key={index}>
        <td
          style={{
            marginLeft: '20px',
            textAlign: 'center',
          }}
        >
          {result}
        </td>{' '}
        <td>{index + 2}</td>
        <td>{actual}</td>
        <td>{value}</td>
      </tr>
    );
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table style={{ fontFamily: 'yarden', fontSize: '100%', textAlign: 'center', padding: '7px' }}>
        <thead>
          <tr>
            <th> </th>
            <th>מס' שורה |</th>
            <th>פלט הקוד |</th>
            <th>פלט רצוי </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>{' '}
    </div>
  );
}

export function generateExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          {selectedValue.input.size > 0 ? (
            <>
              <p>
                נבדוק את הפלט שורה שורה:
                <br />
              </p>
              <CompareLinesTable size={selectedValue.input.size} output={selectedValue.output} />
            </>
          ) : (
            <p>המספר שלילי והפלט של הקוד שכתבת: {selectedValue.output.join(' ')} אמור להכיל את המילה 'error'</p>
          )}
          <br />
          {selectedValue.correct ? <p>ולכן תשובך נכונה. כל הכבוד!</p> : <p>ולכן תשובתך לא נכונה. נסו שוב :)</p>}{' '}
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
  return ['3', '4', '1', '-1'];
}

const generateMultiTable = (size) => {
  const multiTable = [];
  for (let i = 1; i < +size + 1; i++) {
    for (let j = 1; j < +size + 1; j++) {
      multiTable.push(i * j);
    }
  }
  return multiTable;
};

function checkAns({ outputLines, size }) {
  if (size < 0) return outputLines.join('').toLowerCase().includes('error');
  const multiTable = generateMultiTable(size);
  for (let i = 0; i < Math.min(outputLines.length, multiTable.length); i++) {
    if (!outputLines[i].includes(multiTable[i])) {
      return false;
    }
  }
  return true;
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      size: inputLines[0],
    };
    const outputLines = testsOutput.output.split('\n').slice(1);
    const output = outputLines;
    const correct = checkAns({ outputLines, size: input.size });
    const name = names[index];
    return { name, input, output, correct, ans: '' };
  });
}
// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['לולאה מקוננת', 'for'];
}
export function desription() {
  return (
    <>
      <p>
        קלטו מהמשתמש מספר. הדפיסו את לוח הכפל בגודל אותו מספר שקלטתם <br />
        <u> דגשים:</u>
        <br />
        ●יש להדפיס כל מספר בשורה נפרדת (ראו דוגמה)
        <br />
        ●מובטח שתקבלו מספר שלם, אך עליכם לוודא שהמספר חיובי. אם לא הדפיסו הודעה מתאימה הכוללת את המילה 'error'
      </p>
    </>
  );
}
export function examples() {
  return (
    <>
      <p style={{ textAlign: 'left', dir: 'rtl' }}>
        <code>
          Enter borad size:{' '}
          <span style={{ color: '#003061' }}>
            <b> 3</b>
          </span>{' '}
          <br />
          1X1=1
          <br />
          1X2=2
          <br />
          1X3=3
          <br />
          2X1=2
          <br />
          2X2=4
          <br />
          2X3=6
          <br />
          3X1=3
          <br />
          3X2=6
          <br />
          3X3=9
          <br />
        </code>
        <br />
      </p>
      <br />
    </>
  );
}

const ans = `
size = int(input('Enter borad size: '))
for i in range(1,size+1):
    for j in range(1,size+1):
        print(str(i)+'X'+str(j)+'='+str(i*j))
`;
