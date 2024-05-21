export function getTaskExplanation(selectedValue) {
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


export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
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
