export function getTaskExplanation(selectedValue) {
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

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
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


const ans = `
input_string = input()
counter = 0
for letter in input_string:
    if letter == 'i':
        counter += 1
print('The letter i appears '+str(counter)+' times')
`;
