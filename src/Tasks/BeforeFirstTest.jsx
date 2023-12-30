import React from 'react';

export function testsName() {
  return ['הגיש'];
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
  return [' '];
}
export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = ['a'];
  return testsOutputs.map((testsOutput, index) => {
    const input = null;
    const output = testsOutput.output ? testsOutput.output.replace(/\n/g, '') : '';
    const correct = true;
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}

// instruction.jsx
export function getInstructions() {
  return { subjects, desription, examples };
}
export function subjects() {
  return [' '];
}
export function desription() {
  return <></>;
}
export function examples() {
  return <></>;
}
