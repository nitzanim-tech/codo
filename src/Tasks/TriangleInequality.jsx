import React from 'react';

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
            עבור הצלעות - {'a: ' + selectedValue.input.A + ', '}
            {'b: ' + selectedValue.input.B + ', '}
            {'c: ' + selectedValue.input.C + ' '}
            <br />
            {selectedValue.fullAns + ', '}
            ולכן
            {selectedValue.ans == 'cannot' && ' לא'} ניתן ליצור משולש.
            <br />
            כלומר, הפלט הנדרש אמור להכיל {selectedValue.ans}.
            <br />
            ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
            {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}
            {/* <Triangle A={30} B={110} C={10} /> */}
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
  return ['3\n4\n5\n', '3\n3\n10\n', '3\n11\n1\n', '9\n2\n3\n', '5\n5\n10\n'];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['can', 'cannot', 'cannot', 'cannot', 'cannot'];
  const fullAns = ['כל התנאים מתקיימים', '3+3 < 10', '3+1 < 11', '2+3 < 9', '5+5 !> 10'];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      A: parseInt(inputLines[0]),
      B: parseInt(inputLines[1]),
      C: parseInt(inputLines[2]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = (answers[index] == 'can' ? !output.includes('cannot'): true) && output.includes(answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index], fullAns: fullAns[index] };
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

const Triangle = ({ A, B, C }) => {
  const triangleStyle = {
    width: 0,
    height: 0,
    borderLeft: `${A}px solid transparent`,
    borderRight: `${B}px solid transparent`,
    borderBottom: `${C}px solid #f00`, // Adjust the color as needed
  };

  return <div style={triangleStyle}></div>;
};
