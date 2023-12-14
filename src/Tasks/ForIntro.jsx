import React from 'react';

export function testsName() {
  return ['משפט רגיל', 'משפט ללא i', 'i יחיד', 'מילה יחידה', 'כולל I גדולה', 'i בסוף ובתחילת מילה'];
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
            במחרוזת
            <p style={{ fontFamily: 'yarden', fontSize: '125%', textAlign: 'center', padding: '7px' }}>
              {selectedValue.input.string.split('').map((char) => {
                if (char === 'i') {
                  return (
                    <span style={{ color: '#003061' }}>
                      <b>{char}</b>
                    </span>
                  );
                } else {
                  return char;
                }
              })}
            </p>{' '}
            האות i מופיעה
            {' ' + selectedValue.ans + ' '}
            פעמים
            <br />
            <br />
            ההדפסה האחרונה בקוד שכתבת:
            <br />
            {selectedValue.output}
          </p>
          {selectedValue.correct ? <p>מכילה את המספר. כל הכבוד!</p> : <p>לא מכילה את המספר. נסו שוב :)</p>}{' '}
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
  return [
    'There is nothing impossible to they who will try\n',
    'My mother always used to say: The older you get, the better you get, unless you’re a banana\n',
    'Be yourself; everyone else is already taken\n',
    'Supercalifragilisticexpialidocious\n',
    'I find that the harder I work, the more luck I seem to have\n',
    'ibi',
  ];
}

export function processTestsOutputs(testsOutputs) {
  const names = testsName();
  const answers = [`5`, '0', '1', '7', '1', '2'];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      string: inputLines[0],
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
  return ['מחרוזות', 'for'];
}
export function desription() {
  return (
    <>
      <p>
        קלטו מחרוזת מהמשתמש והדפיסו כמה פעמים האות i מופיעה בה. <br />
        <u> דגשים:</u>
        <br />
        ●יש לספור את האות הקטנה i בלבד, אות גדולה (I) לא נחשבת
      </p>
    </>
  );
}
export function examples() {
  return (
    <>
      <p style={{ textAlign: 'left', dir: 'rtl' }}>
        <code>
          Enter your string:
          <span style={{ color: '#003061' }}>
            <b> I didn't fail the test. I just found 100 ways to do it wrong</b>
          </span>
          <br /> The letter i appears 3 times
        </code>
        <br />
      </p>
      <br />
    </>
  );
}

const ans = `
input_string = input()
counter = 0
for letter in input_string:
    if letter == 'i':
        counter += 1
print('The letter i appears '+str(counter)+' times')
`;
