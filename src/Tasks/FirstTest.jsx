import React from 'react';

export function testsName() {
  return [
    'טסט 1',
    'טסט 2',
    'טסט 3',
    'טסט 4',
    'טסט 5',
    'טסט 6',
    'טסט 7',
    'טסט 8',
    'טסט 9',
    'טסט 10',

    'חלק 1 - לוגיקה',
    'חלק 1 - סינטקס',
    'חלק 1 - עיצוב וקריאות',
    'חלק 1 - מקרי קצה (בונוס)',

    'חלק 2 - לוגיקה',
    'חלק 2 - סינטקס',
    'חלק 2 - עיצוב וקריאות',
    'חלק 2 - מקרי קצה (בונוס)',

    'חלק 3 - לוגיקה',
    'חלק 3 - סינטקס',
    'חלק 3 - עיצוב וקריאות',
    'חלק 3 - מקרי קצה (בונוס)',

    'חלק 4 - לוגיקה',
    'חלק 4 - סינטקס',
    'חלק 4 - עיצוב וקריאות',
    'חלק 4 - מקרי קצה (בונוס)',

    'חלק 5 - לוגיקה',
    'חלק 5 - סינטקס',
    'חלק 5 - עיצוב וקריאות',
    'חלק 5 - מקרי קצה (בונוס)',

    'שימוש נכון ב',
    'קלט פלט ומשתנים',
    'תנאים',
    'לולאות WHILE',
    'לולאות FOR',
    'רשימות',
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
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
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
