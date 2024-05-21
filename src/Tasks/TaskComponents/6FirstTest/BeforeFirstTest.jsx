export function getTaskExplanation(selectedValue) {
  return <></>;
}

export function processTestsOutputs({ taskTests, testsOutputs }) {
  const names = taskTests.map((test) => test.name);
  return testsOutputs.map((testsOutput, index) => {
    return { name: names[index], output: testsOutput.output || '0', correct: true };
  });
}
