import React, { useEffect, useState } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { usePyodide } from './PyodideProvider';
import { cleanTracebackTest } from '../../util/cleanTraceback';
import { getProcessOutputs } from '../../Tasks/TaskComponents';
import { useFirebase } from '../../util/FirebaseProvider';
import { useParams } from 'react-router-dom';
import { RunTestsIcon } from './Icons';
import { updateLocalStorageLogs } from './sessionsHandler';

export default function RunTestButton({
  code,
  setTestsOutputs,
  runTests,
  taskObject,
  buttonElement,
  logSession,
  tooltipText,
  tooltipPlacement,
  showTests,
}) {
  const pyodide = usePyodide();
  const { task } = useParams();
  if (logSession == null) {
    logSession = true;
  }

  tooltipText ||= 'בדוק';
  tooltipPlacement ||= 'bottom';

  useEffect(() => {
    if (runTests && pyodide) handleClick();
  }, [runTests, pyodide]);

  async function runPython({ code, input = '' }) {
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
          const output = await runPython({ code: codeToRun, input: test.input?.replace(/\n/g, '\\n') || '' });
          testsOutputs.push({ input: test.input, output });
        }
      } catch (error) {
        console.error('Error:', error);
        break;
      }
    }
    return testsOutputs;
  }

  async function handleClick() {
    const userTestOutputs = await runTest({ code, tests: taskObject.tests });
    const isTaskDefault = taskObject.isDefault;
    let testsOutput;
    if (isTaskDefault) {
      const ansTestOutputs = await runTest({ code: taskObject.code, tests: taskObject.tests });
      testsOutput = processDefaultTestsOutputs({ taskTests: taskObject.tests, userTestOutputs, ansTestOutputs });
    } else {
      testsOutput = getProcessOutputs({
        task: taskObject.id,
        taskTests: taskObject.tests,
        testsOutputs: userTestOutputs,
      });
    }
    setTestsOutputs(testsOutput);

    if (!taskObject.inDev && logSession) {
      const pass = testsOutput.map((output) => output.correct);
      const time = new Date().toISOString();
      const session = { type: 'run', time, pass };
      updateLocalStorageLogs(session, task);
    }
  }

  const defaultButton = (
    <Button
      radius="full"
      isIconOnly
      variant="faded"
      isDisabled={!pyodide}
      onClick={handleClick}
      style={{ border: 'none' }}
    >
      <RunTestsIcon />
    </Button>
  );

  return (
    <>
      <Tooltip content={tooltipText} placement={tooltipPlacement}>
        {React.cloneElement(buttonElement || defaultButton, {
          isDisabled: !pyodide || !showTests,
          onClick: handleClick,
        })}
      </Tooltip>
    </>
  );
}

function processDefaultTestsOutputs({ taskTests, userTestOutputs, ansTestOutputs }) {
  const names = taskTests.map((test) => test.name);

  return userTestOutputs.map((testsOutput, index) => {
    const userOutputNoSpaces = testsOutput.output.replace(/\s/g, '');
    const ansOutputNoSpaces = ansTestOutputs[index].output.replace(/\s/g, '');
    const correct = userOutputNoSpaces === ansOutputNoSpaces;
    const name = names[index];
    return { name, input: testsOutput.input, output: testsOutput.output, ans: ansTestOutputs[index].output, correct };
  });
}
