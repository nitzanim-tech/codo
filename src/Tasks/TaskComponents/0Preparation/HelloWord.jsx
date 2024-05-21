export function getTaskExplanation(selectedValue) {
  return (
    <>
      <div dir="rtl">
        <p>
          הפלט הנדרש הוא {selectedValue.ans} <br />
          ההדפסה האחרונה בקוד שכתבת {"('" + selectedValue.output + "')"}
        </p>
        {selectedValue.correct ? <p>מתאימה לפלט הנדרש. כל הכבוד!</p> : <p>לא מתאימה לפלט. נסו שוב :)</p>}{' '}
      </div>
    </>
  );
}

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
  const answers = ['Hello world', 'לא Sababa Egozim'];
  return testsOutputs.map((testsOutput, index) => {
    const input = null;
    const output = testsOutput.output ? testsOutput.output.replace(/\n/g, '') : '';
    const correct = index == 0 ? output.includes(answers[index]) : !output.includes('Sababa Egozim');
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}