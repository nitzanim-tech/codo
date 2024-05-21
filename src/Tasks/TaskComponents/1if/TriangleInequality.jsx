export function getTaskExplanation(selectedValue) {
  return (
    <>
      {selectedValue.input && (
        <div dir="rtl">
          <p>
            עבור הצלעות - {'a: ' + selectedValue.input.A + ', '}
            {'b: ' + selectedValue.input.B + ', '}
            {'c: ' + selectedValue.input.C + ' '}
            <br />
            {selectedValue.fullAns + ', '}
            ולכן
            {selectedValue.ans == 'cannot' && ' לא'} ניתן ליצור משולש.
            <br />
            כלומר, הפלט הנדרש אמור להכיל {selectedValue.ans}.
            <br />
            ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
            {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}
            {/* <Triangle A={30} B={110} C={10} /> */}
          </p>
        </div>
      )}
    </>
  );
}

const Triangle = ({ A, B, C }) => {
  const triangleStyle = {
    width: 0,
    height: 0,
    borderLeft: `${A}px solid transparent`,
    borderRight: `${B}px solid transparent`,
    borderBottom: `${C}px solid #f00`, // Adjust the color as needed
  };

  return <div style={triangleStyle}></div>;
};

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
  const answers = ['can', 'cannot', 'cannot', 'cannot', 'cannot'];
  const fullAns = ['כל התנאים מתקיימים', '3+3 < 10', '3+1 < 11', '2+3 < 9', '5+5 !> 10'];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      A: parseInt(inputLines[0]),
      B: parseInt(inputLines[1]),
      C: parseInt(inputLines[2]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = (answers[index] == 'can' ? !output.includes('cannot') : true) && output.includes(answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index], fullAns: fullAns[index] };
  });
}

