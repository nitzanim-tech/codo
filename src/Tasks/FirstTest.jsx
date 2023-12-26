import React from 'react';

export function testsName() {
  return [
    'טסט 1',
    'טסט 2',
    'טסט 3',
    'תרשים זרימה / עברית מבנית',
    'כללי',
    'סטנדרטים ונראות',
    'שימוש בלולאות מתאימות',
    'מיקום הקלט בתא הנכון במטריצה',
  ];
}

// TestsList.jsx
export function getTaskExplanation() {
  return { generateExplanation: (selectedValue) => generateExplanation(selectedValue) };
}
export function generateExplanation(selectedValue) {
  return <></>;
}

// RunTestButton.jsx
export function getTaskTests() {
  return { generateInputList, processTestsOutputs: (testsOutputs) => processTestsOutputs(testsOutputs) };
}
export function generateInputList() {
  return ['1', '2', '3', '4', '5'];
}
export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['Hello world', 'לא Sababa Egozim','a','a','a'];
  return testsOutputs.map((testsOutput, index) => {
    const input = null;
    const output = testsOutput.output ? testsOutput.output.replace(/\n/g, '') : '';
    const correct = index < 3 ? output.includes(answers[index]) : null;
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
  return <></>;
}
export function examples() {
  return <></>;
}
