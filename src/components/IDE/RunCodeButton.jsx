import React from 'react';

import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { Tooltip, Button } from '@nextui-org/react';
import { usePyodide } from './PyodideProvider.jsx';
import { cleanTraceback } from '../../util/cleanTraceback.js';
import { cleanTraceback } from '../../util/cleanTraceback.js';


function RunCodeButton({ code, setOutput, setInputCallback, setError }) {
  const pyodide = usePyodide();

  async function handleEvaluate() {
    setOutput('');
    setError('');
    try {
      pyodide.registerJsModule('customInput', {
        input: (prompt) => {
          setOutput((output) => output + prompt);
          return new Promise((resolve) => {
            setInputCallback(() => (value) => {
              setOutput((output) => output + '\n' + value + '\n');
              resolve(value);
            });
          });
        },
      });
      pyodide.registerJsModule('customPrint', {
        print: (prompt) => {
          return new Promise((resolve) => {
            setOutput((output) => output + prompt + '\n');
            resolve();
          });
        },
      });

    pyodide.runPython(`
    import customPrint
    def print(*args, sep=" "):
        prompt = sep.join(str(arg) for arg in args)
        customPrint.print(prompt)
    `);

      pyodide.runPython(`
      import customInput
      def input(prompt=""):
        return customInput.input(prompt)
    `);

      pyodide.runPython(`
      import io, sys
      sys.stdout = io.StringIO()
    `);

      const asyncInputCode = modifyInputCalls(code);

      // const asyncCode = `async def pythonCodeWrapper():\n${asyncInputCode
      //   .split('\n')
      //   .map((line) => `  ${line}`)
      //   .join('\n')}\n  pass\nawait pythonCodeWrapper()`;
      const asyncCode = `async def pythonCodeWrapper():\n${code
        .split('\n')
        .map((line) => {
          if (line.includes('input(')) {
            return '  ' + line.replace('input(', 'await input(');
          }
          return '  ' + line;
        })
        .join('\n')}\n  pass\nawait pythonCodeWrapper()`;

      console.log(asyncCode);
      await pyodide.runPythonAsync(asyncCode);
      const result = pyodide.runPython('sys.stdout.getvalue()');

      setOutput((output) => output + result);
    } catch (error) {
      try {
        const traceback = cleanTraceback(error);
        setError(() => traceback);
      } catch {
        setError(() => error.message + '\n');
      }
    }
  }

  return (
    <Tooltip content="הרץ" placement={'bottom'}>
      <Button radius="full" isIconOnly variant="faded" isDisabled={!pyodide} onClick={() => handleEvaluate()}>
        <PlayCircleRoundedIcon />
      </Button>
    </Tooltip>
  );
}

export default RunCodeButton;

function modifyInputCalls(code) {
  const lines = code.split('\n');
  const modifiedLines = [];
  const inputCallers = new Set();

  function extractFunctionName(line) {
    return line.split('(')[0].split(' ')[1];
  }

  function findCallerFunction(index) {
    for (let j = index - 1; j >= 0; j--) {
      const prevLine = lines[j];
      if (prevLine.startsWith('def ')) {
        const functionName = extractFunctionName(prevLine);
        inputCallers.add(functionName);
        break;
      }
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('input(')) {
      modifiedLines.push(line.replace('input(', 'await input('));
      findCallerFunction(i);
    } else {
      modifiedLines.push(line);
    }
  }

  for (const caller of inputCallers) {
    for (let i = 0; i < modifiedLines.length; i++) {
      if (modifiedLines[i].includes(`${caller}(`)) {
        modifiedLines[i] = modifiedLines[i].replace(`${caller}(`, `await ${caller}(`);
      }
    }
  }

  const modifiedCode = modifiedLines.join('\n');
  return modifiedCode;
}