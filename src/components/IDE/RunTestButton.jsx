import { useEffect, useState } from 'react';
import { Button, Tooltip } from "@nextui-org/react";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import { usePyodide } from './PyodideProvider';
import {getTaskTests} from "../../Tasks/TaskIndex"
import { cleanTracebackTest } from '../../util/cleanTraceback';

export default function RunTestButton({ code, setTestsOutputs, runTests, taskTests }) {
  const [rowTestsOutputs, setRowTestsOutputs] = useState([]);
  // const [taskTestFunctions, setTaskTestFunctions] = useState(getTaskTests(task));

  // useEffect(() => {
  //   setTaskTestFunctions(getTaskTests(task));
  // }, [task, rowTestsOutputs]);

  useEffect(() => {
    if (runTests) handleClick();
  }, [runTests]);

  const pyodide = usePyodide();

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
      let output = pyodide.runPython('sys.stdout.getvalue()');
      return output;
    } catch (error) {
      const traceback = cleanTracebackTest(error);
      return traceback;
    }
  }

  async function runTest({ code, inputList }) {
    let testsOutputs = [];
    for (const input of inputList) {
      const output = await runPython({ code, input: input.replace(/\n/g, '\\n') });
      testsOutputs.push({ input, output });
    }
    return testsOutputs;
  }

  async function handleClick() {
    const inputList = taskTests.map((test) => test.input);
    const userTestResult = await runTest({ code, inputList });
    const ansTestResult = await runTest({ code: taskTests.code, inputList });
    console.log({ userTestResult, ansTestResult });
    setRowTestsOutputs(userTestResult);
    const testsOutput = taskTestFunctions.processTestsOutputs(userTestResult);
    setTestsOutputs(testsOutput);
  }

  return (
    <Tooltip content={'בדוק'} placement={'bottom'}>
      <Button radius="full" isIconOnly variant="faded" isDisabled={!pyodide} onClick={() => handleClick()}>
        <RuleRoundedIcon />
      </Button>
    </Tooltip>
  );
}

