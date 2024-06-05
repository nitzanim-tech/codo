import React, { useEffect } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import { usePyodide } from './PyodideProvider';
import { cleanTracebackTest } from '../../util/cleanTraceback';
import { getProcessOutputs } from '../../Tasks/TaskComponents';
import addSession from '../../requests/sessions/addSession';
import { useFirebase } from '../../util/FirebaseProvider';
import { useParams } from 'react-router-dom';

export default function RunTestButton({ code, setTestsOutputs, runTests, taskObject, buttonElement }) {
  const pyodide = usePyodide();
  const { app, userData } = useFirebase();
  const { index } = useParams();

  useEffect(() => {
    if (runTests) handleClick();
  }, [runTests]);

  async function runPython({ code, input }) {
    try {
      pyodide.runPython('import io, sys');
      pyodide.runPython(`sys.stdin = io.StringIO("${input}")`);
      pyodide.runPython('sys.stdout = io.StringIO()');
      pyodide.runPython(`from builtins import print`);
      pyodide.runPython(`def input(prompt=None) {
    import builtins
    if prompt:
        print(prompt)
    return builtins.input()
  }`);
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
      } catch {
        break;
      }
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
      const testsOutput = getProcessOutputs({
        task: taskObject.id,
        taskTests: taskObject.tests,
        testsOutputs: userTestOutputs,
      });

      setTestsOutputs(testsOutput);
      const pass = testsOutput.map((output) => output.correct);
      const time = new Date().toISOString();
      const session = { pass, time };
      addSession({ app, userId: userData.id, task: index, session });
    }
  }

  const defaultButton = (
    <Button radius="full" isIconOnly variant="faded" isDisabled={!pyodide} onClick={handleClick}>
      <RuleRoundedIcon />
    </Button>
  );

  return (
    <Tooltip content={'בדוק'} placement={'bottom'}>
      {React.cloneElement(buttonElement || defaultButton, {
        isDisabled: !pyodide,
        onClick: handleClick,
      })}
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
