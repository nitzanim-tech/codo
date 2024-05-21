export function getTaskExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            עבור המספר: {selectedValue.input.number + ','}
            <br />
            הסדרה הינה {selectedValue.fullAns + ', '}
            ולכן הסכום הוא {selectedValue.ans}
            <br />
            ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
          </p>
          {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}{' '}
        </div>
      )}
    </>
  );
}

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
  const answers = ['49', '339', '784', '7', '1'];
  const fullAns = [
    '3 10 5 16 8 4 2 1',
    '9 28 14 7 22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1',
    '60 30 15 46 23 70 35 106 53 160 80 40 20 10 5 16 8 4 2 1',
    '4 2 1',
    '1',
  ];

  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      number: parseInt(inputLines[0]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = output.includes(answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index], fullAns: fullAns[index] };
  });
}
