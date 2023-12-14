import React from 'react';

export function testsName() {
  return ['מספר משוכלל', 'מספר לא משוכלל', 'מספר שלילי', 'מספר משוכלל גדול', 'מספר שלילי שהחיובי שלו משוכלל'];
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
            המספר {selectedValue.input.number + ' '}
            הוא {selectedValue.ans == 'not' && ' לא '} משוכלל מפני ש{selectedValue.fullAns + ', '}
            לכן הפלט צריך להכיל את המילה {selectedValue.ans} {selectedValue.ans == 'is' && 'ולא להכיל את המילה not'}
            <br />
            <br />
            ההדפסה האחרונה בקוד שכתבת:
            <br />
            {selectedValue.output}
          </p>
          {selectedValue.correct ? <p>מכילה את הפלט הנדרש. כל הכבוד!</p> : <p>לא עונה לדרישות. נסו שוב :)</p>}{' '}
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
  return ['6\n', '24\n', '-54\n', '8128\n', '-6\n'];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = [`is`, 'not', 'not', 'is', 'not'];
  const fullAns = [
    'סכום המחלקים שלו 1,2,3 שווה למספר',
    'סכום המחלקים שלו 1, 2, 3, 4, 6, 8, 12 הוא 36',
    'המספר שלילי',
    'סכום המחלקים שלו 1, 2, 4, 8, 16, 32, 64, 127, 254, 508, 1016, 2032, 4064 שווה למספר',
    'המספר שלילי',
  ];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      number: parseInt(inputLines[0]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = answers[index] == 'is' ? output.includes('is') && !output.includes('not') : output.includes('not');
    const name = names[index];
    return { name, input, output, correct, ans: answers[index], fullAns: fullAns[index] };
  });
}
// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['אופרטורים', 'תנאים', 'for'];
}
export function desription() {
  return (
    <>
      <p>
        מספר משוכלל הוא מספר שלם וחיובי השווה לסכום כל המחלקים השלמים שלו (מלבד המספר עצמו).
        <br />
        דוגמה: המחלקים של 28 הם: 1, 2, 4, 7, 14 . הסכום שלהם הוא 28 ולכן 28 הוא מספר משוכלל.
        <br />
        קלטו מהמשתמש מספר והדפיסו אם הוא משוכלל.
        <br /> <br />
        <u> דגשים:</u>
        <br />
        ●מובטח שיוזן מספר שלם, לא מובטח שיוזן מספר חיובי.
        <br />
        ●בתשובתכם השתמשו במילים: is ו not
      </p>
    </>
  );
}
export function examples() {
  return (
    <>
      <p style={{ textAlign: 'left', dir: 'rtl' }}>
        <code>
          Enter a number:
          <span style={{ color: '#003061' }}>
            <b> 63</b>
          </span>
          <br /> The number is not a perfect number
        </code>
        <br />
        <p style={{ textAlign: 'right', dir: 'rtl' }}>
          המחלקים של 63 הם 1, 3, 7, 9, 21 וסכומם הוא 41. סכום המחלקים שונה מ 63 ולכן 63 אינו מספר משוכלל
        </p>{' '}
        <br />
        <code>
          Enter a number:
          <span style={{ color: '#003061' }}>
            <b> 6</b>
          </span>
          <br /> The number is a perfect number
        </code>
      </p>
      <p>המחלקים של 6 הם 1, 2, 3. סכומם הוא 6 ולכן 6 מספר משוכלל</p>
      <br />
    </>
  );
}

const ans = `
number = int(input('Enter a number:'))
if number < 0:
    print('not')
else:
    divisors_sum = 0
    for i in range (1, number//2+1):
        if number % i ==0:
            divisors_sum += i
    if divisors_sum == number:
        print('is')
    else:
        print('not')
`;
