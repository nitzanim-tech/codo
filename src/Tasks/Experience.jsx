import React from 'react';

export function testsName() {
  return ['הודפס Hello world', 'לא הודפס Sababa Egozim'];
}

// TestsList.jsx
export function generateExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            נדרש: בלבלבלבל ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"} <br />
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
    </>
  );
}

// RunTestButton.jsx
export function getTaskTests(testsOutputs) {
  return { generateInputList, processTestsOutputs: () => processTestsOutputs(testsOutputs) };
}
export function generateInputList() {
  return ['', ''];
}
export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['Hello world', 'לא Sababa Egozim'];
  return testsOutputs.map((testsOutput, index) => {
    const input = null;
    const output = testsOutput.output.replace(/\n/g, '');
    const correct = index == 1 ? output.includes(answers[index]) : !output.includes('Sababa Egozim');
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}

// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return ['הדפסה'];
}
export function desription() {
  return (
    <>
      <p>
        בלבבלבלבלבלבל <code>print('Hello world')</code>{' '}
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
