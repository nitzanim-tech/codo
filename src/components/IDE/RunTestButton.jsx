import { useEffect, useState } from 'react';
import { Button, Tooltip } from "@nextui-org/react";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import { usePyodide } from './PyodideProvider';
import { cleanTracebackTest } from '../../util/cleanTraceback';
import { cleanTracebackTest } from '../../util/cleanTraceback';

export default function RunTestButton({ code, setTestsOutputs, runTests, taskObject }) {
  const pyodide = usePyodide();
export default function RunTestButton({ code, setTestsOutputs, runTests, taskObject }) {
  const pyodide = usePyodide();

  useEffect(() => {
    if (runTests) handleClick();
  }, [runTests]);
  useEffect(() => {
    if (runTests) handleClick();
  }, [runTests]);

  async function runPython({ code, input }) {
    try {
      pyodide.runPython('import io, sys');
      pyodide.runPython(`sys.stdin = io.StringIO("${input}")`);
      pyodide.runPython('sys.stdout = io.StringIO()');
      pyodide.runPython(`from builtins import print`);
      pyodide.runPython(`def input(prompt=None):
    import builtins
    if prompt:
        print(prompt)
    return builtins.input()
  `);
      pyodide.runPython(code);
      pyodide.runPython(code);
      let output = pyodide.runPython('sys.stdout.getvalue()');
      return output;
    } catch (error) {
      const traceback = cleanTracebackTest(error);
      return traceback;
    }
  }

async function runTest({ code, tests }) {
  let testsOutputs = [];
  for (const test of tests) {
    const codeToRun = code + '\n' + (test.runningCode || '');
    try {
      if (!test.isHidden) {
        const output = await runPython({ code: codeToRun, input: test.input.replace(/\n/g, '\\n') });
        testsOutputs.push({ input: test.input, output });
      }
    } catch {break}
  }
  return testsOutputs;
}

async function handleClick() {
  const userTestOutputs = await runTest({ code, tests: taskObject.tests });
  const isTaskDefault = Boolean(taskObject.code);
  if (isTaskDefault) {
    const ansTestOutputs = await runTest({ code: taskObject.code, tests: taskObject.tests });
    const testsOutput = processTestsOutputs({ taskTests: taskObject.tests, userTestOutputs, ansTestOutputs });
    setTestsOutputs(testsOutput);
  } else {
    const codeFromDB = taskObject.processTestsCode;
    let processOutput = new Function('parameters', codeFromDB);
    let parameters = {
      taskTests: taskObject.tests,
      testsOutputs: userTestOutputs,
    };
    const testsOutput = processOutput(parameters);
async function handleClick() {
  const userTestOutputs = await runTest({ code, tests: taskObject.tests });
  const isTaskDefault = Boolean(taskObject.code);
  if (isTaskDefault) {
    const ansTestOutputs = await runTest({ code: taskObject.code, tests: taskObject.tests });
    const testsOutput = processTestsOutputs({ taskTests: taskObject.tests, userTestOutputs, ansTestOutputs });
    setTestsOutputs(testsOutput);
  } else {
    const codeFromDB = taskObject.processTestsCode;
    let processOutput = new Function('parameters', codeFromDB);
    let parameters = {
      taskTests: taskObject.tests,
      testsOutputs: userTestOutputs,
    };
    const testsOutput = processOutput(parameters);
    setTestsOutputs(testsOutput);
  }
}
  }
}

  return (
    <Tooltip content={'בדוק'} placement={'bottom'}>
      <Button radius="full" isIconOnly variant="faded" isDisabled={!pyodide} onClick={() => handleClick()}>
        <RuleRoundedIcon />
      </Button>
    </Tooltip>
  );
}

function processTestsOutputs({ taskTests, userTestOutputs, ansTestOutputs }) {
  const names = taskTests.map((test) => test.name);

  return userTestOutputs.map((testsOutput, index) => {
    const userOutputNoSpaces = testsOutput.output.replace(/\s/g, '');
    const ansOutputNoSpaces = ansTestOutputs[index].output.replace(/\s/g, '');
    const correct = userOutputNoSpaces === ansOutputNoSpaces;
    const name = names[index];
    return { name, input: testsOutput.input, output: testsOutput.output, ans: ansTestOutputs[index].output, correct };
  });
}
function processTestsOutputs({ taskTests, userTestOutputs, ansTestOutputs }) {
  const names = taskTests.map((test) => test.name);

  return userTestOutputs.map((testsOutput, index) => {
    const userOutputNoSpaces = testsOutput.output.replace(/\s/g, '');
    const ansOutputNoSpaces = ansTestOutputs[index].output.replace(/\s/g, '');
    const correct = userOutputNoSpaces === ansOutputNoSpaces;
    const name = names[index];
    return { name, input: testsOutput.input, output: testsOutput.output, ans: ansTestOutputs[index].output, correct };
  });
}
