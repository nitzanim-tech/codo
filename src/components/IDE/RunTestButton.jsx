import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import RuleRoundedIcon from "@mui/icons-material/RuleRounded";
import { usePyodide } from './PyodideProvider';
import { processTestsOutputs, generateInputList } from '../../Tasks/BasicElevator';

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
    <Tooltip content={'בדוק'} placement={'bottom'}>
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

