import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import { usePyodide } from './PyodideProvider';

export default function RunTestButton({ code, setTestsOutputs }) {
  const pyodide = usePyodide();

  async function runPython({ code, input }) {
    pyodide.runPython('import io, sys');
    pyodide.runPython(`sys.stdin = io.StringIO("${input}")`);
    pyodide.runPython('sys.stdout = io.StringIO()');
    pyodide.runPython(`def input(prompt=None):
    import builtins
    if prompt:
        print(prompt)
    return builtins.input()
  `);

    pyodide.runPython(String(code));
    let output = pyodide.runPython('sys.stdout.getvalue()');
    return output;
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
    const inputList = generateInputList();
    const rowTestsOutputs = await runTest({ code, inputList });
    setTestsOutputs(processTestsOutputs(rowTestsOutputs));
  }

  return (
    <Tooltip content={pyodide ? 'בדוק' : '(טוען..) בדוק'} placement={'bottom'}>
      {pyodide ? (
        <Button
          radius="full"
          isIconOnly
          variant="faded"
          onClick={() => {
            handleClick();
          }}
        >
          <RuleRoundedIcon />
        </Button>
      ) : (
        <Button isIconOnly isDisabled variant="faded" radius="full">
          <RuleRoundedIcon />
        </Button>
      )}
    </Tooltip>
  );
}

function generateInputList() {
  const first = [
    Math.floor(Math.random() * (9 - 8 + 1)) + 6,
    Math.floor(Math.random() * (3 - 1 + 1)) + 1,
    Math.floor(Math.random() * (7 - 6 + 1) + 6),
  ];

  const second = [
    Math.floor(Math.random() * (5 - 3 + 1)) + 3,
    Math.floor(Math.random() * (9 - 6 + 1)) + 6,
    Math.floor(Math.random() * (2 - 1 + 1)) + 1,
  ];

  return [first.join('\n'), second.join('\n')];
}

function processTestsOutputs(testsOutputs) {
  const answers = ['A', 'B'];
  const names = ['קרוב למעלית A', 'קרוב למעלית B', 'בדיוק באמצע'];
  return testsOutputs.map((testsOutput, index) => {
    const inputLines = testsOutput.input.split('\n');
    const input = {
      A: parseInt(inputLines[0]),
      B: parseInt(inputLines[1]),
      P: parseInt(inputLines[2]),
    };
    const outputLines = testsOutput.output.split('\n');
    const output = outputLines[outputLines.length - 2];
    const correct = output.includes(answers[index]);
    const name = names[index];
    return { name, input, output, correct, ans: answers[index] };
  });
}
