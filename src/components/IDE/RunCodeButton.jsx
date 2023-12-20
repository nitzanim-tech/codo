import React from 'react';

import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { Tooltip, Button } from '@nextui-org/react';
import { usePyodide } from './PyodideProvider.jsx';
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
      def print(prompt=""):
          return customPrint.print(prompt)
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

      const asyncCode = `async def pythonCodeWrapper():\n${code
        .split('\n')
        .map((line) => {
          if (line.includes('input(')) {
            return '  ' + line.replace('input(', 'await input(');
          }
          return '  ' + line;
        })
        .join('\n')}\n  pass\nawait pythonCodeWrapper()`;
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

