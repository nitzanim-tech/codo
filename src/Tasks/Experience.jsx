import React from 'react';

export function testsName() {
  return ['הודפס Hello world', 'לא הודפס Sababa Egozim'];
}

// TestsList.jsx
export function generateExplanation(selectedValue) {
  return (
    <>
      <div dir="rtl">
        <p>
          נדרש: בלבלבלבל ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"} <br />
        </p>
      </div>
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
    // const output = testsOutput.output.replace(/\n/g, '');
    const output = testsOutput.output;
    console.log(output);
    const correct = index == 0 ? output.includes(answers[index]) : !output.includes('Sababa Egozim');
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
        הדפיסו את המילים 'Hello world' <br />
        רמז - תוכלו לעשות זאת על ידי הקוד: <br />
        <code>print('Hello world')</code>
      </p>
    </>
  );
}
export function examples() {
  return <p style={{ textAlign: 'right', dir: 'rtl' }}>אין דוגמה, תרקדו </p>;
}
